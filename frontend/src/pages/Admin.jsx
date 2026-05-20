import { useState, useEffect } from 'react'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Admin() {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, stock: 0 })
  const { token } = useAuth()
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
    if (!token) return navigate('/login')
    fetchOrders()
    fetchProducts()
  }, [])

  const createProduct = async () => {
    await api.post('/products/', newProduct)
    fetchProducts()
    setNewProduct({ name: '', description: '', price: 0, stock: 0 })
    alert('Producto creado')
  }

  const updateStatus = async (orderId, status) => {
    await api.put(`/orders/${orderId}/status?status=${status}`)
    fetchOrders()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/')}>MonlauShop — Admin</h1>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Crear producto</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input placeholder="Nombre" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="border rounded-lg px-3 py-2" />
            <input placeholder="Descripción" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="border rounded-lg px-3 py-2" />
            <input placeholder="Precio" type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} className="border rounded-lg px-3 py-2" />
            <input placeholder="Stock" type="number" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value)})} className="border rounded-lg px-3 py-2" />
          </div>
          <button onClick={createProduct} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Crear producto</button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Pedidos ({orders.length})</h2>
          {orders.map(order => (
            <div key={order.id} className="flex justify-between items-center border-b py-3">
              <div>
                <span className="font-semibold">Pedido #{order.id}</span>
                <span className="text-gray-500 ml-4">{order.total.toFixed(2)}€</span>
              </div>
              <select value={order.status} onChange={e => updateStatus(order.id, e.target.value)} className="border rounded-lg px-3 py-1">
                <option value="pending">Pendiente</option>
                <option value="processing">Procesando</option>
                <option value="shipped">Enviado</option>
                <option value="delivered">Entregado</option>
              </select>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Productos ({products.length})</h2>
          {products.map(product => (
            <div key={product.id} className="flex justify-between items-center border-b py-3">
              <div>
                <span className="font-semibold">{product.name}</span>
                <span className="text-gray-500 ml-4">{product.price}€</span>
              </div>
              <span className="text-gray-500">Stock: {product.stock}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}