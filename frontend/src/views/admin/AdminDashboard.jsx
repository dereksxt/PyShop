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
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', textAlign: 'left', fontFamily: 'var(--sans)' }}>
      
      <h1 style={{ fontSize: '32px', margin: '20px 0', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>
        📊 Panel de Administración
      </h1>

      {/* CONTENEDOR EN DOS COLUMNAS */}
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginTop: '20px' }}>
        
        {/* COLUMNA IZQUIERDA: FORMULARIO */}
        <div style={{ flex: '1', minWidth: '300px', background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)', height: 'fit-content' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Añadir Nuevo Producto</h2>
          
          <form onSubmit={handleGuardar} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', fontWeight: '500' }}>Nombre del Producto</label>
              <input 
                type="text" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Sudadera"
                style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: '6px', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', fontWeight: '500' }}>Precio (€)</label>
              <input 
                type="number" 
                step="0.01"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="29.99"
                style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: '6px', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', fontWeight: '500' }}>Stock Inicial</label>
              <input 
                type="number" 
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="10"
                style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: '6px', boxSizing: 'border-box' }}
              />
            </div>

            {/* NUEVO CAMPO: SELECCIÓN DE IMAGEN */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px', fontWeight: '500' }}>Imagen del Producto</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setImagen(e.target.files[0])}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px dashed var(--border)', 
                  borderRadius: '6px', 
                  boxSizing: 'border-box',
                  background: 'var(--code-bg)',
                  cursor: 'pointer'
                }} 
              />
            </div>

            <button 
              type="submit" 
              style={{ background: 'var(--accent)', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}
            >
              Guardar Producto
            </button>
          </form>
        </div>

        {/* COLUMNA DERECHA: TABLA */}
        <div style={{ flex: '2', minWidth: '400px', background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Inventario de Productos</h2>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--code-bg)', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '10px' }}>ID</th>
                <th style={{ padding: '10px' }}>Nombre</th>
                <th style={{ padding: '10px' }}>Precio</th>
                <th style={{ padding: '10px' }}>Stock</th>
                <th style={{ padding: '10px' }}>Archivo Imagen</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod) => (
                <tr key={prod.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px', fontFamily: 'var(--mono)', fontSize: '14px' }}>{prod.id}</td>
                  <td style={{ padding: '12px', fontWeight: '500' }}>{prod.nombre}</td>
                  <td style={{ padding: '12px', color: 'green', fontWeight: 'bold' }}>{prod.precio}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ background: 'var(--accent-bg)', color: 'var(--accent)', padding: '3px 8px', borderRadius: '4px', fontSize: '13px', fontWeight: '600' }}>
                      {prod.stock} uds
                    </span>
                  </td>
                  {/* Celda para verificar qué imagen tiene asociada */}
                  <td style={{ padding: '12px', fontSize: '13px', color: '#6b6375', fontStyle: 'italic' }}>
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