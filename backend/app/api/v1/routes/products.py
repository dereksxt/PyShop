from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from app.services.products import get_products, get_product, create_product, update_product, delete_product
from app.core.security import get_current_user, get_admin_user

router = APIRouter(prefix="/products", tags=["products"])


@router.get("/", response_model=list[ProductResponse])
def list_products(skip: int = 0, limit: int = 20, search: str = None, min_price: float = None, max_price: float = None, db: Session = Depends(get_db)):
    return get_products(db, skip, limit, search, min_price, max_price)


@router.get("/{product_id}", response_model=ProductResponse)
def get_one_product(product_id: int, db: Session = Depends(get_db)):
    product = get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return product


@router.post("/", response_model=ProductResponse)
def create(product_data: ProductCreate, db: Session = Depends(get_db), admin=Depends(get_admin_user)):
    return create_product(db, product_data)


@router.put("/{product_id}", response_model=ProductResponse)
def update(product_id: int, product_data: ProductUpdate, db: Session = Depends(get_db), admin=Depends(get_admin_user)):
    product = update_product(db, product_id, product_data)
    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return product


@router.delete("/{product_id}")
def delete(product_id: int, db: Session = Depends(get_db), admin=Depends(get_admin_user)):
    delete_product(db, product_id)
    return {"message": "Producto eliminado"}
