from sqlalchemy.orm import Session
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate


def get_products(db: Session, skip: int = 0, limit: int = 20):
    return db.query(Product).filter(Product.is_active == True).offset(skip).limit(limit).all()


def get_product(db: Session, product_id: int):
    return db.query(Product).filter(Product.id == product_id).first()


def create_product(db: Session, product_data: ProductCreate):
    product = Product(**product_data.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


def update_product(db: Session, product_id: int, product_data: ProductUpdate):
    product = get_product(db, product_id)
    if not product:
        return None
    for key, value in product_data.model_dump(exclude_unset=True).items():
        setattr(product, key, value)
    db.commit()
    db.refresh(product)
    return product


def delete_product(db: Session, product_id: int):
    product = get_product(db, product_id)
    if product:
        product.is_active = False
        db.commit()
    return product
