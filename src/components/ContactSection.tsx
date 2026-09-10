import React from 'react';
import { RestaurantConfig } from '../types';
import { 
  Phone, 
  MessageCircle, 
  Instagram, 
  MapPin, 
  Clock, 
  Send, 
  ExternalLink 
} from 'lucide-react';

interface ContactSectionProps {
  config: RestaurantConfig;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config }) => {
  return (
    <section
      id="contato"
      className="py-20 sm:py-28 bg-stone-950 relative overflow-hidden border-t border-stone-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Canais Oficiais de Atendimento</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Entre em Contato Conosco
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Estamos prontos para atender pedidos, encomendas, orçamentos para eventos ou esclarecer qualquer dúvida.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          
          {/* Card WhatsApp */}
          <div 
            id="contact-card-whatsapp"
            className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-1">WhatsApp</h3>
              <p className="text-xs text-stone-400 mb-4">
                Atendimento rápido para pedidos e dúvidas
              </p>
              <p className="text-sm font-semibold text-emerald-400 mb-6">
                {config.whatsappFormatted}
              </p>
            </div>
            <a
              id="btn-contact-whatsapp"
              href={`https://wa.me/${config.whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20o%20atendimento%20da%20${encodeURIComponent(config.name)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>Conversar no WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card Telefone */}
          <div 
            id="contact-card-phone"
            className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-1">Telefone Fixo</h3>
              <p className="text-xs text-stone-400 mb-4">
                Ligação direta para o balcão da loja
              </p>
              <p className="text-sm font-semibold text-amber-400 mb-6">
                {config.phoneNumber}
              </p>
            </div>
            <a
              id="btn-contact-phone"
              href={config.phoneTelLink}
              className="w-full py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs border border-stone-700 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>Ligar Agora</span>
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card Instagram */}
          <div 
            id="contact-card-instagram"
            className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 hover:border-pink-500/50 transition-all flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-4">
                <Instagram className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-1">Instagram</h3>
              <p className="text-xs text-stone-400 mb-4">
                Acompanhe fotos e novidades diárias
              </p>
              <p className="text-sm font-semibold text-pink-400 mb-6">
                {config.instagramHandle}
              </p>
            </div>
            <a
              id="btn-contact-instagram"
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 text-white font-bold text-xs shadow-lg shadow-pink-950/50 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>Ver Perfil</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card Local & Horários */}
          <div 
            id="contact-card-location"
            className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-1">Localização</h3>
              <p className="text-xs text-stone-300 leading-snug mb-2">
                {config.address.street} - {config.address.neighborhood}
              </p>
              <p className="text-xs text-stone-400 mb-4">
                {config.address.city} - {config.address.state}, {config.address.zipCode}
              </p>
              <p className="text-[11px] text-amber-400 font-medium">
                Seg a Sáb: 05h–20h (Sex até 19h) | Dom: 05h–12h
              </p>
            </div>
            <a
              id="btn-contact-maps"
              href={config.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 font-bold text-xs border border-stone-700 flex items-center justify-center gap-2 active:scale-95 transition-all mt-6"
            >
              <span>Traçar Rota no Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
