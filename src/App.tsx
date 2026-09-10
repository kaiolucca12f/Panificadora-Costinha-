import React, { useState, useEffect } from 'react';
import { 
  panificadoraCostinhaConfig, 
  maisonGrillConfig 
} from './config/restaurantConfig';
import { RestaurantConfig, MenuItem, CartItem, StorePhoto } from './types';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { LocationHoursSection } from './components/LocationHoursSection';
import { InstagramSection } from './components/InstagramSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ConfigGuideModal } from './components/ConfigGuideModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { AdminTopBar } from './components/AdminTopBar';
import { PhotoUploadModal } from './components/PhotoUploadModal';
import { SiteTextEditorModal } from './components/SiteTextEditorModal';
import { ProductEditModal } from './components/ProductEditModal';
import { StorePhotoEditModal } from './components/StorePhotoEditModal';
import { MessageCircle, ShoppingBag, Check } from 'lucide-react';

export default function App() {
  // Load custom site configuration from localStorage if available
  const [config, setConfig] = useState<RestaurantConfig>(() => {
    try {
      const saved = localStorage.getItem('custom_site_config');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return panificadoraCostinhaConfig;
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isConfigGuideOpen, setIsConfigGuideOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Admin Mode & Personalization States
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_authenticated_session') === 'true';
  });

  // Modal open states
  const [isSiteTextEditorOpen, setIsSiteTextEditorOpen] = useState<boolean>(false);
  const [isProductEditOpen, setIsProductEditOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<MenuItem | null>(null);
  const [isStorePhotoEditOpen, setIsStorePhotoEditOpen] = useState<boolean>(false);
  const [editingStorePhoto, setEditingStorePhoto] = useState<StorePhoto | null>(null);
  const [isHeroPhotoModalOpen, setIsHeroPhotoModalOpen] = useState<boolean>(false);

  // Generic single photo upload target (for quick direct clicks on any product card)
  const [directPhotoTarget, setDirectPhotoTarget] = useState<{
    title: string;
    currentImage: string;
    onConfirm: (url: string) => void;
  } | null>(null);

  // Save and persist config changes
  const saveAndApplyConfig = (updated: RestaurantConfig) => {
    setConfig(updated);
    try {
      localStorage.setItem('custom_site_config', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save to localStorage', err);
    }
    showToast('Personalização salva com sucesso!');
  };

  // Reset to original defaults
  const handleResetDefault = () => {
    if (confirm('Deseja restaurar as fotos e escritas originais da Panificadora Costinha?')) {
      localStorage.removeItem('custom_site_config');
      setConfig(panificadoraCostinhaConfig);
      showToast('Configurações originais restauradas!');
    }
  };

  // Logout from admin mode
  const handleLogoutAdmin = () => {
    setIsAdminMode(false);
    sessionStorage.removeItem('admin_authenticated_session');
    showToast('Modo de edição encerrado. Visualizando como visitante.');
  };

  // Load saved cart from localStorage on first render
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`cart_${config.id}`);
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, [config.id]);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`cart_${config.id}`, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart, config.id]);

  // Track active section for mobile & desktop navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'cardapio', 'localizacao', 'instagram', 'contato'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Add to cart from ProductModal
  const handleAddToCart = (product: MenuItem, quantity: number, notes?: string) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        if (notes) {
          updated[existingIdx].notes = notes;
        }
        return updated;
      } else {
        return [...prev, { product, quantity, notes }];
      }
    });
    showToast(`${quantity}x ${product.name} adicionado à sacola!`);
  };

  // Quick 1-click add from card
  const handleQuickAddToCart = (product: MenuItem) => {
    handleAddToCart(product, 1);
  };

  // Update quantity in cart
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  // Remove single item
  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Clear all items
  const handleClearCart = () => {
    setCart([]);
  };

  // Switch between presets
  const handleSwitchConfig = (configId: 'costinha' | 'maison-grill') => {
    if (configId === 'costinha') {
      saveAndApplyConfig(panificadoraCostinhaConfig);
      document.title = 'Panificadora Costinha | Padaria & Confeitaria Artesanal';
    } else {
      saveAndApplyConfig(maisonGrillConfig);
      document.title = 'Maison Grill Steakhouse | Carnes Nobres na Brasa';
    }
    showToast(`Modelo alterado para: ${configId === 'costinha' ? 'Panificadora Costinha' : 'Maison Grill'}!`);
  };

  // Product actions
  const handleSaveProduct = (updatedProduct: MenuItem) => {
    const exists = config.products.some((p) => p.id === updatedProduct.id);
    let newProducts: MenuItem[];
    if (exists) {
      newProducts = config.products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );
    } else {
      newProducts = [updatedProduct, ...config.products];
    }
    saveAndApplyConfig({
      ...config,
      products: newProducts
    });
    // If updating currently viewed product modal
    if (selectedProduct && selectedProduct.id === updatedProduct.id) {
      setSelectedProduct(updatedProduct);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    const newProducts = config.products.filter((p) => p.id !== productId);
    saveAndApplyConfig({
      ...config,
      products: newProducts
    });
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(null);
    }
    showToast('Produto removido com sucesso!');
  };

  // Store photo actions
  const handleSaveStorePhoto = (updatedPhoto: StorePhoto) => {
    const existingList = config.storePhotos || [];
    const exists = existingList.some((p) => p.id === updatedPhoto.id);
    let newPhotos: StorePhoto[];
    if (exists) {
      newPhotos = existingList.map((p) =>
        p.id === updatedPhoto.id ? updatedPhoto : p
      );
    } else {
      newPhotos = [...existingList, updatedPhoto];
    }
    saveAndApplyConfig({
      ...config,
      storePhotos: newPhotos
    });
  };

  const handleDeleteStorePhoto = (photoId: string) => {
    const existingList = config.storePhotos || [];
    const newPhotos = existingList.filter((p) => p.id !== photoId);
    saveAndApplyConfig({
      ...config,
      storePhotos: newPhotos
    });
    showToast('Foto removida!');
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950">
      
      {/* Sticky Admin Top Bar when administrator is active */}
      {isAdminMode && (
        <AdminTopBar
          onOpenTextEditor={() => setIsSiteTextEditorOpen(true)}
          onOpenNewProduct={() => {
            setEditingProduct(null);
            setIsProductEditOpen(true);
          }}
          onOpenHeroPhoto={() => setIsHeroPhotoModalOpen(true)}
          onSaveAll={() => {
            saveAndApplyConfig(config);
          }}
          onResetDefault={handleResetDefault}
          onLogout={handleLogoutAdmin}
        />
      )}

      {/* Top Main Navigation */}
      <Navbar
        config={config}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenConfigGuide={() => setIsConfigGuideOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          config={config}
          isAdminMode={isAdminMode}
          onEditHeroBg={() => setIsHeroPhotoModalOpen(true)}
          onEditTexts={() => setIsSiteTextEditorOpen(true)}
          onOpenMenu={() => {
            const menuEl = document.getElementById('cardapio');
            menuEl?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Interactive Digital Menu with In-Card Admin Editing */}
        <MenuSection
          config={config}
          isAdminMode={isAdminMode}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onQuickAddToCart={handleQuickAddToCart}
          onEditProduct={(product) => {
            setEditingProduct(product);
            setIsProductEditOpen(true);
          }}
          onAddProduct={() => {
            setEditingProduct(null);
            setIsProductEditOpen(true);
          }}
          onChangeProductPhoto={(product) => {
            setDirectPhotoTarget({
              title: `Foto de: ${product.name}`,
              currentImage: product.image,
              onConfirm: (newUrl) => {
                handleSaveProduct({ ...product, image: newUrl });
                setDirectPhotoTarget(null);
              }
            });
          }}
        />

        {/* 3. Location & Working Hours with Real Photos */}
        <LocationHoursSection 
          config={config}
          isAdminMode={isAdminMode}
          onEditPhoto={(photo) => {
            setEditingStorePhoto(photo);
            setIsStorePhotoEditOpen(true);
          }}
          onAddPhoto={() => {
            setEditingStorePhoto(null);
            setIsStorePhotoEditOpen(true);
          }}
          onEditTexts={() => setIsSiteTextEditorOpen(true)}
        />

        {/* 4. Instagram Showcase */}
        <InstagramSection config={config} />

        {/* 5. Contact Section */}
        <ContactSection config={config} />
      </main>

      {/* Footer */}
      <Footer
        config={config}
        onOpenConfigGuide={() => setIsConfigGuideOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Action Button: Quick WhatsApp Order (Desktop & Mobile) */}
      <a
        id="floating-whatsapp-btn"
        href={`https://wa.me/${config.whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20na%20${encodeURIComponent(config.name)}.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fazer pedido direto no WhatsApp"
        className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 p-3.5 sm:p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold shadow-2xl shadow-emerald-950/80 hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-2 border-emerald-300"
      >
        <MessageCircle className="w-6 h-6 fill-current text-stone-950" />
      </a>

      {/* Floating Bag Indicator on Mobile if items exist */}
      {totalCartCount > 0 && (
        <button
          id="floating-cart-pill"
          onClick={() => setIsCartOpen(true)}
          className="lg:hidden fixed bottom-20 left-4 z-40 px-4 py-2.5 rounded-full bg-amber-500 text-stone-950 font-bold text-xs shadow-2xl flex items-center gap-2 border border-amber-300 animate-in fade-in"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Ver Sacola ({totalCartCount})</span>
        </button>
      )}

      {/* Mobile Bottom Tab Bar */}
      <MobileNav
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        config={config}
        isAdminMode={isAdminMode}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onEditThisProduct={(prod) => {
          setEditingProduct(prod);
          setIsProductEditOpen(true);
        }}
        onUploadThisPhoto={(prod) => {
          setDirectPhotoTarget({
            title: `Foto de: ${prod.name}`,
            currentImage: prod.image,
            onConfirm: (newUrl) => {
              handleSaveProduct({ ...prod, image: newUrl });
              setDirectPhotoTarget(null);
            }
          });
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        config={config}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Commercial Customization & Deploy Guide Modal */}
      <ConfigGuideModal
        isOpen={isConfigGuideOpen}
        onClose={() => setIsConfigGuideOpen(false)}
        currentConfigId={config.id}
        onSwitchConfig={handleSwitchConfig}
      />

      {/* Admin Panel Modal with Encrypted Password Authentication */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onEnterVisualAdminMode={() => {
          setIsAdminMode(true);
          sessionStorage.setItem('admin_authenticated_session', 'true');
          showToast('Modo de personalização ativado! Use a barra do topo ou os botões nas fotos.');
        }}
        onOpenTextEditor={() => setIsSiteTextEditorOpen(true)}
        onOpenHeroPhoto={() => setIsHeroPhotoModalOpen(true)}
        onOpenNewProduct={() => {
          setEditingProduct(null);
          setIsProductEditOpen(true);
        }}
        onEditProduct={(prod) => {
          setEditingProduct(prod);
          setIsProductEditOpen(true);
        }}
        onUpdateConfig={(updated) => {
          saveAndApplyConfig(updated);
        }}
      />

      {/* Site Text & Slogans & Contacts Editor Modal */}
      <SiteTextEditorModal
        isOpen={isSiteTextEditorOpen}
        onClose={() => setIsSiteTextEditorOpen(false)}
        config={config}
        onSave={(updated) => {
          saveAndApplyConfig(updated);
        }}
      />

      {/* Product Edit / Creator Modal */}
      <ProductEditModal
        isOpen={isProductEditOpen}
        onClose={() => {
          setIsProductEditOpen(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        categories={config.categories}
        onSave={handleSaveProduct}
        onDelete={handleDeleteProduct}
      />

      {/* Store Photo Edit Modal */}
      <StorePhotoEditModal
        isOpen={isStorePhotoEditOpen}
        onClose={() => {
          setIsStorePhotoEditOpen(false);
          setEditingStorePhoto(null);
        }}
        photo={editingStorePhoto}
        onSave={handleSaveStorePhoto}
        onDelete={handleDeleteStorePhoto}
      />

      {/* Hero Background Photo Upload Modal */}
      <PhotoUploadModal
        isOpen={isHeroPhotoModalOpen}
        onClose={() => setIsHeroPhotoModalOpen(false)}
        title="Foto de Capa do Topo (Hero)"
        currentImage={config.heroImages[0]}
        onConfirm={(newUrl) => {
          saveAndApplyConfig({
            ...config,
            heroImages: [newUrl, ...config.heroImages.slice(1)]
          });
          setIsHeroPhotoModalOpen(false);
        }}
      />

      {/* Direct Quick Photo Upload for Single Item */}
      {directPhotoTarget && (
        <PhotoUploadModal
          isOpen={!!directPhotoTarget}
          onClose={() => setDirectPhotoTarget(null)}
          title={directPhotoTarget.title}
          currentImage={directPhotoTarget.currentImage}
          onConfirm={directPhotoTarget.onConfirm}
        />
      )}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div
          id="global-toast-notification"
          role="status"
          aria-live="polite"
          className="fixed top-20 right-4 sm:right-6 z-50 px-4 py-3 rounded-2xl bg-stone-900/95 border border-amber-500/40 text-stone-100 text-xs sm:text-sm font-semibold shadow-2xl backdrop-blur-md flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-200"
        >
          <div className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}

