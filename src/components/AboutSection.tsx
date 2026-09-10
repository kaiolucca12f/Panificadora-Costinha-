import React from 'react';
import { RestaurantConfig } from '../types';
import { Award, Clock, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  config: RestaurantConfig;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ config }) => {
  return (
    <section
      id="sobre"
      className="py-20 sm:py-28 bg-stone-900/60 relative overflow-hidden border-t border-stone-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Composition / Story Images (5 Cols on LG) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-black/80 aspect-[4/5] bg-stone-950">
                <img
                  src={config.storyImages[0] || config.heroImages[1]}
                  alt={`História e processo artesanal da ${config.name}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              </div>

              {/* Floating Founding Year Pill */}
              <div 
                id="about-year-badge"
                className="absolute -bottom-6 -left-4 sm:-left-6 p-5 sm:p-6 rounded-3xl bg-stone-950/95 border border-amber-500/40 shadow-2xl backdrop-blur-md max-w-xs"
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-400 block leading-none">
                      {config.foundingYear}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                      Ano de Fundação
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-300">
                  Mais de 30 anos levando o carinho do pão quentinho para Santana.
                </p>
              </div>

              {/* Decorative Secondary Image Floating (top right) */}
              <div className="hidden sm:block absolute -top-8 -right-6 w-44 h-44 rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-2xl bg-stone-900 rotate-3">
                <img
                  src={config.storyImages[1] || config.heroImages[2]}
                  alt="Detalhe artesanal"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Text Content (7 Cols on LG) */}
          <div className="lg:col-span-7 space-y-6 pt-6 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nossa Trajetória & Princípios</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              {config.storyTitle}
            </h2>

            <div className="space-y-4 text-stone-300 text-sm sm:text-base leading-relaxed">
              {config.storyText.map((paragraph, idx) => (
                <p key={idx} className="text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quality Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {config.storyHighlights.map((hl, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800/90 hover:border-amber-500/30 transition-colors"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <h3 className="font-serif font-bold text-sm text-stone-100">
                      {hl.title}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-400 pl-6 leading-normal">
                    {hl.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
