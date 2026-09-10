import React from 'react';
import { RestaurantConfig } from '../types';
import { getRestaurantOpenStatus } from '../config/restaurantConfig';
import { 
  MessageCircle, 
  UtensilsCrossed, 
  ChevronDown, 
  Clock, 
  MapPin, 
  Sparkles, 
  Award, 
  CheckCircle2,
  Camera,
  Edit3
} from 'lucide-react';

interface HeroProps {
  config: RestaurantConfig;
  onOpenMenu: () => void;
  isAdminMode?: boolean;
  onEditHeroBg?: () => void;
  onEditTexts?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  config, 
  onOpenMenu,
  isAdminMode,
  onEditHeroBg,
  onEditTexts
}) => {
  const openStatus = getRestaurantOpenStatus(config.openingHours);

  return (
    <section
      id="inicio"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 sm:pt-28 sm:pb-20 overflow-hidden bg-stone-950"
    >
      {/* Background Image with Cinematic Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={config.heroImages[0]}
          alt={`Ambiente e produtos da ${config.name}`}
          className="w-full h-full object-cover object-center scale-105 animate-[pulse_10s_ease-in-out_infinite] opacity-40 brightness-75 filter"
          loading="eager"
          fetchPriority="high"
        />
        {/* Multilayered gradients for contrast & depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/60" />
        <div className="absolute inset-0 bg-radial from-amber-600/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Admin Floating Trigger to change Hero background photo */}
      {isAdminMode && onEditHeroBg && (
        <div className="absolute bottom-20 sm:bottom-8 right-4 sm:right-8 z-30">
          <button
            id="btn-admin-change-hero-photo"
            onClick={onEditHeroBg}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-stone-950/90 hover:bg-stone-900 border-2 border-amber-500 text-amber-300 text-xs sm:text-sm font-bold shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          >
            <Camera className="w-4 h-4 text-amber-400" />
            <span>Trocar Foto de Capa (Hero)</span>
          </button>
        </div>
      )}

      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Top Badge: Tradição & Selo de Qualidade */}
        <div 
          id="hero-badge"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium mb-5 sm:mb-6 shadow-lg shadow-amber-950/40 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{config.heroBadge}</span>
          <span className="w-1 h-1 rounded-full bg-amber-400" />
          <span className="text-amber-200/80">Desde {config.foundingYear}</span>
        </div>

        {/* Logo Badge & Monograma Visual */}
        <div 
          id="hero-logo-badge"
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 p-0.5 shadow-2xl shadow-amber-700/30 mb-4 sm:mb-6"
        >
          <div className="w-full h-full bg-stone-950/90 rounded-[14px] flex flex-col items-center justify-center p-1 border border-amber-400/30">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-400 tracking-wider">
              {config.name.charAt(0)}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-amber-200/70 font-semibold -mt-1">
              EST. {config.foundingYear}
            </span>
          </div>
        </div>

        {/* Main Restaurant Title */}
        <div className="relative group">
          <h1
            id="hero-title"
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-[1.1]"
          >
            <span className="block text-stone-100">{config.name}</span>
            <span className="block text-xl sm:text-2xl md:text-3xl font-sans font-light tracking-wide text-amber-400/90 mt-2">
              {config.tagline}
            </span>
          </h1>

          {isAdminMode && onEditTexts && (
            <button
              onClick={onEditTexts}
              className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold mb-4 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar Nome, Slogan & Escritas</span>
            </button>
          )}
        </div>

        {/* Short Description */}
        <p
          id="hero-description"
          className="max-w-2xl text-stone-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-8 sm:mb-10 text-balance px-2"
        >
          {config.shortDescription}
        </p>

        {/* Main Call-to-Actions (Responsive Stack) */}
        <div 
          id="hero-actions-container"
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-5 w-full max-w-md sm:max-w-lg mb-10 sm:mb-12"
        >
          {/* Primary Button: Ver Cardápio */}
          <a
            id="btn-hero-menu"
            href="#cardapio"
            onClick={onOpenMenu}
            className="flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 bg-[length:200%_auto] hover:bg-right text-stone-950 font-bold text-base sm:text-lg shadow-xl shadow-amber-600/25 transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <UtensilsCrossed className="w-5 h-5 text-stone-950" />
            <span>VER CARDÁPIO</span>
          </a>

          {/* Secondary Button: Pedir pelo WhatsApp */}
          <a
            id="btn-hero-whatsapp"
            href={`https://wa.me/${config.whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20na%20${encodeURIComponent(config.name)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-emerald-400 border border-emerald-500/40 font-bold text-base sm:text-lg shadow-xl shadow-black/60 transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <MessageCircle className="w-5 h-5 fill-current text-emerald-400" />
            <span>PEDIR PELO WHATSAPP</span>
          </a>
        </div>

        {/* Live Operating Status & Quick Location Pill */}
        <div 
          id="hero-info-pills"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl px-2 text-left"
        >
          {/* Horário hoje */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-stone-900/70 border border-stone-800/80 backdrop-blur-md">
            <div className={`p-2 rounded-lg ${openStatus.isOpen ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${openStatus.isOpen ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                <p className="text-xs font-semibold text-stone-200">{openStatus.message}</p>
              </div>
              <p className="text-[11px] text-stone-400">Hoje: {openStatus.todaySchedule}</p>
            </div>
          </div>

          {/* Endereço rápido */}
          <a 
            href={config.address.googleMapsUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-stone-900/70 border border-stone-800/80 hover:border-amber-500/40 backdrop-blur-md transition-colors group"
          >
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-stone-200 truncate group-hover:text-amber-400 transition-colors">
                {config.address.street} - {config.address.neighborhood}
              </p>
              <p className="text-[11px] text-stone-400 truncate">
                {config.address.city} - {config.address.state} • Toque para ver mapa
              </p>
            </div>
          </a>
        </div>

        {/* Small Slide-Down Prompt (Requested) */}
        <a
          id="hero-scroll-indicator"
          href="#cardapio"
          aria-label="Deslizar para ver o cardápio"
          className="mt-12 sm:mt-14 inline-flex flex-col items-center gap-1 text-stone-400 hover:text-amber-400 transition-colors group focus:outline-none"
        >
          <span className="text-[11px] font-medium tracking-wider uppercase text-stone-400 group-hover:text-amber-300">
            Deslize para explorar
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-stone-700 flex items-start justify-center p-1 group-hover:border-amber-500/60 transition-colors">
            <div className="w-1.5 h-2.5 bg-amber-400 rounded-full animate-bounce mt-1" />
          </div>
          <ChevronDown className="w-4 h-4 text-stone-500 group-hover:text-amber-400 animate-pulse -mt-1" />
        </a>

      </div>
    </section>
  );
};
