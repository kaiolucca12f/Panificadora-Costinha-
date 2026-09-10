import React, { useState } from 'react';
import { MenuItem, RestaurantConfig } from '../types';
import { formatBRL, getWhatsAppProductUrl } from '../config/restaurantConfig';
import { 
  X, 
  MessageCircle, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Clock, 
  Check, 
  Sparkles, 
  Info,
  Camera,
  Edit3
} from 'lucide-react';

interface ProductModalProps {
  product: MenuItem | null;
  config: RestaurantConfig;
  onClose: () => void;
  onAddToCart: (product: MenuItem, quantity: number, notes?: string) => void;
  isAdminMode?: boolean;
  onEditThisProduct?: (product: MenuItem) => void;
  onUploadThisPhoto?: (product: MenuItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  config,
  onClose,
  onAddToCart,
  isAdminMode,
  onEditThisProduct,
  onUploadThisPhoto
}) => {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [addedToast, setAddedToast] = useState(false);

  if (!product) return null;

  const totalValue = product.price * quantity;

  const handleAddToCart = () => {
    onAddToCart(product, quantity, notes);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 900);
  };

  const handleWhatsAppOrder = () => {
    const url = getWhatsAppProductUrl(config, product, quantity, notes);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="product-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="product-modal-container"
        className="relative w-full max-w-xl max-h-[90vh] bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        {/* Floating Close Button */}
        <button
          id="btn-close-product-modal"
          onClick={onClose}
          aria-label="Fechar detalhes do produto"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-950/80 hover:bg-stone-900 text-stone-200 hover:text-white border border-stone-700/80 backdrop-blur-md transition-transform active:scale-95 shadow-lg focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1">
          {/* Large Hero Image */}
          <div className="relative w-full h-64 sm:h-72 bg-stone-950 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/30" />

            {/* Badge */}
            {product.badge && (
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-stone-950 font-bold text-xs shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                {product.badge}
              </span>
            )}

            {/* Admin photo upload button on modal */}
            {isAdminMode && onUploadThisPhoto && (
              <button
                onClick={() => onUploadThisPhoto(product)}
                className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-xl transition-transform active:scale-95"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Trocar Foto</span>
              </button>
            )}
          </div>

          {/* Details */}
          <div className="p-5 sm:p-7 space-y-5">
            {/* Title and Price */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-stone-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2
                    id="product-modal-title"
                    className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight"
                  >
                    {product.name}
                  </h2>
                  {isAdminMode && onEditThisProduct && (
                    <button
                      onClick={() => onEditThisProduct(product)}
                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 border border-amber-500/30 text-xs font-semibold"
                      title="Editar este produto"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                {product.preparationTime && (
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 mt-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>{product.preparationTime}</span>
                  </div>
                )}
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-stone-400 block">Preço unitário</span>
                <span className="text-2xl font-bold text-amber-400">
                  {formatBRL(product.price)}
                </span>
              </div>
            </div>

            {/* Full Description */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                Descrição do Item
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                {product.fullDescription || product.description}
              </p>
            </div>

            {/* Ingredients List */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80">
                <div className="flex items-center gap-2 mb-2.5">
                  <Info className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300">
                    Ingredientes & Composição
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map((ingredient, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-stone-800/80 text-stone-300 text-xs font-medium border border-stone-700/50"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Observation Notes */}
            <div>
              <label 
                htmlFor="product-modal-notes" 
                className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1.5"
              >
                Observações para a Cozinha / Balcão (opcional)
              </label>
              <textarea
                id="product-modal-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: sem açúcar, bem passado, aquecer antes de embalar..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              />
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-950 border border-stone-800">
              <span className="text-sm font-semibold text-stone-300">Quantidade:</span>
              <div className="flex items-center gap-3">
                <button
                  id="btn-modal-qty-decrease"
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                  className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors focus:outline-none"
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-lg text-white w-6 text-center">
                  {quantity}
                </span>
                <button
                  id="btn-modal-qty-increase"
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-9 h-9 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center justify-center transition-colors focus:outline-none active:scale-95"
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 sm:p-5 bg-stone-950/90 border-t border-stone-800 flex flex-col sm:flex-row items-center gap-3">
          {/* Subtotal Display */}
          <div className="w-full sm:w-auto text-left sm:pr-2">
            <span className="text-[11px] text-stone-400 block">Total do item:</span>
            <span className="text-xl font-bold text-amber-400">
              {formatBRL(totalValue)}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
            {/* Direct WhatsApp Order */}
            <button
              id="btn-modal-order-whatsapp"
              type="button"
              onClick={handleWhatsAppOrder}
              className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 active:scale-95 transition-all focus:outline-none"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>PEDIR PELO WHATSAPP</span>
            </button>

            {/* Add to Bag */}
            <button
              id="btn-modal-add-cart"
              type="button"
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-lg shadow-amber-950/50 active:scale-95 transition-all focus:outline-none"
            >
              {addedToast ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Adicionado!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Adicionar à Sacola</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
