import React, { useState } from 'react';
import { MenuItem, MenuCategory } from '../types';
import { X, Save, Trash2, Camera, Sparkles, Plus, AlertCircle } from 'lucide-react';
import { PhotoUploadModal } from './PhotoUploadModal';

interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: MenuItem | null; // null means adding a new product
  categories: MenuCategory[];
  onSave: (product: MenuItem) => void;
  onDelete?: (productId: string) => void;
}

export const ProductEditModal: React.FC<ProductEditModalProps> = ({
  isOpen,
  onClose,
  product,
  categories,
  onSave,
  onDelete
}) => {
  const isNew = !product;

  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product ? String(product.price) : '');
  const [category, setCategory] = useState(product?.category || (categories[1]?.id || 'paes'));
  const [description, setDescription] = useState(product?.description || '');
  const [badge, setBadge] = useState(product?.badge || '');
  const [isPopular, setIsPopular] = useState(product?.isPopular || false);
  const [image, setImage] = useState(
    product?.image || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
  );

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleConfirmSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('O nome do produto é obrigatório.');
      return;
    }
    const numPrice = parseFloat(price.replace(',', '.'));
    if (isNaN(numPrice) || numPrice < 0) {
      setErrorMsg('Informe um preço válido (ex: 12.50).');
      return;
    }

    const updatedProduct: MenuItem = {
      id: product?.id || `custom_${Date.now()}`,
      name: name.trim(),
      price: numPrice,
      category,
      description: description.trim(),
      image,
      badge: badge.trim() || undefined,
      isPopular
    };

    onSave(updatedProduct);
    onClose();
  };

  return (
    <>
      <div
        id="product-edit-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      >
        <div
          id="product-edit-box"
          className="relative w-full max-w-lg max-h-[90vh] bg-stone-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-white text-base sm:text-lg">
                {isNew ? 'Adicionar Novo Item ao Cardápio' : `Editar: ${product?.name}`}
              </h3>
              <p className="text-xs text-stone-400">
                Altere foto, nome, preço, categoria e destaques
              </p>
            </div>
            <button onClick={onClose} className="p-2 text-stone-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleConfirmSave} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-stone-300">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Photo preview & upload button */}
            <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5 rounded-2xl bg-stone-950 border border-stone-800">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-black shrink-0 border border-amber-500/40">
                <img src={image} alt="Produto" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center sm:text-left space-y-2">
                <p className="font-bold text-white text-xs">Foto do Produto</p>
                <p className="text-[11px] text-stone-400">
                  Envie uma foto real da sua padaria ou cole o link de uma imagem
                </p>
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-colors"
                >
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  <span>Fazer Upload da Foto</span>
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-white mb-1">
                Nome do Produto *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Ex: Pão de Queijo Recheado"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white font-bold text-xs focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Price & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  Preço em R$ *
                </label>
                <div className="flex items-center rounded-xl bg-stone-950 border border-stone-700 px-3 py-2.5 focus-within:border-amber-500">
                  <span className="text-amber-400 font-bold mr-1">R$</span>
                  <input
                    type="text"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-transparent text-white font-bold text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  Categoria
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:border-amber-500 focus:outline-none"
                >
                  {categories
                    .filter((c) => c.id !== 'todos')
                    .map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-white mb-1">
                Descrição do Item
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Quentinho, crocante por fora e macio por dentro..."
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Badge & Popular Toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-1">
              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  Selo Especial (Opcional)
                </label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="Ex: Mais Pedido, Artesanal, Quentinho"
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-4">
                <input
                  type="checkbox"
                  id="toggle-is-popular"
                  checked={isPopular}
                  onChange={(e) => setIsPopular(e.target.checked)}
                  className="w-4 h-4 rounded border-stone-700 bg-stone-900 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="toggle-is-popular" className="font-bold text-white text-xs cursor-pointer">
                  Marcar como Destaque ★
                </label>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
              {!isNew && onDelete ? (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Deseja realmente remover o produto "${product?.name}"?`)) {
                      onDelete(product.id);
                      onClose();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors text-xs font-semibold"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Excluir Produto</span>
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-stone-400 hover:text-white text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-lg shadow-amber-500/30 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{isNew ? 'Criar Produto' : 'Salvar Alterações'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Nested Photo Upload Modal */}
      <PhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        title={`Foto de: ${name || 'Produto'}`}
        currentImage={image}
        onConfirm={(newUrl) => setImage(newUrl)}
      />
    </>
  );
};
