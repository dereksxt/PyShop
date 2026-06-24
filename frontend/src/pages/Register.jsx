import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await register(email, username, password)
      navigate('/')
    } catch {
      setError('Error al registrarse, prueba con otro email')
    } finally {
      setLoading(false)
    }
  }

  return (
    // Estructura EXACTA del Login
    <div className="h-screen w-full bg-[#fafbfc] flex flex-col font-sans text-gray-900 overflow-hidden relative">
      
      {/* Header flotante */}
      <header className="absolute top-0 left-0 px-10 h-28 flex items-center w-full z-50">
        <img
          src="https://www.monlau.com/app/uploads/2026/01/monlau-logo-fp-1-1024x887.png"
          alt="Monlau"
          className="h-15 sm:h-20 object-contain" 
        />
      </header>

      {/* Main Container - Centrado absoluto en toda la pantalla */}
      <main className="w-full h-full flex items-center justify-center px-6">
        
        <div className="w-full max-w-[1200px] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* LADO IZQUIERDO: Texto impacto alineado a la izquierda (misma posición) */}
          <div className="w-full lg:w-[55%] flex justify-start">
            <div className="max-w-[600px] relative">
              
              <h2 className="text-5xl lg:text-[4rem] font-bold text-[#0a1128] leading-[1.05] mb-6 tracking-tight">
                Únete a la familia<br />de Monlau.<br />Empieza ahora.
              </h2>
              
              <p className="text-[#5b657e] text-xl leading-relaxed mb-14 font-normal">
                Crea tu cuenta en segundos y accede a<br />todo el catálogo exclusivo de la escuela.
              </p>

              {/* Puntitos decorativos absolutos */}
              <div className="absolute top-[130%] left-0 grid grid-cols-8 gap-5 opacity-20 w-max hidden lg:grid">
                {Array.from({length: 40}).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#94a3b8]"/>
                ))}
              </div>
            </div>
          </div>

          {/* LADO DERECHO: Formulario */}
          <div className="w-full lg:w-[45%] flex justify-end">
            <div className="w-full max-w-[440px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-10 sm:p-12">
              <h1 className="text-[1.6rem] font-bold text-[#0a1128] mb-1.5 tracking-tight">Crear cuenta</h1>
              <p className="text-gray-500 text-sm mb-8">Completa tus datos a continuación.</p>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4.5">
                {/* NUEVO CAMPO: Usuario */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">Usuario</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder=""
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white transition placeholder-gray-400"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">Dirección de email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@monlau.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white transition placeholder-gray-400"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">Contraseña</label>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 5 caracteres"
                      className="w-full border border-gray-200 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white transition"
                      required
                    />
                    
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-gray-400 hover:text-gray-700 focus:outline-none p-1 rounded-full transition-colors"
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0a1128] text-white py-3 rounded-xl font-medium hover:bg-[#111c3d] transition disabled:opacity-50 text-sm mt-6"
                >
                  {loading ? 'Creando cuenta...' : 'Registrarse'}
                </button>

                <div className="relative flex items-center gap-3 py-3">
                  <div className="flex-1 h-px bg-gray-200"/>
                  <span className="text-[11px] font-bold text-gray-400 tracking-wider">OR</span>
                  <div className="flex-1 h-px bg-gray-200"/>
                </div>

                <button
                  type="button"
                  className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-medium text-sm hover:bg-gray-50 transition flex items-center justify-center gap-2.5"
                >
                  <svg className="w-4 h-4" viewBox="0 0 23 23">
                    <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
                    <path fill="#f35325" d="M1 1h10v10H1z"/>
                    <path fill="#81bc06" d="M12 1h10v10H12z"/>
                    <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                    <path fill="#ffba08" d="M12 12h10v10H12z"/>
                  </svg>
                  Regístrate con Microsoft
                </button>
              </form>

              <p className="text-center mt-7 text-sm text-gray-500">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className="text-blue-600 font-medium hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}