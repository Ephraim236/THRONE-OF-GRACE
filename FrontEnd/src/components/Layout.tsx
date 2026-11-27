import { useState, type ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import churchLogo from '../assets/church-logo-2.png';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  tag?: string;
  qty: number;
}

interface CartItem extends Product {
  cartQty: number;
}

export default function Layout() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleAddToCart(product: Product) {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, cartQty: i.cartQty + 1 } : i);
      }
      return [...prev, { ...product, cartQty: 1 }];
    });
  }

  function handleRemoveFromCart(id: number) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  const cartCount = cart.reduce((s, i) => s + i.cartQty, 0);
  const links = ['Home', 'About', 'Events', 'Vote', 'Store'];

  return (
    <div className="min-h-screen" style={{ background: '#f5f0e9' }}>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#d7ccc8]"
        style={{ background: '#f5f0e9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-3">
            <img src={churchLogo} alt="Throne of Grace logo" className="h-10 w-10 rounded-full" />
            <div className="hidden sm:block">
              <div className="font-display text-sm font-bold leading-tight" style={{ color: '#8b5a2b' }}>
                Throne of Grace
              </div>
              <div className="text-xs text-[#6d4c41] leading-tight">Outreach Ministry</div>
            </div>
          </NavLink>

          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <NavLink
                key={link}
                to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 hover:text-[#8b5a2b] ${
                    isActive ? 'text-[#8b5a2b]' : 'text-[#5d4037]'
                  }`
                }
              >
                {link}
              </NavLink>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-[#5d4037] hover:text-[#8b5a2b] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-[#d7ccc8]" style={{ background: '#f5f0e9' }}>
            <div className="px-4 sm:px-6 py-4 flex flex-col gap-3">
              {links.map(link => (
                <NavLink
                  key={link}
                  to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-sm font-medium py-2 transition-colors duration-200 hover:text-[#8b5a2b] ${
                      isActive ? 'text-[#8b5a2b]' : 'text-[#5d4037]'
                    }`
                  }
                >
                  {link}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16">
        <Outlet context={{ cart, addToCart: handleAddToCart, cartOpen, setCartOpen }} />
      </main>

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-md flex flex-col h-full border-l border-[#d7ccc8]"
            style={{ background: '#f8f5f0' }}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#d7ccc8]">
              <h2 className="font-display text-xl font-bold text-[#5d4037]">Your Cart ({cart.length})</h2>
              <button onClick={() => setCartOpen(false)} className="p-2 rounded-md hover:bg-[#f0e5dc] text-[#6d4c41] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-[#6d4c41]">
                  <svg className="w-16 h-16 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293C.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p>Your cart is empty</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg border border-[#d7ccc8]"
                    style={{ background: '#ffffff' }}>
                    <img src={item.image} alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover bg-[#e8f2f5]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#5d4037] leading-snug">{item.name}</p>
                      <p className="text-xs text-[#6d4c41] mt-0.5">Qty: {item.cartQty}</p>
                      <p className="text-sm font-bold mt-1" style={{ color: '#8b5a2b' }}>
                        ${(item.price * item.cartQty).toFixed(2)}
                      </p>
                    </div>
                    <button onClick={() => handleRemoveFromCart(item.id)} className="p-1.5 hover:text-red-400 text-[#6d4c41] transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-[#d7ccc8]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#6d4c41]">Total</span>
                  <span className="font-display text-2xl font-bold" style={{ color: '#8b5a2b' }}>
                    ${cart.reduce((s, i) => s + i.price * i.cartQty, 0).toFixed(2)}
                  </span>
                </div>
                <button className="w-full py-3.5 rounded-md text-sm font-bold border border-[#d7ccc8] transition-all duration-200 hover:opacity-90"
                  style={{ background: '#8b5a2b', color: '#f8f5f0' }}>
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="py-16 px-6 border-t border-[#d7ccc8]"
        style={{ background: '#1a1a1a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={churchLogo} alt="Logo" className="w-12 h-12 rounded-full" />
                <div>
                  <div className="font-display font-bold text-white leading-tight">Throne of Grace</div>
                  <div className="text-xs text-[#a89f95]">Outreach Ministry · To-Go Chapel</div>
                </div>
              </div>
              <p className="text-sm text-[#a89f95] leading-relaxed max-w-xs">
                Bringing the love of Christ to every corner of the world, one community at a time.
              </p>
              <div className="flex gap-3 mt-5">
                {['Facebook', 'Instagram', 'YouTube'].map(s => (
                  <a key={s} href="#" className="px-3 py-1.5 rounded-md text-xs font-medium border border-[#5d4037] transition-colors hover:text-[#8b5a2b]"
                    style={{ color: '#a89f95', borderColor: '#5d4037' }}>
                    {s}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
              <div className="flex flex-col gap-2.5">
                {['Home', 'About Us', 'Events', 'Community Vote', 'Store'].map(l => (
                  <a key={l} href="#" className="text-sm text-[#a89f95] hover:text-[#8b5a2b] transition-colors">{l}</a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Connect</h4>
              <div className="flex flex-col gap-3 text-sm text-[#a89f95]">
                <div>
                  <p className="font-medium text-white mb-0.5">Address</p>
                  <p>LakeSide Kokonte Junction<br />Accra, GHANA</p>
                </div>
                <div>
                  <p className="font-medium text-white mb-0.5">Phone</p>
                  <p>+233 24 123 4567</p>
                </div>
                <div>
                  <p className="font-medium text-white mb-0.5">Email</p>
                  <p>info@throneofgrace.org</p>
                </div>
              </div>
            </div>
          </div>

          <div className="section-divider mb-6 opacity-30" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7aabbf]">
            <p>&copy; 2026 Throne of Grace Outreach Ministry. All rights reserved.</p>
            <p>Crafted with faith &amp; grace</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
