import React, { useState, useEffect } from 'react';
import { RestaurantConfig } from '../types';
import { getRestaurantOpenStatus } from '../config/restaurantConfig';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Clock, 
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  config: RestaurantConfig;
  cartCount: number;
  onOpenCart: () => void;
  onOpenConfigGuide: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  cartCount,
  onOpenCart,
  onOpenConfigGuide,
  onOpenAdmin
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const openStatus = getRestaurantOpenStatus(config.openingHours);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Cardápio', href: '#cardapio' },
    { label: 'Como Chegar', href: '#localizacao' },
    { label: 'Instagram', href: '#instagram' },
    { label: 'Contato', href: '#contato' }
  ];

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-stone-950/90 backdrop-blur-md py-3 border-b border-stone-800/80 shadow-2xl shadow-black/50'
            : 'bg-gradient-to-b from-stone-950/90 via-stone-950/50 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Identidade */}
            <a
              id="navbar-logo"
              href="#inicio"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-serif font-bold text-lg sm:text-xl shadow-lg shadow-amber-600/30 border border-amber-300/40 group-hover:scale-105 transition-transform">
                {config.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-stone-100 group-hover:text-amber-400 transition-colors">
                  {config.name}
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-500/90">
                  {config.logoSubtext}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav id="desktop-nav-links" className="hidden lg:flex items-center gap-7" aria-label="Navegação Principal">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  href={link.href}
                  className="text-sm font-medium text-stone-300 hover:text-amber-400 transition-colors duration-200 relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Ações do Header */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Status de Horário (Pill) */}
              <div 
                id="header-status-pill"
                className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
                  openStatus.isOpen 
                    ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400' 
                    : 'bg-amber-950/40 border-amber-500/30 text-amber-300'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${openStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                <span>{openStatus.isOpen ? 'Aberto Agora' : 'Fechado no Momento'}</span>
              </div>

              {/* Botão Painel Administrador */}
              <button
                id="btn-nav-administrar"
                onClick={onOpenAdmin}
                title="Painel apenas para Administrador do site"
                className="flex items-center gap-1.5 px-2.5 py-2 text-xs font-semibold rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 hover:text-amber-200 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Administrar</span>
              </button>

              {/* Botão Guia / Modelo Comercial */}
              <button
                id="btn-config-guide-nav"
                onClick={onOpenConfigGuide}
                title="Personalizar Modelo / Guia de Edição"
                className="hidden md:flex items-center gap-1.5 px-2.5 py-2 text-xs font-semibold rounded-lg bg-stone-900 border border-stone-700/70 text-stone-300 hover:text-amber-400 hover:border-amber-500/50 hover:bg-stone-800 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden xl:inline">Personalizar Site</span>
              </button>

              {/* Botão Sacola de Pedidos */}
              <button
                id="btn-open-cart-nav"
                onClick={onOpenCart}
                aria-label={`Ver sacola de pedidos (${cartCount} itens)`}
                className="relative p-2.5 rounded-xl bg-stone-900/90 border border-stone-800 text-stone-200 hover:text-amber-400 hover:border-amber-500/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span 
                    id="cart-badge-count"
                    className="absolute -top-1.5 -right-1.5 bg-amber-500 text-stone-950 font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-bounce"
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* WhatsApp CTA Principal */}
              <a
                id="btn-whatsapp-header-cta"
                href={`https://wa.me/${config.whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20na%20${encodeURIComponent(config.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold text-sm shadow-lg shadow-emerald-900/30 transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>

              {/* Hamburger Mobile Toggle */}
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
                className="lg:hidden p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-drawer-overlay"
          className="fixed inset-0 z-50 lg:hidden bg-black/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            id="mobile-drawer-content"
            className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-stone-950 border-l border-stone-800 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-5 border-b border-stone-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-stone-950 font-serif font-bold text-base">
                    {config.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-stone-100 text-base">{config.name}</h3>
                    <p className="text-[10px] text-amber-500 uppercase tracking-widest font-semibold">{config.logoSubtext}</p>
                  </div>
                </div>
                <button
                  id="btn-close-mobile-drawer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-400 hover:text-white rounded-lg focus:outline-none"
                  aria-label="Fechar menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Pill */}
              <div className="mt-4 p-3 rounded-xl bg-stone-900/80 border border-stone-800 text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ${openStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className="font-semibold text-stone-200">
                    {openStatus.isOpen ? 'Aberto Agora' : 'Fechado no Momento'}
                  </span>
                </div>
                <p className="text-stone-400 text-[11px]">{openStatus.message}</p>
              </div>

              {/* Navigation Links */}
              <div className="mt-6 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    id={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 px-3 rounded-lg text-stone-200 hover:bg-stone-900 hover:text-amber-400 text-sm font-medium transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-stone-600" />
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Actions inside drawer */}
            <div className="pt-6 border-t border-stone-800 space-y-3">
              <a
                id="btn-drawer-whatsapp"
                href={`https://wa.me/${config.whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20na%20${encodeURIComponent(config.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-900/40"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Pedir pelo WhatsApp</span>
              </a>

              <a
                id="btn-drawer-phone"
                href={config.phoneTelLink}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white text-sm font-medium transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>Ligar: {config.phoneNumber}</span>
              </a>

              <button
                id="btn-drawer-administrar"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-semibold hover:bg-amber-500/25 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Painel Administrador</span>
              </button>

              <button
                id="btn-drawer-config-guide"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConfigGuide();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Personalizar este Modelo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
