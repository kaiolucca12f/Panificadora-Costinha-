import React from 'react';
import { RestaurantConfig } from '../types';
import { Instagram, Heart, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';

interface InstagramSectionProps {
  config: RestaurantConfig;
}

export const InstagramSection: React.FC<InstagramSectionProps> = ({ config }) => {
  return (
    <section
      id="instagram"
      className="py-20 sm:py-28 bg-stone-900/40 relative overflow-hidden border-t border-stone-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Instagram className="w-3.5 h-3.5" />
            <span>Siga Nossa Rotina</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-3">
            {config.instagramHandle}
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mb-6">
            Acompanhe nossas fornadas em tempo real, novidades do dia e bastidores da nossa cozinha artesanal.
          </p>

          <a
            id="btn-follow-instagram"
            href={config.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-amber-600 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-purple-950/40 active:scale-95 transition-all"
          >
            <Instagram className="w-4 h-4" />
            <span>SEGUIR NO INSTAGRAM</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* Visual Instagram Feed Showcase */}
        <div 
          id="instagram-feed-grid"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          {config.instagramPhotos.map((photo, index) => (
            <a
              key={index}
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 shadow-md block"
            >
              <img
                src={photo.image}
                alt={photo.caption || `Post no Instagram da ${config.name}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              
              {/* Hover Overlay with Likes & Comments */}
              <div className="absolute inset-0 bg-stone-950/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2 text-center">
                <Instagram className="w-6 h-6 text-pink-400 mb-2" />
                <div className="flex items-center gap-3 text-xs text-stone-200 font-semibold mb-1">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                    {photo.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-stone-300" />
                    {photo.comments}
                  </span>
                </div>
                {photo.caption && (
                  <p className="text-[10px] text-stone-300 line-clamp-2 px-1">
                    {photo.caption}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
