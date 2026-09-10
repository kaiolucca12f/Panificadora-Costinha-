import React, { useState } from 'react';
import { RestaurantConfig } from '../types';
import { 
  X, 
  Code, 
  Globe, 
  DollarSign, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  BookOpen, 
  Sliders, 
  FileCode, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';

interface ConfigGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfigId: string;
  onSwitchConfig: (configId: 'costinha' | 'maison-grill') => void;
}

export const ConfigGuideModal: React.FC<ConfigGuideModalProps> = ({
  isOpen,
  onClose,
  currentConfigId,
  onSwitchConfig
}) => {
  const [activeTab, setActiveTab] = useState<'switch' | 'howto' | 'deploy' | 'sales'>('switch');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyConfigSnippet = () => {
    const snippet = `// src/config/restaurantConfig.ts
export const meuRestauranteConfig: RestaurantConfig = {
  name: "Nome do Restaurante",
  tagline: "Gastronomia & Delivery",
  whatsappNumber: "5577999998888", // Apenas números com DDI + DDD
  phoneNumber: "(77) 3484-2040",
  instagramHandle: "@restaurante",
  instagramUrl: "https://instagram.com/restaurante",
  address: {
    street: "Rua do Cliente, 123",
    neighborhood: "Centro",
    city: "Santana",
    state: "BA",
    zipCode: "47700-000",
    fullFormatted: "Rua do Cliente, 123 - Centro, Santana - BA",
    googleMapsUrl: "https://maps.google.com/?q=Rua+do+Cliente+123"
  },
  // ... categorias e produtos
};`;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="config-guide-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="config-guide-container"
        className="relative w-full max-w-3xl max-h-[90vh] bg-stone-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-white">
                Central de Personalização & Publicação Comercial
              </h2>
              <p className="text-xs text-stone-400">
                Guia prático para trocar dados de restaurantes e publicar online
              </p>
            </div>
          </div>
          <button
            id="btn-close-config-guide"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg focus:outline-none"
            aria-label="Fechar guia"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 px-5 pt-3 bg-stone-950/60 border-b border-stone-800 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('switch')}
            className={`pb-3 px-3 flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'switch'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Alternar Demonstração (Ao Vivo)</span>
          </button>

          <button
            onClick={() => setActiveTab('howto')}
            className={`pb-3 px-3 flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'howto'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Como Editar o Código</span>
          </button>

          <button
            onClick={() => setActiveTab('deploy')}
            className={`pb-3 px-3 flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'deploy'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Publicar Grátis na Internet</span>
          </button>

          <button
            onClick={() => setActiveTab('sales')}
            className={`pb-3 px-3 flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'sales'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Argumentos de Venda</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6 text-sm text-stone-300">
          
          {/* TAB 1: Demonstrador Ao Vivo */}
          {activeTab === 'switch' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs leading-relaxed">
                <strong>Demonstração instantânea:</strong> Veja como o site inteiro (Hero, cardápio, fotos, WhatsApp e categorias) muda de um estabelecimento para outro usando o mesmo código modular!
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option 1: Panificadora Costinha */}
                <div 
                  onClick={() => onSwitchConfig('costinha')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    currentConfigId === 'costinha'
                      ? 'bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/30 shadow-xl'
                      : 'bg-stone-950 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-base text-white">
                      Panificadora Costinha
                    </span>
                    {currentConfigId === 'costinha' && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px]">
                        Ativo
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 mb-3">
                    Padaria artesanal, cafeteria, croissants, pães de queijo e confeitaria em Santana - BA.
                  </p>
                  <div className="text-[11px] text-stone-400 font-mono space-y-0.5">
                    <p>WhatsApp: (77) 3484-2040</p>
                    <p>Instagram: @panificadoracostinha</p>
                  </div>
                </div>

                {/* Option 2: Maison Grill */}
                <div 
                  onClick={() => onSwitchConfig('maison-grill')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    currentConfigId === 'maison-grill'
                      ? 'bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/30 shadow-xl'
                      : 'bg-stone-950 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-base text-white">
                      Maison Grill Steakhouse
                    </span>
                    {currentConfigId === 'maison-grill' && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px]">
                        Ativo
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 mb-3">
                    Exemplo de Steakhouse & Bistrô com cortes nobres Black Angus, hambúrgueres artesanais e vinhos.
                  </p>
                  <div className="text-[11px] text-stone-400 font-mono space-y-0.5">
                    <p>WhatsApp: (77) 99999-8888</p>
                    <p>Instagram: @maisongrilloficial</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-stone-400 text-center">
                Clique no card acima para aplicar a demonstração em tempo real e feche esta janela para ver a página!
              </p>
            </div>
          )}

          {/* TAB 2: Como Editar */}
          {activeTab === 'howto' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-white text-base">
                  1. Onde ficam os dados do restaurante?
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Todos os dados de texto, cores, fotos, preços, horários e WhatsApp estão concentrados em um único arquivo:
                </p>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 font-mono text-xs text-amber-400 flex items-center justify-between">
                  <span>src/config/restaurantConfig.ts</span>
                  <button
                    onClick={copyConfigSnippet}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copiado!' : 'Copiar Exemplo'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-serif font-bold text-white text-base">
                  2. O que você altera para cada novo cliente:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <li className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                    <strong className="text-white block">Nome & Slogan:</strong>
                    Troque <code className="text-amber-400">name</code> e <code className="text-amber-400">tagline</code>.
                  </li>
                  <li className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                    <strong className="text-white block">WhatsApp:</strong>
                    Altere <code className="text-amber-400">whatsappNumber</code> (Ex: 557734842040).
                  </li>
                  <li className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                    <strong className="text-white block">Endereço & Maps:</strong>
                    Atualize a chave <code className="text-amber-400">address</code>.
                  </li>
                  <li className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                    <strong className="text-white block">Horários:</strong>
                    Edite o array <code className="text-amber-400">openingHours</code> para cada dia.
                  </li>
                  <li className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 sm:col-span-2">
                    <strong className="text-white block">Produtos & Categorias:</strong>
                    Edite os arrays <code className="text-amber-400">categories</code> e <code className="text-amber-400">products</code> (preço, descrição, ingredientes e foto).
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: Publicar Grátis */}
          {activeTab === 'deploy' && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-white text-base">
                Como publicar 100% grátis na internet:
              </h3>
              
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
                  <strong className="text-amber-400 text-sm block">Opção A: Vercel (Recomendado - 2 minutos)</strong>
                  <p className="text-stone-300">
                    1. Crie uma conta gratuita em <strong className="text-white">vercel.com</strong>.<br />
                    2. Conecte seu repositório do GitHub ou arraste a pasta do projeto.<br />
                    3. Clique em <strong>Deploy</strong>. O site gera um link oficial gratuito com HTTPS (ex: <em>panificadoracostinha.vercel.app</em>).<br />
                    4. Você pode conectar o domínio próprio do restaurante (ex: <em>panificadoracostinha.com.br</em>) sem pagar nada a mais de hospedagem!
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
                  <strong className="text-amber-400 text-sm block">Opção B: Netlify</strong>
                  <p className="text-stone-300">
                    Execute <code className="text-amber-400">npm run build</code> no seu computador e arraste a pasta <code className="text-white">dist</code> para o painel do Netlify Drop. O site fica online imediatamente.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
                  <p>
                    <strong>Custo de servidor: R$ 0,00 por mês!</strong> O site roda como uma aplicação estática ultrarrápida (SPA) sem custos de banco de dados ou servidores pesados.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Argumentos de Venda */}
          {activeTab === 'sales' && (
            <div className="space-y-3 text-xs">
              <h3 className="font-serif font-bold text-white text-base mb-2">
                Como vender este site para donos de restaurantes e padarias:
              </h3>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <strong className="text-amber-400 block">1. Zero Comissões de Delivery</strong>
                <p className="text-stone-300">
                  Mostre ao dono que o cliente pede direto no WhatsApp dele, sem pagar 12% a 27% de taxas cobradas por aplicativos de delivery.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <strong className="text-amber-400 block">2. Cardápio Digital no Celular (QR Code no Balcão)</strong>
                <p className="text-stone-300">
                  O cliente pode acessar o site via QR Code colado nas mesas ou no balcão da padaria, conferindo fotos em alta qualidade de cada doce, pão e café.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <strong className="text-amber-400 block">3. Presença Profissional no Google & Instagram</strong>
                <p className="text-stone-300">
                  O site tem SEO estruturado, botão para traçar rota no Google Maps e link para seguir o Instagram oficial da loja.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-stone-950 border-t border-stone-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors"
          >
            Entendido, Explorar Site
          </button>
        </div>
      </div>
    </div>
  );
};
