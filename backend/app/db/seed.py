from app.db.session import SessionLocal
from app.models.product import Product
from app.models.order import Order, OrderItem  # <-- Añadimos estos dos


def seed_products():
    db = SessionLocal()

    # 1. Limpieza total (en orden inverso para respetar las llaves foráneas)
    # Primero borramos el contenido de los pedidos
    db.query(OrderItem).delete()
    db.query(Order).delete()     # Luego borramos los pedidos en sí
    # Y ahora SÍ podemos borrar los productos tranquilamente
    db.query(Product).delete()

    # 2. Añadimos los productos con tus rutas de imágenes exactas
    products = [
        # Ropa
        Product(name="Camiseta Monlau Hombre", description="Camiseta oficial con el logo de Monlau",
                price=15.99, stock=50, image_url="/productos/Camiseta_Hombre.png"),
        Product(name="Camiseta Monlau Mujer", description="Camiseta oficial con el logo de Monlau",
                price=15.99, stock=50, image_url="/productos/Camiseta_Mujer.png"),
        Product(name="Sudadera Monlau", description="Sudadera con capucha oficial de Monlau",
                price=35.99, stock=30, image_url="/productos/Sudadera.png"),
        Product(name="Gorra Monlau", description="Gorra oficial bordada con el logo",
                price=12.99, stock=40, image_url="/productos/Gorra.png"),
        Product(name="Chándal Monlau", description="Chándal completo oficial de Monlau",
                price=49.99, stock=20, image_url="/productos/Chandal.png"),
        Product(name="Polo Monlau", description="Polo elegante oficial de la escuela",
                price=24.99, stock=25, image_url="/productos/Polo.png"),

        # Material escolar y Accesorios
        Product(name="Mochila Monlau", description="Mochila resistente con el logo de Monlau",
                price=29.99, stock=25, image_url="/productos/Mochila.png"),
        Product(name="Libreta Monlau", description="Pack de 3 libretas con el logo",
                price=8.99, stock=100, image_url="/productos/Libreta.png"),
        Product(name="Bolígrafo Monlau", description="Bolígrafo premium con el logo",
                price=5.99, stock=150, image_url="/productos/Boli.png"),
        Product(name="Pendrive Monlau", description="Memoria USB oficial de 64GB",
                price=14.99, stock=45, image_url="/productos/pendrive.png"),
        Product(name="Llavero Monlau", description="Llavero metálico con el logo",
                price=4.99, stock=200, image_url="/productos/Llavero.png"),
    ]

    db.add_all(products)
    db.commit()
    db.close()
    print("✅ Productos de MonlauShop actualizados correctamente con imágenes locales")


if __name__ == "__main__":
    seed_products()
