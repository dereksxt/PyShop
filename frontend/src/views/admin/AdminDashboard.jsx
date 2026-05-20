import { useState } from 'react';

export default function AdminDashboard() {
  // Estado para simular unos productos en la tabla
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Sudadera', precio: '49.99€', stock: 15, imagenName: 'sudadera.png' },
    { id: 2, nombre: 'Libreta', precio: '29.99€', stock: 8, imagenName: 'libreta.png' },
  ]);

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imagen, setImagen] = useState(null);

  const handleGuardar = (e) => {
    e.preventDefault();
    if (!nombre || !precio) return;

    const nuevoProducto = {
      id: productos.length + 1,
      nombre,
      precio: `${precio}€`,
      stock: parseInt(stock) || 0,
      imagenName: imagen ? imagen.name : 'sin-foto.png'
    };

    setProductos([...productos, nuevoProducto]);
    
    setNombre('');
    setPrecio('');
    setStock('');
    setImagen(null);
    e.target.reset(); 
  };

  return (
    <div className="admin-container">
      
      <h1 className="admin-title">
        📊 Panel de Administración
      </h1>

      {/* CONTENEDOR EN DOS COLUMNAS */}
      <div className="admin-layout">
        
        {/* COLUMNA IZQUIERDA: FORMULARIO */}
        <div className="admin-card-left">
          <h2 className="card-title">Añadir Nuevo Producto</h2>
          
          <form onSubmit={handleGuardar} className="admin-form">
            <div>
              <label className="form-label">Nombre del Producto</label>
              <input 
                type="text" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Sudadera"
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">Precio (€)</label>
              <input 
                type="number" 
                step="0.01"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="29.99"
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">Stock Inicial</label>
              <input 
                type="number" 
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="10"
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Imagen del Producto</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setImagen(e.target.files[0])}
                className="form-input-file" 
              />
            </div>

            <button type="submit" className="btn-submit">
              Guardar Producto
            </button>
          </form>
        </div>

        {/* COLUMNA DERECHA: TABLA */}
        <div className="admin-card-right">
          <h2 className="card-title">Inventario de Productos</h2>
          
          <table className="admin-table">
            <thead>
              <tr className="table-header-row">
                <th className="table-th">ID</th>
                <th className="table-th">Nombre</th>
                <th className="table-th">Precio</th>
                <th className="table-th">Stock</th>
                <th className="table-th">Archivo Imagen</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod) => (
                <tr key={prod.id} className="table-tr">
                  <td className="table-td td-id">{prod.id}</td>
                  <td className="table-td td-nombre">{prod.nombre}</td>
                  <td className="table-td td-precio">{prod.precio}</td>
                  <td className="table-td">
                    <span className="badge-stock">
                      {prod.stock} uds
                    </span>
                  </td>
                  <td className="table-td td-imagen">
                    📁 {prod.imagenName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}