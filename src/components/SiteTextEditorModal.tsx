import React, { useState } from 'react';
import { RestaurantConfig, OpeningHourDay } from '../types';
import { 
  X, 
  Save, 
  FileText, 
  Store, 
  Phone, 
  Clock, 
  MapPin, 
  Check, 
  RotateCcw,
  Sparkles 
} from 'lucide-react';

interface SiteTextEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: RestaurantConfig;
  onSave: (updatedConfig: RestaurantConfig) => void;
}

export const SiteTextEditorModal: React.FC<SiteTextEditorModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<'textos' | 'contatos' | 'endereco' | 'horarios'>('textos');
  
  // Local state for all fields
  const [name, setName] = useState(config.name);
  const [tagline, setTagline] = useState(config.tagline);
  const [shortDescription, setShortDescription] = useState(config.shortDescription);
  const [heroBadge, setHeroBadge] = useState(config.heroBadge);
  const [foundingYear, setFoundingYear] = useState(config.foundingYear);

  // Contacts
  const [whatsappNumber, setWhatsappNumber] = useState(config.whatsappNumber);
  const [whatsappFormatted, setWhatsappFormatted] = useState(config.whatsappFormatted);
  const [phoneNumber, setPhoneNumber] = useState(config.phoneNumber);
  const [instagramHandle, setInstagramHandle] = useState(config.instagramHandle);
  const [instagramUrl, setInstagramUrl] = useState(config.instagramUrl);

  // Address
  const [street, setStreet] = useState(config.address.street);
  const [neighborhood, setNeighborhood] = useState(config.address.neighborhood);
  const [city, setCity] = useState(config.address.city);
  const [state, setState] = useState(config.address.state);
  const [zipCode, setZipCode] = useState(config.address.zipCode);
  const [googleMapsUrl, setGoogleMapsUrl] = useState(config.address.googleMapsUrl);

  // Opening Hours
  const [openingHours, setOpeningHours] = useState<OpeningHourDay[]>(config.openingHours);

  if (!isOpen) return null;

  const handleHourChange = (index: number, field: 'openTime' | 'closeTime' | 'isClosed', value: any) => {
    setOpeningHours((prev) =>
      prev.map((h, i) => (i === index ? { ...h, [field]: value } : h))
    );
  };

  const handleConfirmSave = () => {
    const fullFormatted = `${street} - ${neighborhood}, ${city} - ${state}, ${zipCode}`;
    const updated: RestaurantConfig = {
      ...config,
      name,
      tagline,
      shortDescription,
      heroBadge,
      foundingYear: Number(foundingYear) || config.foundingYear,
      whatsappNumber,
      whatsappFormatted,
      phoneNumber,
      phoneTelLink: `tel:+${whatsappNumber}`,
      instagramHandle,
      instagramUrl,
      address: {
        ...config.address,
        street,
        neighborhood,
        city,
        state,
        zipCode,
        fullFormatted,
        googleMapsUrl
      },
      openingHours
    };
    onSave(updated);
    onClose();
  };

  return (
    <div
      id="site-text-editor-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="site-text-editor-box"
        className="relative w-full max-w-3xl max-h-[92vh] bg-stone-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-white text-lg">
                Personalizar Textos & Informações do Site
              </h2>
              <p className="text-xs text-stone-400">
                Altere títulos, descrições, contatos, endereço e horários de funcionamento
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-stone-800 bg-stone-950/60 px-4 pt-2 text-xs font-semibold gap-1">
          <button
            onClick={() => setActiveTab('textos')}
            className={`px-4 py-2.5 rounded-t-xl border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'textos'
                ? 'border-amber-400 text-amber-400 bg-stone-900/60'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Identidade & Textos Principais</span>
          </button>

          <button
            onClick={() => setActiveTab('contatos')}
            className={`px-4 py-2.5 rounded-t-xl border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'contatos'
                ? 'border-amber-400 text-amber-400 bg-stone-900/60'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Contatos & Redes</span>
          </button>

          <button
            onClick={() => setActiveTab('endereco')}
            className={`px-4 py-2.5 rounded-t-xl border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'endereco'
                ? 'border-amber-400 text-amber-400 bg-stone-900/60'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Endereço & Maps</span>
          </button>

          <button
            onClick={() => setActiveTab('horarios')}
            className={`px-4 py-2.5 rounded-t-xl border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'horarios'
                ? 'border-amber-400 text-amber-400 bg-stone-900/60'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Horários de Funcionamento</span>
          </button>
        </div>

        {/* Content Tabs */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs text-stone-300">
          
          {/* TAB 1: IDENTIDADE E TEXTOS */}
          {activeTab === 'textos' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  Nome do Estabelecimento (Título Principal)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white font-serif font-bold text-sm focus:border-amber-500 focus:outline-none"
                  placeholder="Ex: Panificadora Costinha"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  Slogan / Subtítulo da Marca
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:border-amber-500 focus:outline-none"
                  placeholder="Ex: Padaria Artesanal, Cafeteria & Confeitaria Fina"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  Texto de Apresentação / Descrição da Loja
                </label>
                <textarea
                  rows={3}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs leading-relaxed focus:border-amber-500 focus:outline-none"
                  placeholder="Descreva o carinho, tradição e os produtos da sua padaria..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Selo de Destaque no Topo (Hero Badge)
                  </label>
                  <input
                    type="text"
                    value={heroBadge}
                    onChange={(e) => setHeroBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:border-amber-500 focus:outline-none"
                    placeholder="Ex: Fornadas Quentes a Partir das 05h"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Ano de Fundação (ou Tradição)
                  </label>
                  <input
                    type="number"
                    value={foundingYear}
                    onChange={(e) => setFoundingYear(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:border-amber-500 focus:outline-none"
                    placeholder="Ex: 1994"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONTATOS & REDES */}
          {activeTab === 'contatos' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  WhatsApp para Pedidos (apenas números com DDI 55 e DDD)
                </label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
                  placeholder="Ex: 557734842040"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  É para este número que os clientes enviam os pedidos do carrinho com 1 clique!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Telefone Fixo / Exibição Formatada
                  </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      setWhatsappFormatted(e.target.value);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:border-amber-500 focus:outline-none"
                    placeholder="Ex: (77) 3484-2040"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Instagram (@ do seu perfil)
                  </label>
                  <input
                    type="text"
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:border-amber-500 focus:outline-none"
                    placeholder="Ex: @panificadoracostinha"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  Link Direto do Instagram
                </label>
                <input
                  type="url"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:border-amber-500 focus:outline-none"
                  placeholder="Ex: https://instagram.com/panificadoracostinha"
                />
              </div>
            </div>
          )}

          {/* TAB 3: ENDEREÇO & MAPS */}
          {activeTab === 'endereco' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  Rua / Praça e Número
                </label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:border-amber-500 focus:outline-none"
                  placeholder="Ex: Praça da Bandeira, 90"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Bairro
                  </label>
                  <input
                    type="text"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:border-amber-500 focus:outline-none"
                    placeholder="Ex: Centro"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Cidade
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:border-amber-500 focus:outline-none"
                    placeholder="Ex: Santana"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Estado (UF)
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs uppercase focus:border-amber-500 focus:outline-none"
                    placeholder="Ex: BA"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    CEP
                  </label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:border-amber-500 focus:outline-none"
                    placeholder="Ex: 47700-000"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Link do Google Maps (para o botão Traçar Rota)
                  </label>
                  <input
                    type="url"
                    value={googleMapsUrl}
                    onChange={(e) => setGoogleMapsUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:border-amber-500 focus:outline-none"
                    placeholder="Link do Google Maps..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: HORÁRIOS */}
          {activeTab === 'horarios' && (
            <div className="space-y-3">
              <p className="text-xs text-stone-400 mb-2">
                Configure os horários de abertura e fechamento para cada dia:
              </p>

              <div className="space-y-2">
                {openingHours.map((hour, idx) => (
                  <div
                    key={hour.dayName}
                    className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-stone-950 border border-stone-800"
                  >
                    <span className="w-28 font-bold text-white text-xs">
                      {hour.dayName}
                    </span>

                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-1.5 text-[11px] text-stone-400">
                        <input
                          type="checkbox"
                          checked={hour.isClosed || false}
                          onChange={(e) => handleHourChange(idx, 'isClosed', e.target.checked)}
                          className="rounded border-stone-700 bg-stone-900 text-amber-500 focus:ring-amber-500"
                        />
                        <span>Fechado</span>
                      </label>

                      {!hour.isClosed && (
                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            value={hour.openTime}
                            onChange={(e) => handleHourChange(idx, 'openTime', e.target.value)}
                            className="px-2 py-1 rounded bg-stone-900 border border-stone-700 text-white text-xs font-mono"
                          />
                          <span className="text-stone-500">às</span>
                          <input
                            type="time"
                            value={hour.closeTime}
                            onChange={(e) => handleHourChange(idx, 'closeTime', e.target.value)}
                            className="px-2 py-1 rounded bg-stone-900 border border-stone-700 text-white text-xs font-mono"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-400 hover:text-white text-xs transition-colors"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleConfirmSave}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs shadow-lg shadow-amber-600/30 active:scale-95 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Todas as Escritas</span>
          </button>
        </div>
      </div>
    </div>
  );
};
