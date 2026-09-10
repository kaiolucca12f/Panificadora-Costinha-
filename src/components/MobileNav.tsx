import React from 'react';
import { Home, UtensilsCrossed, ShoppingBag, MapPin, PhoneCall } from 'lucide-react';

interface MobileNavProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  cartCount,
  onOpenCart,
  activeSection
}) => {
  const items = [
    { id: 'inicio', label: 'Início', icon: Home, href: '#inicio' },
    { id: 'cardapio', label: 'Cardápio', icon: UtensilsCrossed, href: '#cardapio' },
    { 
      id: 'sacola', 
      label: 'Sacola', 
      icon: ShoppingBag, 
      action: onOpenCart, 
      badge: cartCount > 0 ? cartCount : undefined 
    },
    { id: 'localizacao', label: 'Loja', icon: MapPin, href: '#localizacao' },
    { id: 'contato', label: 'Contato', icon: PhoneCall, href: '#contato' }
  ];

  return (
    <nav
      id="mobile-bottom-bar"
      aria-label="Menu inferior móvel"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-lg border-t border-stone-800/80 px-2 py-1.5 pb-safe shadow-2xl"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          if (item.action) {
            return (
              <button
                key={item.id}
                id={`bottom-nav-${item.id}`}
                onClick={item.action}
                className="relative flex flex-col items-center justify-center py-1 px-3 text-stone-400 hover:text-amber-400 transition-colors focus:outline-none"
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge !== undefined && (
                    <span 
                      id="bottom-nav-cart-badge"
                      className="absolute -top-1 -right-2 bg-amber-500 text-stone-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse"
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium mt-1">{item.label}</span>
              </button>
            );
          }

          return (
            <a
              key={item.id}
              id={`bottom-nav-${item.id}`}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 transition-colors focus:outline-none ${
                isActive ? 'text-amber-400' : 'text-stone-400 hover:text-amber-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className={`text-[10px] font-medium mt-1 ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};
