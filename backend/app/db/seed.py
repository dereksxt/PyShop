from app.db.session import SessionLocal
from app.models.product import Product


def seed_products():
    db = SessionLocal()

    products = [
        # Ropa
        Product(name="Camiseta Monlau", description="Camiseta oficial con el logo de Monlau",
                price=15.99, stock=50, image_url="https://placehold.co/400x400?text=Camiseta+Monlau"),
        Product(name="Sudadera Monlau", description="Sudadera con capucha oficial de Monlau",
                price=35.99, stock=30, image_url="https://placehold.co/400x400?text=Sudadera+Monlau"),
        Product(name="Gorra Monlau", description="Gorra oficial bordada con el logo",
                price=12.99, stock=40, image_url="https://placehold.co/400x400?text=Gorra+Monlau"),
        Product(name="Chándal Monlau", description="Chándal completo oficial de Monlau",
                price=49.99, stock=20, image_url="https://placehold.co/400x400?text=Chandal+Monlau"),

        # Material escolar
        Product(name="Mochila Monlau", description="Mochila resistente con el logo de Monlau",
                price=29.99, stock=25, image_url="https://placehold.co/400x400?text=Mochila+Monlau"),
        Product(name="Libreta Monlau", description="Pack de 3 libretas con el logo",
                price=8.99, stock=100, image_url="https://placehold.co/400x400?text=Libreta+Monlau"),
        Product(name="Set Bolígrafos Monlau", description="Set de 5 bolígrafos con el logo",
                price=5.99, stock=150, image_url="https://placehold.co/400x400?text=Boligrafos+Monlau"),

        # Accesorios
        Product(name="Taza Monlau", description="Taza cerámica con el logo de Monlau",
                price=9.99, stock=60, image_url="https://placehold.co/400x400?text=Taza+Monlau"),
        Product(name="Botella Monlau", description="Botella de agua reutilizable con el logo",
                price=14.99, stock=45, image_url="https://placehold.co/400x400?text=Botella+Monlau"),
        Product(name="Llavero Monlau", description="Llavero metálico con el logo de Monlau",
                price=4.99, stock=200, image_url="https://placehold.co/400x400?text=Llavero+Monlau"),
    ]

    db.add_all(products)
    db.commit()
    db.close()
    print("Productos de MonlauShop añadidos correctamente")


if __name__ == "__main__":
    seed_products()
