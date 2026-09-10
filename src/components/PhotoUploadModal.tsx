import React, { useState, useRef } from 'react';
import { Upload, Link2, X, Check, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { processImageFile } from '../utils/imageUpload';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  currentImage?: string;
  onConfirm: (newImageUrl: string) => void;
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  title,
  currentImage,
  onConfirm
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage || '');
  const [urlInput, setUrlInput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (file: File | undefined) => {
    if (!file) return;
    setErrorMessage('');
    setIsProcessing(true);

    try {
      const dataUrl = await processImageFile(file, 1200, 0.85);
      setPreviewUrl(dataUrl);
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro ao carregar e processar a foto.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    setPreviewUrl(urlInput.trim());
  };

  const handleSave = () => {
    if (!previewUrl) {
      setErrorMessage('Por favor, selecione ou envie uma foto.');
      return;
    }
    onConfirm(previewUrl);
    onClose();
  };

  return (
    <div
      id="photo-upload-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="photo-upload-modal-box"
        className="relative w-full max-w-lg bg-stone-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-base sm:text-lg">
                {title || 'Alterar Foto'}
              </h3>
              <p className="text-xs text-stone-400">
                Faça upload de uma foto do celular/computador ou insira uma URL
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-stone-800 bg-stone-950/40 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'upload'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload do Dispositivo (Foto/Câmera)</span>
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`flex-1 py-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'url'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Inserir Link da Web</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {activeTab === 'upload' ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
                isDragging
                  ? 'border-amber-400 bg-amber-500/10'
                  : 'border-stone-700 hover:border-amber-500/50 bg-stone-950/50 hover:bg-stone-950/80'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0])}
              />

              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Upload className="w-6 h-6" />
              </div>

              <div>
                <p className="font-bold text-white text-sm">
                  {isProcessing ? 'Processando imagem...' : 'Clique para selecionar ou tire uma foto'}
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  Arraste e solte o arquivo aqui (JPG, PNG, WEBP)
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-stone-800 text-[11px] text-stone-300 font-medium">
                Otimização automática ativada
              </span>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-white">
                URL Direta da Imagem
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://exemplo.com/minha-foto.jpg"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 font-bold text-xs transition-colors"
                >
                  Carregar
                </button>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Live Preview */}
          {previewUrl && (
            <div className="space-y-2 pt-2 border-t border-stone-800">
              <p className="text-xs font-bold text-stone-400">Prévia da Foto:</p>
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/40 max-h-56 bg-black flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt="Prévia"
                  className="w-full h-full max-h-56 object-contain"
                />
                <div className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-stone-950/80 text-[10px] text-amber-300 font-bold border border-amber-500/30">
                  Pronta para aplicar
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-stone-950 border-t border-stone-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-400 hover:text-white text-xs transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!previewUrl || isProcessing}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-bold text-xs shadow-lg shadow-amber-500/30 active:scale-95 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Confirmar e Usar Esta Foto</span>
          </button>
        </div>
      </div>
    </div>
  );
};
