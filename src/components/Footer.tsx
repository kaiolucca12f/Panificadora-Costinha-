import React from 'react';
import { RestaurantConfig } from '../types';
import { 
  Instagram, 
  MessageCircle, 
  MapPin, 
  ArrowUp, 
  Phone, 
  SlidersHorizontal,
  Heart,
  ShieldCheck
} from 'lucide-react';

interface FooterProps {
  config: RestaurantConfig;
  onOpenConfigGuide: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenConfigGuide, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="main-footer"
      className="bg-stone-950 border-t border-stone-800/90 text-stone-400 pt-16 pb-24 lg:pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col (5 cols on LG) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-serif font-bold text-lg border border-amber-300/40">
                {config.name.charAt(0)}
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white block">
                  {config.name}
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-500">
                  {config.logoSubtext}
                </span>
              </div>
            </div>

            <p className="text-stone-400 text-sm max-w-sm leading-relaxed">
              {config.shortDescription}
            </p>

            {/* Social & WhatsApp Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                id="footer-social-whatsapp"
                href={`https://wa.me/${config.whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20na%20${encodeURIComponent(config.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp do restaurante"
                className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 hover:border-emerald-500/50 text-stone-300 hover:text-emerald-400 flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>

              <a
                id="footer-social-instagram"
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram do restaurante"
                className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 hover:border-pink-500/50 text-stone-300 hover:text-pink-400 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                id="footer-social-phone"
                href={config.phoneTelLink}
                aria-label="Telefone do restaurante"
                className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-stone-300 hover:text-amber-400 flex items-center justify-center transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links (3 cols on LG) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-stone-200 text-base">Navegação Rápida</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inicio" className="hover:text-amber-400 transition-colors">Início</a>
              </li>
              <li>
                <a href="#cardapio" className="hover:text-amber-400 transition-colors">Cardápio Completo</a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-amber-400 transition-colors">Localização & Fotos Reais</a>
              </li>
              <li>
                <a href="#instagram" className="hover:text-amber-400 transition-colors">Galeria Instagram</a>
              </li>
              <li>
                <a href="#contato" className="hover:text-amber-400 transition-colors">Canais de Contato</a>
              </li>
            </ul>
          </div>

          {/* Address & Hours (4 cols on LG) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-stone-200 text-base">Atendimento Presencial</h4>
            <div className="space-y-2 text-xs leading-relaxed text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p>
                  {config.address.fullFormatted}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p>
                  Telefone: {config.phoneNumber} • WhatsApp: {config.whatsappFormatted}
                </p>
              </div>
              <p className="text-[11px] text-stone-400 pl-6 pt-1">
                Seg a Sáb: 05:00 às 20:00 (Sex até 19:00) • Dom: 05:00 às 12:00
              </p>
            </div>

            {/* Admin & Commercial Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                id="btn-footer-admin"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 text-xs font-semibold transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Painel Administrador</span>
              </button>

              <button
                id="btn-footer-config-guide"
                onClick={onOpenConfigGuide}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-300 hover:bg-stone-800 text-xs font-semibold transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Como editar para clientes</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p id="copyright-text">
            © 2026 {config.name}. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-stone-400">
              Desenvolvido com padrão de alta gastronomia e agência premium
            </span>

            <button
              id="btn-scroll-top"
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white transition-colors focus:outline-none"
              aria-label="Voltar ao topo da página"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
