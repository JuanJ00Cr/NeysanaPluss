import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Phone, Menu, X, Globe, Zap, Heart } from 'lucide-react';

// ====================================================================
// 1. COMPONENTES AUXILIARES PARA LA SECCIÓN "SOBRE NOSOTROS"
//    (DEBEN estar definidos aquí, antes de NeysanaStore)
// ====================================================================

// Componente auxiliar para las tarjetas (Misión, Visión, Valores)
const AboutCard = ({ icon, title, text, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-emerald-500">
    <div className={`${color} mb-3`}>{icon}</div>
    <h4 className="text-xl font-bold text-gray-800 mb-3">{title}</h4>
    <p className="text-gray-600 text-sm">{text}</p>
  </div>
);

// Componente de la nueva Sección "Sobre Nosotros"
const AboutSection = ({ setCurrentView }) => ( // Recibe setCurrentView para poder volver
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h2 className="text-4xl font-extrabold text-emerald-800 text-center mb-12">
      Conoce a Neysana Pluss ✨
    </h2>

    {/* Misión, Visión, Valores Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <AboutCard
        icon={<Globe size={36} />}
        title="Misión"
        text="Ser el principal aliado en la salud, ofreciendo suplementos de la más alta calidad para mejorar la calidad de vida y el bienestar integral de nuestros clientes."
        color="text-emerald-600"
      />
      <AboutCard
        icon={<Zap size={36} />}
        title="Visión"
        text="Liderar el mercado nacional de bienestar integral, siendo reconocidos por la excelencia, la ciencia y la innovación continua en nuestros productos y servicios."
        color="text-teal-600"
      />
      <AboutCard
        icon={<Heart size={36} />}
        title="Valores"
        text="Calidad, Integridad y Confianza. Nos comprometemos con la transparencia y el aval científico en cada uno de nuestros suplementos."
        color="text-green-600"
      />
    </div>

    {/* Certificaciones y Portafolio */}
    <div className="bg-white p-8 rounded-xl shadow-xl">
      <h3 className="text-3xl font-bold text-emerald-700 mb-6 border-b pb-2">
        Certificaciones y Avales
      </h3>

      <p className="text-gray-600 mb-6">
        Neysana Pluss garantiza la pureza y eficacia de sus suplementos. Contamos con el aval de instituciones reconocidas y certificaciones que respaldan nuestra trayectoria.
      </p>

      {/* Simulación de logos de Avales (SENA, etc.) */}
      <div className="flex flex-wrap justify-center items-center gap-10 mt-8">
        <div className="text-center">
          <span className="text-5xl text-blue-500">🎓</span>
          <p className="font-semibold text-sm mt-1">Aliado SENA</p>
        </div>
        <div className="text-center">
          <span className="text-5xl text-yellow-600">🥇</span>
          <p className="font-semibold text-sm mt-1">Certificación ISO</p>
        </div>
        <div className="text-center">
          <span className="text-5xl text-green-700">✅</span>
          <p className="font-semibold text-sm mt-1">Registro INVIMA</p>
        </div>
      </div>

      {/* Portafolio (Galeria de Fotos) */}
      <h3 className="text-2xl font-bold text-emerald-700 mt-10 mb-4 pt-4 border-t">
        Portafolio de la Empresa
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center text-gray-500">Foto Empresa</div>
        <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center text-gray-500">Equipo 1</div>
        <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center text-gray-500">Instalaciones</div>
        <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center text-gray-500">Proceso</div>
      </div>
    </div>

    {/* Botón de Volver para mejorar la UX */}
    <div className="text-center mt-12">
      <button
        onClick={() => setCurrentView('home')}
        className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition shadow-lg"
      >
        Volver a la Tienda
      </button>
    </div>
  </section>
);


// ====================================================================
// 2. COMPONENTE PRINCIPAL (NeysanaStore)
// ====================================================================

const NeysanaStore = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [currentView, setCurrentView] = useState('home');

  const categories = ['Todos', 'Vitaminas', 'Suplementos', 'Hierbas', 'Cuidado Personal'];

  const products = [
    { id: 1, name: 'Vitamina C 1000mg', category: 'Vitaminas', price: 45000, image: '🍊', description: 'Refuerza tu sistema inmunológico' },
    { id: 2, name: 'Omega 3', category: 'Suplementos', price: 65000, image: '🐟', description: 'Salud cardiovascular' },
    { id: 3, name: 'Colágeno Hidrolizado', category: 'Suplementos', price: 55000, image: '💪', description: 'Piel, cabello y articulaciones' },
    { id: 4, name: 'Manzanilla', category: 'Hierbas', price: 15000, image: '🌼', description: 'Té relajante natural' },
    { id: 5, name: 'Multivitamínico', category: 'Vitaminas', price: 50000, image: '💊', description: 'Complejo vitamínico completo' },
    { id: 6, name: 'Aceite de Coco', category: 'Cuidado Personal', price: 35000, image: '🥥', description: 'Hidratación natural' },
    { id: 7, name: 'Magnesio', category: 'Suplementos', price: 40000, image: '⚡', description: 'Energía y recuperación muscular' },
    { id: 8, name: 'Jengibre', category: 'Hierbas', price: 18000, image: '🫚', description: 'Antiinflamatorio natural' },
    { id: 9, name: 'Vitamina D3', category: 'Vitaminas', price: 42000, image: '☀️', description: 'Salud ósea' },
    { id: 10, name: 'Aloe Vera Gel', category: 'Cuidado Personal', price: 28000, image: '🌿', description: 'Hidratación y cicatrización' },
    { id: 11, name: 'Probióticos', category: 'Suplementos', price: 70000, image: '🦠', description: 'Salud digestiva' },
    { id: 12, name: 'Cúrcuma', category: 'Hierbas', price: 22000, image: '🟡', description: 'Antiinflamatorio poderoso' },
  ];

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const sendWhatsApp = () => {
    const message = cart.map(item =>
      `${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString('es-CO')}`
    ).join('%0A');
    const totalMsg = `%0A%0ATotal: $${total.toLocaleString('es-CO')}`;
    window.open(`https://wa.me/573001234567?text=Hola! Quiero hacer el siguiente pedido:%0A%0A${message}${totalMsg}`, '_blank');
  };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 font-poppins">
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 ">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-5xl">⚕️</div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-emerald-700 font-poppins">Neysana Pluss</h1>
                <p className="text-sm text-teal-600 font-poppins">Salud y Belleza</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.open('https://wa.me/573004414962', '_blank')}
                className="hidden sm:flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                <Phone size={20} />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition"
              >
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden text-emerald-700"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden mt-4 pb-4">
              <button
                onClick={() => window.open('https://wa.me/573004414962', '_blank')}
                className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition"
              >
                <Phone size={20} />
                <span>Contactar por WhatsApp</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* NAVEGACIÓN DE PÁGINA (Botones de Categoría y Sobre Nosotros) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 justify-center">

          {/* Botón "Productos" (para volver a la vista principal) */}
          <button
            onClick={() => {
              setCurrentView('home');
              setSelectedCategory('Todos'); // Resetear a todos para una mejor UX
            }}
            className={`px-6 py-2 rounded-full font-medium transition ${
              currentView === 'home' && selectedCategory === 'Todos'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            Productos
          </button>

          {/* Categorías de Productos (Solo visibles en la vista 'home') */}
          {currentView === 'home' && categories.filter(c => c !== 'Todos').map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              {cat}
            </button>
          ))}
          
          {/* Botón Sobre Nosotros (Cambia la vista a 'about') */}
          <button
            onClick={() => setCurrentView('about')}
            className={`px-6 py-2 rounded-full font-medium transition ${
              currentView === 'about'
                ? 'bg-red-500 text-white shadow-lg' // Estilo para indicar que está activo
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Sobre Nosotros
          </button>
        </div>
      </div>


      {/* ==================================================================== */}
      {/* CONTENIDO PRINCIPAL (Renderizado Condicional) */}
      {/* ==================================================================== */}
      {currentView === 'home' ? (
        <>
          {/* Hero Section (Solo en la vista de Productos) */}
          <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">Productos Naturales</h2>
              <p className="text-xl mb-8">Tu salud y bienestar en cada producto</p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-3xl font-bold">100%</p>
                  <p className="text-sm">Natural</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-3xl font-bold">+500</p>
                  <p className="text-sm">Clientes</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-3xl font-bold">15+</p>
                  <p className="text-sm">Años</p>
                </div>
              </div>
            </div>
          </section>

          {/* Products Grid (Solo en la vista de Productos) */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
                  <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-8 flex items-center justify-center">
                    <span className="text-7xl">{product.image}</span>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800 mt-2 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-emerald-700">
                        ${product.price.toLocaleString('es-CO')}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition flex items-center space-x-1"
                      >
                        <Plus size={18} />
                        <span>Agregar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </>
      ) : (
        /* Renderiza la sección "Sobre Nosotros" y le pasa el setter de la vista */
        <AboutSection setCurrentView={setCurrentView} />
      )}
      
      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end" onClick={() => setIsCartOpen(false)}>
          <div
            className="bg-white w-full sm:w-96 h-full overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-emerald-600 text-white p-6 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Carrito</h2>
                <button onClick={() => setIsCartOpen(false)} className="hover:bg-emerald-700 p-2 rounded">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Tu carrito está vacío</p>
                </div>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-4 mb-3 shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl">{item.image}</span>
                          <div>
                            <h3 className="font-bold text-gray-800">{item.name}</h3>
                            <p className="text-emerald-600 font-semibold">
                              ${item.price.toLocaleString('es-CO')}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 bg-white rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="bg-gray-200 hover:bg-gray-300 p-1 rounded"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3 font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white p-1 rounded"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="font-bold text-lg text-gray-800">
                          ${(item.price * item.quantity).toLocaleString('es-CO')}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="border-t-2 border-gray-200 pt-4 mt-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xl font-bold text-gray-700">Total:</span>
                      <span className="text-3xl font-bold text-emerald-700">
                        ${total.toLocaleString('es-CO')}
                      </span>
                    </div>

                    <button
                      onClick={sendWhatsApp}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg flex items-center justify-center space-x-2 transition shadow-lg"
                    >
                      <Phone size={24} />
                      <span>Hacer Pedido por WhatsApp</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Neysana Pluss</h3>
              <p className="text-emerald-100">Productos naturales para tu salud y bienestar</p>
              <button 
                onClick={() => setCurrentView('about')}
                className="text-sm font-semibold text-emerald-300 hover:text-white transition mt-2 block"
              >
                Leer más sobre nosotros →
              </button>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <p className="text-emerald-100 mb-2">📞 WhatsApp: +57 300 123 4567</p>
              <p className="text-emerald-100">📧 info@neysanapluss.com</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Horario</h3>
              <p className="text-emerald-100">Lunes - Viernes: 8am - 6pm</p>
              <p className="text-emerald-100">Sábados: 9am - 2pm</p>
            </div>
          </div>
          <div className="border-t border-emerald-700 mt-8 pt-8 text-center text-emerald-200">
            <p>© 2024 Neysana Pluss. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <button
        onClick={() => window.open('https://wa.me/573004414962', '_blank')}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl z-50 animate-bounce"
      >
        <Phone size={28} />
      </button>
    </div>


  );
};

export default NeysanaStore;