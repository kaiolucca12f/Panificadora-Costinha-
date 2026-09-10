import React, { useState } from 'react';
import { StorePhoto } from '../types';
import { X, Save, Trash2, Camera, AlertCircle } from 'lucide-react';
import { PhotoUploadModal } from './PhotoUploadModal';

interface StorePhotoEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  photo: StorePhoto | null; // null means adding a new photo
  onSave: (photo: StorePhoto) => void;
  onDelete?: (photoId: string) => void;
}

export const StorePhotoEditModal: React.FC<StorePhotoEditModalProps> = ({
  isOpen,
  onClose,
  photo,
  onSave,
  onDelete
}) => {
  const isNew = !photo;
  const [src, setSrc] = useState(photo?.src || '/fachada-costinha.jpg');
  const [title, setTitle] = useState(photo?.title || '');
  const [subtitle, setSubtitle] = useState(photo?.subtitle || '');
  const [badge, setBadge] = useState(photo?.badge || 'Foto do Estabelecimento');
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('O título da foto é obrigatório.');
      return;
    }
    if (!src) {
      setErrorMsg('Envie ou selecione uma foto.');
      return;
    }

    const updated: StorePhoto = {
      id: photo?.id || `photo_${Date.now()}`,
      src,
      title: title.trim(),
      subtitle: subtitle.trim(),
      badge: badge.trim() || 'Foto Real'
    };

    onSave(updated);
    onClose();
  };

  return (
    <>
      <div
        id="store-photo-edit-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      >
        <div
          id="store-photo-edit-box"
          className="relative w-full max-w-lg bg-stone-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-white text-base sm:text-lg">
                {isNew ? 'Adicionar Foto da Loja' : 'Editar Foto do Estabelecimento'}
              </h3>
              <p className="text-xs text-stone-400">
                Altere a imagem, legenda e descrição exibidas na seção de localização
              </p>
            </div>
            <button onClick={onClose} className="p-2 text-stone-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs text-stone-300">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Photo preview & upload */}
            <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5 rounded-2xl bg-stone-950 border border-stone-800">
              <div className="relative w-32 h-24 rounded-xl overflow-hidden bg-black shrink-0 border border-amber-500/40">
                <img src={src} alt="Prévia" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center sm:text-left space-y-2">
                <p className="font-bold text-white text-xs">Imagem da Fachada ou Interior</p>
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-colors"
                >
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  <span>Fazer Upload da Foto Real</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1">
                Título da Foto *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Fachada Oficial da Panificadora Costinha"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white font-bold text-xs focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1">
                Subtítulo / Descrição da Foto
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ex: Praça da Bandeira, 90 - Centro, Santana - BA"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1">
                Etiqueta / Selo (Badge)
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="Ex: Fachada & Entrada Principal"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
              {!isNew && onDelete ? (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Remover esta foto?`)) {
                      onDelete(photo.id);
                      onClose();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-rose-400 hover:text-rose-300 text-xs font-semibold"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Excluir Foto</span>
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
                  <span>Salvar Foto</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <PhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        title="Foto do Estabelecimento"
        currentImage={src}
        onConfirm={(newUrl) => setSrc(newUrl)}
      />
    </>
  );
};
