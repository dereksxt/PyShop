import json
from redis import Redis
from app.core.config import settings


def get_redis():
    return Redis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, decode_responses=True)


def get_cart(user_id: int):
    r = get_redis()
    cart = r.get(f"cart:{user_id}")
    return json.loads(cart) if cart else []


def add_to_cart(user_id: int, product_id: int, quantity: int):
    r = get_redis()
    cart = get_cart(user_id)

    for item in cart:
        if item["product_id"] == product_id:
            item["quantity"] += quantity
            r.set(f"cart:{user_id}", json.dumps(cart))
            return cart

    cart.append({"product_id": product_id, "quantity": quantity})
    r.set(f"cart:{user_id}", json.dumps(cart))
    return cart


def remove_from_cart(user_id: int, product_id: int):
    r = get_redis()
    cart = get_cart(user_id)
    cart = [item for item in cart if item["product_id"] != product_id]
    r.set(f"cart:{user_id}", json.dumps(cart))
    return cart


def clear_cart(user_id: int):
    r = get_redis()
    r.delete(f"cart:{user_id}")
