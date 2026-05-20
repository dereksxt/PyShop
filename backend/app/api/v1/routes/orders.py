from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.schemas.order import OrderCreate, OrderResponse
from app.services.cart import clear_cart
from app.core.security import get_current_user, get_admin_user

router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("/", response_model=OrderResponse)
def create_order(order_data: OrderCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    total = 0
    items = []

    for item in order_data.items:
        product = db.query(Product).filter(
            Product.id == item.product_id).first()
        if not product:
            raise HTTPException(
                status_code=404, detail=f"Producto {item.product_id} no encontrado")
        if product.stock < item.quantity:
            raise HTTPException(
                status_code=400, detail=f"Stock insuficiente para {product.name}")
        total += product.price * item.quantity
        items.append((product, item.quantity))

    order = Order(user_id=current_user.id, total=total)
    db.add(order)
    db.flush()

    for product, quantity in items:
        order_item = OrderItem(
            order_id=order.id,
            product_id=product.id,
            quantity=quantity,
            price=product.price
        )
        db.add(order_item)
        product.stock -= quantity

    db.commit()
    db.refresh(order)
    clear_cart(current_user.id)
    return order


@router.get("/", response_model=list[OrderResponse])
def get_my_orders(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return db.query(Order).filter(Order.user_id == current_user.id).all()


@router.get("/all", response_model=list[OrderResponse])
def get_all_orders(db: Session = Depends(get_db), admin=Depends(get_admin_user)):
    return db.query(Order).all()


@router.put("/{order_id}/status")
def update_order_status(order_id: int, status: str, db: Session = Depends(get_db), admin=Depends(get_admin_user)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    order.status = status
    db.commit()
    return {"message": f"Estado actualizado a {status}"}
