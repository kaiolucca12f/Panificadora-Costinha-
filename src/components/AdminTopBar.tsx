import React from 'react';
import { 
  ShieldCheck, 
  Edit3, 
  Plus, 
  Image as ImageIcon, 
  Save, 
  RotateCcw, 
  LogOut,
  Sparkles
} from 'lucide-react';

interface AdminTopBarProps {
  onOpenTextEditor: () => void;
  onOpenNewProduct: () => void;
  onOpenHeroPhoto: () => void;
  onSaveAll: () => void;
  onResetDefault: () => void;
  onLogout: () => void;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({
  onOpenTextEditor,
  onOpenNewProduct,
  onOpenHeroPhoto,
  onSaveAll,
  onResetDefault,
  onLogout
}) => {
  return (
    <div
      id="admin-active-top-bar"
      className="sticky top-0 z-50 bg-stone-950/95 border-b-2 border-amber-500 shadow-2xl backdrop-blur-md px-3 sm:px-6 py-2.5 transition-all text-xs"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
          </span>

          <div className="flex items-center gap-1.5 font-bold text-amber-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden sm:inline uppercase tracking-wider">Modo Administrador Ativo</span>
            <span className="sm:hidden">Admin Ativo</span>
          </div>

          <span className="hidden md:inline text-[11px] text-stone-400 pl-1">
            • Clique nas fotos ou botões de edição para personalizar em tempo real
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          
          {/* Button: Personalizar Textos */}
          <button
            id="btn-admin-edit-texts"
            onClick={onOpenTextEditor}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-100 border border-stone-700 font-semibold transition-colors active:scale-95"
            title="Editar títulos, slogans, contatos, endereço e horários"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-400" />
            <span>Editar Textos</span>
          </button>

          {/* Button: Trocar Fundo do Topo */}
          <button
            id="btn-admin-hero-bg"
            onClick={onOpenHeroPhoto}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-100 border border-stone-700 font-semibold transition-colors active:scale-95"
            title="Trocar a foto de capa do topo do site"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Foto de Fundo</span>
          </button>

          {/* Button: Novo Produto */}
          <button
            id="btn-admin-add-product"
            onClick={onOpenNewProduct}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-500/20 transition-colors active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Produto</span>
          </button>

          {/* Button: Salvar Alterações */}
          <button
            id="btn-admin-save-all"
            onClick={onSaveAll}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-900/40 transition-colors active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Salvar</span>
          </button>

          {/* Button: Restaurar Padrão */}
          <button
            id="btn-admin-reset-default"
            onClick={onResetDefault}
            className="hidden xl:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-900 transition-colors text-[11px]"
            title="Restaurar o modelo padrão original"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Restaurar</span>
          </button>

          {/* Button: Sair */}
          <button
            id="btn-admin-exit-mode"
            onClick={onLogout}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-rose-300 border border-rose-900/50 hover:border-rose-700 transition-colors active:scale-95 text-[11px] font-semibold"
            title="Bloquear e voltar ao modo visitante normal"
          >
            <LogOut className="w-3 h-3" />
            <span>Sair</span>
          </button>
        </div>

      </div>
    </div>
  );
};
