import React, { useState } from 'react';
import { CartItem, RestaurantConfig } from '../types';
import { formatBRL, getWhatsAppCartUrl } from '../config/restaurantConfig';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle, 
  ArrowRight,
  Store,
  Truck
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  config: RestaurantConfig;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  config,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [customerName, setCustomerName] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'retirada' | 'entrega'>('retirada');
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;
    const url = getWhatsAppCartUrl(config, items, {
      name: customerName,
      deliveryMethod,
      address: deliveryMethod === 'entrega' ? address : undefined
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="cart-drawer-panel"
        className="fixed top-0 right-0 w-full max-w-md h-full bg-stone-950 border-l border-stone-800 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-white">Sua Sacola</h2>
              <p className="text-xs text-stone-400">
                {totalItemsCount} {totalItemsCount === 1 ? 'item selecionado' : 'itens selecionados'}
              </p>
            </div>
          </div>
          <button
            id="btn-close-cart-drawer"
            onClick={onClose}
            aria-label="Fechar sacola"
            className="p-2 text-stone-400 hover:text-white rounded-lg focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-500 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-stone-200 mb-1">Sua sacola está vazia</h3>
              <p className="text-xs text-stone-400 mb-6">
                Explore o cardápio e adicione seus itens favoritos da {config.name}.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400 transition-colors"
              >
                Voltar ao Cardápio
              </button>
            </div>
          ) : (
            <>
              {items.map(({ product, quantity, notes }) => (
                <div
                  key={product.id}
                  id={`cart-item-${product.id}`}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-stone-900/80 border border-stone-800/90"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-sm text-stone-100 truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs font-semibold text-amber-400">
                      {formatBRL(product.price * quantity)}
                    </p>
                    {notes && (
                      <p className="text-[10px] text-stone-400 italic truncate mt-0.5">
                        Obs: {notes}
                      </p>
                    )}

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        className="w-6 h-6 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center text-xs"
                        aria-label="Diminuir"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white w-4 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        className="w-6 h-6 rounded-md bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center text-xs font-bold"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(product.id)}
                    className="p-2 text-stone-500 hover:text-rose-400 rounded-lg transition-colors shrink-0"
                    aria-label={`Remover ${product.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={onClearCart}
                  className="text-xs text-stone-400 hover:text-rose-400 underline underline-offset-2 transition-colors"
                >
                  Limpar toda a sacola
                </button>
              </div>

              {/* Order Options (Customer Name & Method) */}
              <div className="pt-4 mt-4 border-t border-stone-800/80 space-y-3">
                <div>
                  <label 
                    htmlFor="cart-customer-name"
                    className="block text-xs font-semibold text-stone-300 mb-1"
                  >
                    Seu Nome (opcional):
                  </label>
                  <input
                    id="cart-customer-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: Maria Silva"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-900 border border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Como deseja receber:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('retirada')}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-medium transition-colors ${
                        deliveryMethod === 'retirada'
                          ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                          : 'bg-stone-900 text-stone-300 border-stone-800'
                      }`}
                    >
                      <Store className="w-3.5 h-3.5" />
                      <span>Retirada Balcão</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('entrega')}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-medium transition-colors ${
                        deliveryMethod === 'entrega'
                          ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                          : 'bg-stone-900 text-stone-300 border-stone-800'
                      }`}
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Entrega (Delivery)</span>
                    </button>
                  </div>
                </div>

                {deliveryMethod === 'entrega' && (
                  <div>
                    <label 
                      htmlFor="cart-delivery-address"
                      className="block text-xs font-semibold text-stone-300 mb-1"
                    >
                      Endereço com bairro e ponto de referência:
                    </label>
                    <input
                      id="cart-delivery-address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Rua, número, bairro..."
                      className="w-full px-3 py-2 text-xs rounded-xl bg-stone-900 border border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-800 bg-stone-900/90 space-y-3 pb-safe">
            <div className="flex items-center justify-between">
              <span className="text-stone-300 text-sm">Valor Total:</span>
              <span className="text-2xl font-bold text-amber-400">
                {formatBRL(totalAmount)}
              </span>
            </div>

            <button
              id="btn-checkout-whatsapp"
              onClick={handleCheckoutWhatsApp}
              className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 active:scale-95 transition-all flex items-center justify-center gap-2.5"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>FINALIZAR PEDIDO NO WHATSAPP</span>
            </button>
            <p className="text-[11px] text-center text-stone-400">
              O pedido será montado e enviado formatado diretamente para {config.whatsappFormatted}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
