import React from 'react';
import {
  Sparkles,
  Croissant,
  Coffee,
  Sandwich,
  Cake,
  UtensilsCrossed,
  IceCream2,
  Flame,
  Utensils,
  Pizza,
  Wine,
  CupSoda,
  Cookie,
  Beef,
  Beer,
  Soup,
  Fish,
  LucideIcon
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Croissant,
  Coffee,
  Sandwich,
  Cake,
  UtensilsCrossed,
  IceCream2,
  Flame,
  Utensils,
  Pizza,
  Wine,
  CupSoda,
  Cookie,
  Beef,
  Beer,
  Soup,
  Fish
};

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, className = 'w-5 h-5' }) => {
  const IconComponent = iconMap[name] || UtensilsCrossed;
  return <IconComponent className={className} />;
};
