import React, { useState } from 'react';
import { SERVICES } from '../data';
import { Service } from '../types';
import { Calendar, Clock, Check, Scissors, Brush, Sparkles } from 'lucide-react';

interface ServicesListProps {
  onSelectItem: (type: 'service' | 'course', id: string) => void;
}

export default function ServicesList({ onSelectItem }: ServicesListProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'color' | 'corte' | 'tratamiento'>('all');

  const filteredServices = activeTab === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeTab);

  // Helper to format currency in CLP style
  const formatCLP = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <section className="bg-[#F1EFE9] py-24 border-t border-[#D1CEC7]" id="servicios-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C5A059] mb-3">La Colección de Autor</p>
          <h2 className="font-serif font-light text-4xl sm:text-5xl text-[#1A1A1A] tracking-tight mb-4">
            Especialidades & Servicios Capilares
          </h2>
          <div className="w-24 h-[1px] bg-[#C5A059] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-[#1A1A1A]/75 text-sm sm:text-base leading-relaxed">
            Cada cabello tiene sus propios requerimientos. Diseñamos planes personalizados utilizando productos profesionales e innovando con las últimas técnicas de salud vegetal.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" id="service-filters">
          {[
            { id: 'all', label: 'Todos los Servicios' },
            { id: 'color', label: 'Coloración & Balayage' },
            { id: 'corte', label: 'Visajismo & Cortes' },
            { id: 'tratamiento', label: 'Nutrición & Alisados' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              id={`tab-service-${tab.id}`}
              className={`px-5 py-2.5 rounded-none text-xs uppercase tracking-widest font-semibold transition-all duration-300 border ${
                activeTab === tab.id
                  ? 'bg-[#1A1A1A] border-[#1A1A1A] text-[#F9F7F2]'
                  : 'bg-transparent text-[#1A1A1A]/70 hover:text-[#1A1A1A] border-[#D1CEC7]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" id="services-grid">
          {filteredServices.map((service) => (
            <div 
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-[#F9F7F2] rounded-none border border-[#D1CEC7] p-6 flex flex-col justify-between hover:border-[#C5A059] transition-all duration-300 group"
            >
              <div>
                {/* Header info */}
                <div className="flex justify-between items-center gap-4 mb-4">
                  <span className="px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 rounded-none">
                    {service.category === 'color' ? 'Color / Luz' : service.category === 'corte' ? 'Corte / Visajismo' : 'Tratamientos'}
                  </span>
                  
                  <div className="flex items-center space-x-1.5 text-[10px] text-[#1A1A1A]/60 font-semibold uppercase tracking-wider font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                {/* Service title & price */}
                <h3 className="font-serif text-xl italic text-[#1A1A1A] mb-2 group-hover:text-[#C5A059] transition-colors font-semibold">
                  {service.name}
                </h3>
                
                <p className="text-xl font-serif font-semibold text-[#C5A059] mt-1 mb-4">
                  {formatCLP(service.price)}
                </p>

                {/* Description */}
                <p className="text-[#1A1A1A]/70 text-sm mb-6 leading-relaxed font-light">
                  {service.description}
                </p>

                {/* Features checklist */}
                <ul className="space-y-2 mb-8 border-t border-[#D1CEC7] pt-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-xs text-[#1A1A1A]/80">
                      <Check className="w-4 h-4 text-[#C5A059] mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Booking trigger button */}
              <button
                onClick={() => onSelectItem('service', service.id)}
                id={`btn-select-service-${service.id}`}
                className="w-full bg-[#1A1A1A] border border-[#1A1A1A] group-hover:bg-[#C5A059] group-hover:border-[#C5A059] text-white py-3.5 px-4 rounded-none text-xs uppercase tracking-widest font-bold transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Reservar Servicio</span>
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-[#F9F7F2] p-6 sm:p-8 rounded-none border border-[#D1CEC7] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="bg-[#C5A059]/10 p-3 text-[#C5A059] max-sm:hidden border border-[#C5A059]/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif italic font-semibold text-[#1A1A1A] text-lg">¿No estás segura de cuál es tu servicio ideal?</p>
              <p className="text-[#1A1A1A]/70 text-sm mt-0.5">Usa nuestro asesor capilar interactivo AI para recibir una recomendación de diagnóstico personalizada.</p>
            </div>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('asistente-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            id="btn-goto-ai-services"
            className="whitespace-nowrap bg-[#1A1A1A] hover:bg-[#C5A059] text-white font-bold px-6 py-3 rounded-none text-xs uppercase tracking-widest transition-all cursor-pointer"
          >
            Consultar Asistente AI
          </button>
        </div>

      </div>
    </section>
  );
}
