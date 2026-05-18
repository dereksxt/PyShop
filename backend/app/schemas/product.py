from pydantic import BaseModel
from datetime import datetime


class ProductCreate(BaseModel):
    name: str
    description: str | None = None
    price: float
    stock: int = 0
    image_url: str | None = None


class ProductUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    price: float | None = None
    stock: int | None = None
    image_url: str | None = None


class ProductResponse(BaseModel):
    id: int
    name: str
    description: str | None
    price: float
    stock: int
    image_url: str | None
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True
