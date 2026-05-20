from fastapi import APIRouter, Depends
from app.services.cart import get_cart, add_to_cart, remove_from_cart, clear_cart
from app.core.security import get_current_user

router = APIRouter(prefix="/cart", tags=["cart"])


@router.get("/")
def view_cart(current_user=Depends(get_current_user)):
    return get_cart(current_user.id)


@router.post("/add")
def add_item(product_id: int, quantity: int = 1, current_user=Depends(get_current_user)):
    return add_to_cart(current_user.id, product_id, quantity)


@router.delete("/remove/{product_id}")
def remove_item(product_id: int, current_user=Depends(get_current_user)):
    return remove_from_cart(current_user.id, product_id)


@router.delete("/clear")
def clear(current_user=Depends(get_current_user)):
    clear_cart(current_user.id)
    return {"message": "Carrito vaciado"}
