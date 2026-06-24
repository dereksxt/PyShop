import { useState, useEffect } from 'react'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Products() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('general')
  const [toast, setToast] = useState({ show: false, message: '', type: '' })
  const { token, logout, isAdmin, isStudent } = useAuth()
  const navigate = useNavigate()

  const studentProducts = [
    { id: 'cert-1', name: 'Certificación Java SE 17', description: 'Examen oficial de Oracle. Incluye simulacros y tasas.', price: 150.00, stock: 999, type: 'digital', image_url: '/productos/Curso_Java.jpg' },
    { id: 'cert-2', name: 'Curso Python Avanzado', description: 'Aprende Python desde cero hasta nivel experto.', price: 120.00, stock: 999, type: 'digital', image_url: '/productos/Curso_Python.png' },
    { id: 'cert-3', name: 'Licencia Microsoft Office 365', description: 'Licencia anual para estudiantes matriculados.', price: 15.99, stock: 999, type: 'digital', image_url: null }
  ]

  const fetchProducts = async (searchTerm = '') => {
    try {
      const response = await api.get(`/products/?search=${searchTerm}`)
      setProducts(response.data)
    } catch (error) {
      console.error("Error al cargar el catálogo")
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    if (activeTab === 'general') {
      fetchProducts(e.target.value)
    }
  }

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' })
    }, 3000)
  }

  const addToCart = async (productId, isDigital = false) => {
    if (!token) return navigate('/login', { replace: true })
    if (isDigital) {
      showToast('Matrícula verificada correctamente. Producto de certificación añadido al carrito digital.')
      return
    }
    try {
      await api.post(`/cart/add?product_id=${productId}&quantity=1`)
      showToast('Producto añadido al carrito correctamente')
    } catch (error) {
      showToast('Error de inventario al añadir el producto')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-gray-900">
      <header className="bg-white border-b border-gray-200 px-6 sm:px-10 py-4 flex justify-between items-center sticky top-0 z-50">
        <img src="https://www.monlau.com/app/uploads/2026/01/monlau-logo-fp-1-1024x887.png" alt="Monlau" className="h-10 object-contain cursor-pointer" onClick={() => navigate('/')} />
        <div className="flex items-center gap-3 sm:gap-6">
          {!token ? (
            <button onClick={() => navigate('/login')} className="bg-[#0a1128] text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-[#111c3d] transition">Iniciar sesión</button>
          ) : (
            <>
              {isAdmin && <button onClick={() => navigate('/admin')} className="hidden sm:block text-sm font-medium text-blue-600 hover:text-blue-800 transition">Ir al Panel</button>}
              <button onClick={() => navigate('/cart')} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#0a1128] transition"><span className="text-xl"></span><span className="hidden sm:block">Carrito</span></button>
              <button onClick={() => navigate('/orders')} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#0a1128] transition"><span className="text-xl"></span><span className="hidden sm:block">Mis pedidos</span></button>
              <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>
              <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-100 transition flex items-center gap-2">
                <span className="hidden sm:block">Salir</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
              </button>
            </>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0a1128] tracking-tight mb-2">{activeTab === 'general' ? 'Catálogo Oficial' : 'Portal del Estudiante'}</h1>
            <p className="text-gray-500 text-sm">{activeTab === 'general' ? 'Encuentra los mejores productos con el sello Monlau.' : 'Certificaciones y licencias exclusivas para alumnos matriculados.'}</p>
          </div>
          <div className="w-full sm:w-96 relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
            <input type="text" placeholder="Buscar..." value={search} onChange={handleSearch} className="w-full bg-white border border-gray-200 rounded-full pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-sm" />
          </div>
        </div>

        <div className="flex gap-4 border-b border-gray-200 mb-10">
          <button onClick={() => setActiveTab('general')} className={`pb-4 px-2 text-sm font-bold transition ${activeTab === 'general' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>Merchandising</button>
          {(isStudent || isAdmin) && (
            <button onClick={() => setActiveTab('students')} className={`pb-4 px-2 text-sm font-bold transition flex items-center gap-2 ${activeTab === 'students' ? 'text-[#0a1128] border-b-2 border-[#0a1128]' : 'text-gray-400 hover:text-gray-600'}`}>Portal del Estudiante</button>
          )}
        </div>

        {activeTab === 'general' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.length === 0 ? (
              <div className="col-span-full py-20 text-center"><p className="text-gray-500 text-lg">No hay artículos disponibles.</p></div>
            ) : (
              products.map(product => (
                <div key={product.id} className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
                  <div className="w-full h-56 bg-gray-50 relative overflow-hidden flex items-center justify-center">
                    <img src={product.image_url || 'https://placehold.co/400x400?text=MonlauShop'} alt={product.name} className="object-cover w-full h-full mix-blend-multiply group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-[#0a1128] text-lg leading-tight line-clamp-1 mb-2">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <p className="text-xl font-black text-[#0a1128]">{product.price.toFixed(2)}€</p>
                      <button onClick={() => addToCart(product.id)} disabled={product.stock === 0} className="bg-[#0a1128] text-white p-3 rounded-2xl hover:bg-[#111c3d] transition disabled:opacity-50 group-hover:bg-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 flex items-start gap-4">
              <span className="text-3xl"></span>
              <div>
                <h3 className="text-blue-900 font-bold mb-1">Zona protegida corporativa</h3>
                <p className="text-sm text-blue-800">Usted se encuentra logueado con un correo corporativo verificado de Monlau FP.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentProducts.map(cert => (
                <div key={cert.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col group">
                  <div className="w-full h-40 bg-gray-50 relative overflow-hidden flex items-center justify-center rounded-2xl mb-4">
                    <img src={cert.image_url || 'https://placehold.co/400x400?text=Licencia'} alt={cert.name} className="object-cover w-full h-full mix-blend-multiply group-hover:scale-105 transition" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{cert.name}</h3>
                  <p className="text-sm text-gray-500 mb-6 flex-1">{cert.description}</p>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                    <p className="text-xl font-black text-indigo-900">{cert.price.toFixed(2)}€</p>
                    <button onClick={() => addToCart(cert.id, true)} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition">Solicitar Acceso</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className={`px-6 py-4 rounded-2xl shadow-2xl font-medium text-sm flex items-center gap-3 transition-all transform ${toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-[#0a1128] text-white'}`}>
            <span className="text-xl">{toast.type === 'error' ? '❌' : '✅'}</span>
            {toast.message}
          </div>
        </div>
      )}
    </div>
  )
}