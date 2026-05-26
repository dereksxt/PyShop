import { useState, useEffect } from 'react'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Admin() {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', stock: '' })
  
  // Extraemos la función logout del contexto
  const { token, logout } = useAuth()
  const navigate = useNavigate()

  const fetchOrders = async () => {
    const response = await api.get('/orders/all')
    setOrders(response.data)
  }

  const fetchProducts = async () => {
    const response = await api.get('/products/')
    setProducts(response.data)
  }

  useEffect(() => {
    if (!token) return navigate('/login', { replace: true })
    fetchOrders()
    fetchProducts()
  }, [token, navigate])

  const createProduct = async (e) => {
    e.preventDefault() // Prevenimos que la página se recargue
    await api.post('/products/', {
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock)
    })
    fetchProducts()
    setNewProduct({ name: '', description: '', price: '', stock: '' })
  }

  const updateStatus = async (orderId, status) => {
    await api.put(`/orders/${orderId}/status?status=${status}`)
    fetchOrders()
  }

  // Función para cerrar sesión de forma segura
  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-gray-900">
      
      {/* 1. TOP NAVBAR PROFESIONAL */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <img 
            src="https://www.monlau.com/app/uploads/2026/01/monlau-logo-fp-1-1024x887.png" 
            alt="Monlau" 
            className="h-10 object-contain" 
          />
          <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
          <h1 className="text-lg font-bold text-[#0a1128] hidden sm:block">Panel de Administración</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 mr-4">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Admin Online
          </div>
          {/* Botón de Cerrar Sesión */}
          <button 
            onClick={handleLogout} 
            className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-100 transition flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Salir
          </button>
        </div>
      </header>

      {/* 2. CONTENIDO DEL DASHBOARD (Grid Layout) */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Usamos un Grid: Izquierda (Crear Prod) / Derecha (Listas) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMNA IZQUIERDA: Formulario de Crear Producto */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 p-6 sticky top-28">
              <h2 className="text-lg font-bold text-[#0a1128] mb-1">Añadir Producto</h2>
              <p className="text-sm text-gray-500 mb-6">Sube un nuevo artículo al catálogo.</p>
              
              <form onSubmit={createProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Nombre</label>
                  <input required placeholder="Ej. Mochila oficial" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Descripción</label>
                  <textarea required rows="3" placeholder="Detalles del producto..." value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Precio (€)</label>
                    <input required type="number" step="0.01" min="0" placeholder="0.00" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Stock</label>
                    <input required type="number" min="0" placeholder="0" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#0a1128] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#111c3d] transition mt-2">
                  Publicar producto
                </button>
              </form>
            </div>
          </div>

          {/* COLUMNA DERECHA: Pedidos y Catálogo */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Gestión de Pedidos */}
            <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-[#0a1128]">Pedidos Recientes</h2>
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-lg">{orders.length} totales</span>
              </div>
              
              <div className="space-y-3">
                {orders.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">No hay pedidos registrados.</p>
                ) : (
                  orders.map(order => (
                    <div key={order.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                      <div className="mb-3 sm:mb-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-sm text-[#0a1128]">Pedido #{order.id}</span>
                          <span className="text-xs text-gray-400">{new Date(order.created_at).toLocaleDateString()}</span>
                        </div>
                        <span className="text-blue-600 font-bold text-sm">{order.total.toFixed(2)}€</span>
                      </div>
                      
                      <select 
                        value={order.status} 
                        onChange={e => updateStatus(order.id, e.target.value)} 
                        className="bg-white border border-gray-200 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                      >
                        <option value="pending">Pendiente</option>
                        <option value="processing">Procesando</option>
                        <option value="shipped">Enviado</option>
                        <option value="delivered">Entregado</option>
                      </select>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Inventario de Productos */}
            <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-[#0a1128]">Inventario Actual</h2>
                <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2.5 py-1 rounded-lg">{products.length} artículos</span>
              </div>
              
              <div className="divide-y divide-gray-100">
                {products.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">El catálogo está vacío.</p>
                ) : (
                  products.map(product => (
                    <div key={product.id} className="flex justify-between items-center py-3">
                      <div>
                        <p className="font-semibold text-sm text-[#0a1128]">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.price.toFixed(2)}€</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                        <span className="text-xs font-medium text-gray-600">Stock: {product.stock}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}