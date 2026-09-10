import React, { useState, useMemo } from 'react';
import { RestaurantConfig, MenuItem } from '../types';
import { formatBRL, getWhatsAppProductUrl } from '../config/restaurantConfig';
import { CategoryIcon } from './CategoryIcon';
import { 
  Search, 
  Sparkles, 
  MessageCircle, 
  ShoppingBag, 
  SlidersHorizontal, 
  X,
  Flame,
  ArrowRight,
  Camera,
  Edit3,
  Plus
} from 'lucide-react';

interface MenuSectionProps {
  config: RestaurantConfig;
  onSelectProduct: (product: MenuItem) => void;
  onQuickAddToCart: (product: MenuItem) => void;
  isAdminMode?: boolean;
  onEditProduct?: (product: MenuItem) => void;
  onAddProduct?: () => void;
  onChangeProductPhoto?: (product: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  config,
  onSelectProduct,
  onQuickAddToCart,
  isAdminMode,
  onEditProduct,
  onAddProduct,
  onChangeProductPhoto
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyPopular, setOnlyPopular] = useState<boolean>(false);

  // Filter products by category, search text, and popular toggle
  const filteredProducts = useMemo(() => {
    return config.products.filter((item) => {
      // Category filter
      if (activeCategory !== 'todos' && item.category !== activeCategory) {
        return false;
      }
      // Popular filter
      if (onlyPopular && !item.isPopular) {
        return false;
      }
      // Search query
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngredients = item.ingredients?.some((ing) => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesIngredients) {
          return false;
        }
      }
      return true;
    });
  }, [config.products, activeCategory, searchQuery, onlyPopular]);

  return (
    <section
      id="cardapio"
      className="py-16 sm:py-24 bg-stone-950 relative overflow-hidden"
    >
      {/* Subtle Background Texture & Glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cardápio Digital & Artesanal</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Nossas Delícias & Especialidades
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Feito diariamente com receitas de família, ingredientes de alta pureza e o carinho que você já conhece.
          </p>

          {isAdminMode && onAddProduct && (
            <div className="mt-4">
              <button
                id="btn-admin-add-product-menu"
                onClick={onAddProduct}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-xl shadow-amber-500/25 transition-all active:scale-95"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>+ Adicionar Novo Item ao Cardápio</span>
              </button>
            </div>
          )}
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-xl mx-auto mb-8 flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="search-menu-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por pães, croissants, cafés, bolos..."
              className="w-full pl-10 pr-10 py-3 rounded-2xl bg-stone-900/90 border border-stone-800 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                id="btn-clear-search"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 p-1"
                aria-label="Limpar busca"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Popular filter button */}
          <button
            id="btn-toggle-popular"
            onClick={() => setOnlyPopular(!onlyPopular)}
            className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold border transition-all active:scale-95 ${
              onlyPopular
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-lg shadow-amber-500/20'
                : 'bg-stone-900 border-stone-800 text-stone-300 hover:text-white hover:border-stone-700'
            }`}
          >
            <Flame className={`w-4 h-4 ${onlyPopular ? 'text-stone-950 fill-stone-950' : 'text-amber-500'}`} />
            <span>Mais Pedidos</span>
          </button>
        </div>

        {/* Horizontal Category Scroll (Optimized for Mobile Touch) */}
        <div className="relative mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div 
            id="category-scroll-container"
            className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory focus:outline-none"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
          >
            {config.categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  id={`cat-btn-${category.id}`}
                  onClick={() => setActiveCategory(category.id)}
                  className={`snap-start whitespace-nowrap flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 border select-none active:scale-95 ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-xl shadow-amber-500/20 ring-2 ring-amber-400/30'
                      : 'bg-stone-900/90 text-stone-300 border-stone-800/90 hover:border-amber-500/40 hover:text-amber-300'
                  }`}
                >
                  <CategoryIcon
                    name={category.iconName}
                    className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-amber-500'}`}
                  />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Category Description Note */}
        {activeCategory !== 'todos' && (
          <div className="mb-6 flex items-center justify-between text-xs text-stone-400 px-1">
            <span>
              Exibindo categoria: <strong className="text-amber-400">{config.categories.find(c => c.id === activeCategory)?.name}</strong>
            </span>
            <span>{filteredProducts.length} itens encontrados</span>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div 
            id="menu-empty-state"
            className="text-center py-16 px-4 bg-stone-900/40 rounded-3xl border border-stone-800/80 max-w-lg mx-auto"
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-stone-800 flex items-center justify-center text-stone-400 mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Nenhum item encontrado</h3>
            <p className="text-sm text-stone-400 mb-6">
              Não encontramos nenhum produto com os termos pesquisados. Experimente buscar outra palavra ou limpar os filtros.
            </p>
            <button
              id="btn-reset-filters"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('todos');
                setOnlyPopular(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400 transition-colors"
            >
              Ver Cardápio Completo
            </button>
          </div>
        ) : (
          <div 
            id="menu-products-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="group relative flex flex-col rounded-3xl bg-stone-900/90 border border-stone-800 hover:border-amber-500/40 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-black/70 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Product Image Box */}
                <div 
                  className="relative h-52 sm:h-56 w-full overflow-hidden bg-stone-950 cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/20 opacity-80" />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950/80 border border-amber-500/30 text-amber-300 text-xs font-bold backdrop-blur-md shadow-lg">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{product.badge}</span>
                    </div>
                  )}

                  {/* Admin in-card quick actions */}
                  {isAdminMode && (
                    <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5">
                      {onChangeProductPhoto && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onChangeProductPhoto(product);
                          }}
                          className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold shadow-xl transition-transform active:scale-90"
                          title="Fazer upload de nova foto para este produto"
                        >
                          <Camera className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {onEditProduct && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditProduct(product);
                          }}
                          className="p-2 rounded-xl bg-stone-950/90 hover:bg-stone-900 text-amber-300 border border-amber-500/40 shadow-xl transition-transform active:scale-90"
                          title="Editar preço e textos do produto"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Quick Price Tag Overlay */}
                  <div className="absolute bottom-3.5 right-3.5 px-3 py-1.5 rounded-xl bg-stone-950/90 border border-amber-500/30 backdrop-blur-md text-amber-400 font-bold text-base shadow-lg">
                    {formatBRL(product.price)}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div 
                    className="cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-100 group-hover:text-amber-400 transition-colors leading-snug mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-stone-400 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
                      {product.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-stone-800/80 flex items-center gap-2">
                    {/* View details button */}
                    <button
                      id={`btn-details-${product.id}`}
                      onClick={() => onSelectProduct(product)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700/60 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Ver Detalhes</span>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                    </button>

                    {/* Quick WhatsApp Order */}
                    <a
                      id={`btn-card-whatsapp-${product.id}`}
                      href={getWhatsAppProductUrl(config, product, 1)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Pedir no WhatsApp"
                      className="p-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/40 transition-all flex items-center justify-center active:scale-95"
                      aria-label={`Pedir ${product.name} pelo WhatsApp`}
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                    </a>

                    {/* Quick Add to Bag */}
                    <button
                      id={`btn-card-add-cart-${product.id}`}
                      onClick={() => onQuickAddToCart(product)}
                      title="Adicionar à sacola"
                      className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition-all flex items-center justify-center active:scale-95"
                      aria-label={`Adicionar ${product.name} à sacola`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* WhatsApp Custom Order Banner */}
        <div 
          id="custom-order-banner"
          className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/40 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div className="text-center md:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
              Deseja um pedido personalizado ou encomenda especial?
            </h3>
            <p className="text-stone-300 text-sm max-w-xl">
              Fale direto com a equipe da {config.name} para tortas inteiras sob medida, cestas de café da manhã, pães para eventos ou grandes quantidades.
            </p>
          </div>
          <a
            id="btn-custom-order-whatsapp"
            href={`https://wa.me/${config.whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20encomenda%20especial%20na%20${encodeURIComponent(config.name)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 active:scale-95 transition-all flex items-center gap-2.5"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Falar com Atendente no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
