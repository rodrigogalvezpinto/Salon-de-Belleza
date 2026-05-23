import React from 'react';
import { Calendar, Phone, ArrowRight, Award, Sparkles, Sliders } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <div className="relative min-h-screen bg-[#F9F7F2] flex items-center justify-center overflow-hidden pt-20" id="hero-section">
      {/* Background Image with elegant light multi-blend overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=1920" 
          alt="Claudia Andrea Peluquería" 
          className="w-full h-full object-cover object-center opacity-10 mix-blend-multiply"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F9F7F2]/60 via-[#F9F7F2]/10 to-[#F9F7F2]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Subtle Welcome Tag */}
        <div className="inline-flex items-center space-x-2 border border-[#C5A059] px-4 py-1.5 text-[#C5A059] text-xs uppercase tracking-[0.25em] font-semibold mb-8">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Alta Peluquería & Academia Capilar</span>
        </div>

        {/* Catchy Headline */}
        <h1 className="font-serif font-light text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#1A1A1A] mb-8 leading-none">
          Destaca el Brillo & la Identidad <br />
          <span className="font-normal italic text-[#C5A059]">
            De Tu Cabello
          </span>
        </h1>

        {/* Elegant subheadline */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-[#1A1A1A]/80 mb-12 leading-relaxed font-sans font-light">
          Soy <strong className="text-[#1A1A1A] font-semibold font-serif italic">Claudia Andrea</strong>, especialista en balayage tridimensional, correcciones de color avanzadas y diseño de corte visajista personalizado. Vive una experiencia premium para realzar tu belleza y aprende en mis cursos exclusivos de academia.
        </p>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button
            onClick={() => onNavigate('agenda')}
            id="hero-btn-agenda"
            className="w-full sm:w-auto bg-[#1A1A1A] hover:bg-[#C5A059] text-white font-bold px-8 py-4 rounded-none transition-all duration-300 shadow-sm flex items-center justify-center space-x-3 text-xs uppercase tracking-widest cursor-pointer"
          >
            <Calendar className="h-4 w-4" />
            <span>Agendar Servicio</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => onNavigate('academia')}
            id="hero-btn-cursos"
            className="w-full sm:w-auto bg-transparent hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white border border-[#1A1A1A] rounded-none font-bold px-8 py-4 transition-all duration-300 flex items-center justify-center space-x-2 text-xs uppercase tracking-widest cursor-pointer"
          >
            <span>Ver Cursos & Talleres</span>
          </button>
        </div>

        {/* Core feature tags / statistics badge counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-[#D1CEC7] pt-12 mt-6" id="hero-stats">
          <div className="p-4 border-b md:border-b-0 md:border-r border-[#D1CEC7] last:border-0 rounded-none bg-transparent">
            <span className="block text-4xl font-serif italic text-[#C5A059] font-light">12+</span>
            <span className="block text-[#1A1A1A]/70 text-[10px] uppercase tracking-[0.15em] font-semibold mt-1">Años de Trayectoria</span>
          </div>
          <div className="p-4 border-b md:border-b-0 md:border-r border-[#D1CEC7] last:border-0 rounded-none bg-transparent">
            <span className="block text-4xl font-serif italic text-[#C5A059] font-light">1.800+</span>
            <span className="block text-[#1A1A1A]/70 text-[10px] uppercase tracking-[0.15em] font-semibold mt-1">Cabellos Felices</span>
          </div>
          <div className="p-4 border-b md:border-b-0 md:border-r border-[#D1CEC7] last:border-0 rounded-none bg-transparent">
            <span className="block text-4xl font-serif italic text-[#C5A059] font-light">220+</span>
            <span className="block text-[#1A1A1A]/70 text-[10px] uppercase tracking-[0.15em] font-semibold mt-1">Alumnas Graduadas</span>
          </div>
          <div className="p-4 border-b md:border-b-0 last:border-0 rounded-none bg-transparent">
            <span className="block text-4xl font-serif italic text-[#C5A059] font-light">100%</span>
            <span className="block text-[#1A1A1A]/70 text-[10px] uppercase tracking-[0.15em] font-semibold mt-1">Webpay Seguro</span>
          </div>
        </div>
      </div>

      {/* Decorative luxury lettering in background */}
      <div className="absolute -bottom-10 -left-10 text-[15rem] font-serif opacity-[0.02] pointer-events-none select-none italic text-[#1A1A1A]">
        Estilo
      </div>
      <div className="absolute -top-10 -right-10 text-[15rem] font-serif opacity-[0.02] pointer-events-none select-none italic text-[#1A1A1A]">
        Arte
      </div>
    </div>
  );
}
