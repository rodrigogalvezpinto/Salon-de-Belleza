import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';
import { Sparkles, X, ChevronRight, MessageSquare, Scissors, Eye } from 'lucide-react';

interface GalleryProps {
  onSelectServiceType: (serviceName: string) => void;
}

export default function Gallery({ onSelectServiceType }: GalleryProps) {
  const [filter, setFilter] = useState<'all' | 'color' | 'corte' | 'peinado'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = filter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === filter);

  const handleBookSimilar = (item: GalleryItem) => {
    setSelectedItem(null);
    let targetKeyword = '';
    if (item.category === 'color') targetKeyword = 'Balayage Premium';
    else if (item.category === 'corte') targetKeyword = 'Corte de Diseño';
    else targetKeyword = 'Peinado de Novia';

    onSelectServiceType(targetKeyword);
  };

  return (
    <section className="bg-[#F1EFE9] py-24 border-t border-[#D1CEC7]" id="galeria-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C5A059] mb-3">Estilos de Salón</p>
          <h2 className="font-serif font-light text-4xl sm:text-5xl text-[#1A1A1A] tracking-tight mb-4">
            Galería de Cambios & Trabajos Realizados
          </h2>
          <div className="w-24 h-[1px] bg-[#C5A059] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-[#1A1A1A]/75 text-sm sm:text-base leading-relaxed font-light">
            Fotografías directas de clientas reales en el salón de Claudia Andrea. Logramos transiciones de color orgánicas, lisos radiantes y peinados esculturales.
          </p>
        </div>

        {/* Gallery Filter Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" id="gallery-filters">
          {[
            { id: 'all', label: 'Ver Todo' },
            { id: 'color', label: 'Coloraciones Rubios / Balayage' },
            { id: 'corte', label: 'Cortes & Visajismo' },
            { id: 'peinado', label: 'Peinados de Gala' }
          ].map((tag) => (
            <button
              key={tag.id}
              onClick={() => setFilter(tag.id as any)}
              id={`filter-gallery-${tag.id}`}
              className={`text-xs px-4 py-2.5 rounded-none font-semibold uppercase tracking-widest transition-all duration-300 border ${
                filter === tag.id
                  ? 'bg-[#1A1A1A] border-[#1A1A1A] text-[#F9F7F2]'
                  : 'bg-transparent text-[#1A1A1A]/70 hover:text-[#1A1A1A] border-[#D1CEC7]'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              id={`gallery-item-${item.id}`}
              className="bg-[#F9F7F2] rounded-none border border-[#D1CEC7] overflow-hidden cursor-pointer group relative hover:border-[#C5A059] transition-all duration-300"
            >
              {/* Aspect Ratio 4:3 */}
              <div className="aspect-[4/3] overflow-hidden relative bg-[#E5E2DB]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 to-transparent"></div>
                
                {/* Expand / View Info Badge */}
                <div className="absolute top-4 right-4 bg-[#1A1A1A]/85 p-2 rounded-none border border-[#D1CEC7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#C5A059]">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Text specifications */}
              <div className="p-5 bg-[#F9F7F2]">
                <span className="text-[10px] font-semibold tracking-widest text-[#C5A059] uppercase">
                  {item.category === 'color' ? 'Color & Luz' : item.category === 'corte' ? 'Corte & Forma' : 'Peinados'}
                </span>
                <h3 className="font-serif text-lg italic text-[#1A1A1A] font-semibold mt-1 group-hover:text-[#C5A059] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#1A1A1A]/70 text-xs mt-2 line-clamp-2 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/90 backdrop-blur-sm animate-fadeIn" 
            id="gallery-modal"
            onClick={() => setSelectedItem(null)}
          >
            <div 
              className="bg-[#F9F7F2] border border-[#D1CEC7] max-w-4xl w-full rounded-none overflow-hidden shadow-2xl relative flex flex-col md:flex-row transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 bg-[#1A1A1A]/80 hover:bg-[#C5A059] text-white p-2 rounded-none border border-[#D1CEC7]"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Column: Big Image */}
              <div className="md:w-1/2 bg-[#E5E2DB] flex items-center">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="w-full h-auto object-cover max-h-[80vh]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Right Column: Stylist Notes & Book CTA */}
              <div className="md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 border border-[#C5A059] px-3 py-1 text-[#C5A059] text-[9px] uppercase tracking-widest font-semibold w-fit mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{selectedItem.category}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-serif italic text-[#1A1A1A] font-semibold mb-2">{selectedItem.title}</h3>
                  <div className="w-16 h-[1px] bg-[#C5A059] mb-4"></div>
                  
                  <h4 className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#C5A059] mb-2">Comentarios de Claudia:</h4>
                  <p className="text-[#1A1A1A]/80 text-sm leading-relaxed mb-6 font-light">
                    {selectedItem.description} Realizamos este look cuidando plenamente la salud de la fibra capilar, aplicando tratamientos orgánicos para un brillo óptimo y reflejos estables.
                  </p>

                  <div className="bg-[#F1EFE9] p-4 rounded-none border border-[#D1CEC7] mb-6">
                    <p className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/60 font-semibold">Técnicas Claves:</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="bg-white border border-[#D1CEC7] text-[9px] uppercase font-semibold px-2 py-1 text-[#1A1A1A]">Plex Protector</span>
                      <span className="bg-white border border-[#D1CEC7] text-[9px] uppercase font-semibold px-2 py-1 text-[#1A1A1A]">Micro-difuminado</span>
                      <span className="bg-white border border-[#D1CEC7] text-[9px] uppercase font-semibold px-2 py-1 text-[#1A1A1A]">Sellado Térmico</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleBookSimilar(selectedItem)}
                  className="w-full bg-[#1A1A1A] hover:bg-[#C5A059] text-white font-bold py-3.5 px-4 rounded-none text-xs uppercase tracking-widest transition-all cursor-pointer"
                >
                  <Scissors className="w-4 h-4" />
                  <span>Agendar Look Similar</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
