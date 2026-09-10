import React, { useState } from 'react';
import { RestaurantConfig, StorePhoto } from '../types';
import { getRestaurantOpenStatus } from '../config/restaurantConfig';
import { 
  MapPin, 
  Clock, 
  ExternalLink, 
  Navigation, 
  Phone, 
  Sparkles,
  Camera,
  ZoomIn,
  X,
  Edit3,
  Plus
} from 'lucide-react';

interface LocationHoursSectionProps {
  config: RestaurantConfig;
  isAdminMode?: boolean;
  onEditPhoto?: (photo: StorePhoto) => void;
  onAddPhoto?: () => void;
  onEditTexts?: () => void;
}

export const LocationHoursSection: React.FC<LocationHoursSectionProps> = ({ 
  config,
  isAdminMode,
  onEditPhoto,
  onAddPhoto,
  onEditTexts
}) => {
  const currentDayIndex = new Date().getDay(); // 0 = Sun, 1 = Mon ...
  const status = getRestaurantOpenStatus(config.openingHours);
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; title: string; subtitle: string } | null>(null);

  const realPhotos: StorePhoto[] = config.storePhotos && config.storePhotos.length > 0
    ? config.storePhotos
    : [
        {
          id: 'fachada',
          src: '/fachada-costinha.jpg',
          title: 'Fachada Oficial da Panificadora Costinha',
          subtitle: 'Praça da Bandeira, 90 - Centro, Santana - BA • Telefone: (77) 3484-2040',
          badge: 'Fachada & Entrada Principal'
        },
        {
          id: 'interior',
          src: '/interior-costinha.jpg',
          title: 'Espaço Interno & Balcão de Atendimento',
          subtitle: 'Ambiente aconchegante com balcão de granito, vitrines de quitutes e bebidas geladas',
          badge: 'Ambiente Interno Tradicional'
        }
      ];

  return (
    <section
      id="localizacao"
      className="py-20 sm:py-28 bg-stone-950 relative overflow-hidden border-t border-stone-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Localização & Nossa Loja</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Venha Nos Visitar
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Localizada no centro de Santana na Praça da Bandeira. Confira nossas fotos reais, horários de atendimento e trace sua rota!
          </p>

          {isAdminMode && onEditTexts && (
            <div className="mt-4">
              <button
                onClick={onEditTexts}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar Endereço, Telefone & Horários</span>
              </button>
            </div>
          )}
        </div>

        {/* Real Photos of the Store */}
        <div className="mb-14">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-amber-400" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Fotos Reais do Nosso Estabelecimento
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {isAdminMode && onAddPhoto && (
                <button
                  onClick={onAddPhoto}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Adicionar Foto da Loja</span>
                </button>
              )}
              <span className="text-xs text-stone-400 hidden sm:inline">
                Toque na foto para ampliar
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {realPhotos.map((photo, index) => (
              <div
                key={photo.id || index}
                id={`real-photo-card-${index}`}
                className="group relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 hover:border-amber-500/50 shadow-2xl transition-all duration-300 aspect-[16/11] sm:aspect-[4/3]"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  onClick={() => setSelectedPhoto(photo)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  loading="lazy"
                />
                
                {/* Gradient overlay */}
                <div 
                  onClick={() => setSelectedPhoto(photo)}
                  className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent cursor-pointer" 
                />

                {/* Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-950/85 border border-amber-500/40 text-amber-300 text-xs font-bold backdrop-blur-md shadow-lg pointer-events-none">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{photo.badge}</span>
                </div>

                {/* Admin edit button OR zoom icon */}
                <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                  {isAdminMode && onEditPhoto ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditPhoto(photo);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-xl transition-transform active:scale-95"
                      title="Alterar esta foto ou texto"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Alterar Foto</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedPhoto(photo)}
                      className="p-2 rounded-full bg-stone-950/80 border border-stone-700 text-stone-300 group-hover:text-amber-400 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Bottom caption */}
                <div 
                  onClick={() => setSelectedPhoto(photo)}
                  className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-left cursor-pointer"
                >
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-white group-hover:text-amber-400 transition-colors mb-1">
                    {photo.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-300 leading-snug">
                    {photo.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2 Column Cards Grid: Hours & Address */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Col 1: Horários de Funcionamento (6 Cols) */}
          <div 
            id="hours-card"
            className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-stone-900/80 border border-stone-800 shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-stone-800 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white">Horário de Funcionamento</h3>
                    <p className="text-xs text-stone-400">Aberto todos os dias da semana</p>
                  </div>
                </div>

                {/* Status Indicator */}
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  status.isOpen 
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400' 
                    : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                }`}>
                  {status.isOpen ? 'Aberto Agora' : 'Fechado'}
                </span>
              </div>

              {/* Schedule List */}
              <div className="space-y-2">
                {config.openingHours.map((hour) => {
                  const isToday = hour.dayIndex === currentDayIndex;
                  return (
                    <div
                      key={hour.dayName}
                      className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                        isToday
                          ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300 font-semibold'
                          : 'bg-stone-950/40 text-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isToday && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
                        <span className="text-sm">{hour.dayName}</span>
                        {isToday && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500 text-stone-950 font-bold uppercase tracking-wider ml-1">
                            Hoje
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-mono tracking-tight text-right">
                        {hour.isClosed ? 'Fechado' : `${hour.openTime} às ${hour.closeTime}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-800 text-xs text-stone-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Fornadas quentinhas a partir das 05h da manhã!</span>
            </div>
          </div>

          {/* Col 2: Endereço & Acesso (6 Cols) */}
          <div 
            id="location-card"
            className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-stone-900/80 border border-stone-800 shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 pb-6 border-b border-stone-800 mb-6">
                <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">Nosso Endereço</h3>
                  <p className="text-xs text-stone-400">Praça da Bandeira, 90 - Centro</p>
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-1">
                  <p className="text-sm font-bold text-white">
                    {config.address.street}
                  </p>
                  <p className="text-xs text-stone-300">
                    Bairro: {config.address.neighborhood} • {config.address.city} - {config.address.state}
                  </p>
                  <p className="text-xs text-amber-400 font-mono">
                    CEP: {config.address.zipCode}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-amber-400" />
                    <div>
                      <p className="text-xs text-stone-400">Telefone para pedidos e informações</p>
                      <p className="text-sm font-bold text-stone-100">{config.phoneNumber}</p>
                    </div>
                  </div>
                  <a
                    href={config.phoneTelLink}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 border border-stone-700 transition-colors"
                  >
                    Ligar
                  </a>
                </div>
              </div>

              {/* Interactive Visual Map Card */}
              <div className="relative rounded-2xl overflow-hidden border border-stone-700/80 bg-stone-950 h-44 sm:h-48 flex items-center justify-center group shadow-inner">
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="relative z-10 flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-2xl shadow-amber-500/50 mb-2 animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <p className="font-serif font-bold text-sm text-white">
                    {config.name}
                  </p>
                  <p className="text-[11px] text-stone-400">
                    {config.address.street}, {config.address.neighborhood} - Santana - BA
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button: ABRIR NO GOOGLE MAPS */}
            <div className="pt-6 mt-6 border-t border-stone-800">
              <a
                id="btn-open-google-maps"
                href={config.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-xl shadow-amber-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Navigation className="w-4 h-4 fill-current" />
                <span>ABRIR NO GOOGLE MAPS</span>
                <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal for Real Photos */}
      {selectedPhoto && (
        <div
          id="photo-lightbox-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-stone-900 border border-stone-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-stone-950/80 hover:bg-stone-900 text-white border border-stone-700"
              aria-label="Fechar foto ampliada"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="w-full max-h-[75vh] object-contain bg-black"
            />
            <div className="p-5 bg-stone-950 border-t border-stone-800 text-left">
              <h4 className="font-serif font-bold text-lg text-white mb-1">
                {selectedPhoto.title}
              </h4>
              <p className="text-xs text-stone-300">
                {selectedPhoto.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
