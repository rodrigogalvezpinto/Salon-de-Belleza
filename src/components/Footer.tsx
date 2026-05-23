import React from 'react';
import { MapPin, Phone, Mail, Clock, Scissors, Instagram, Award, BookOpen, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (id: string) => {
    onNavigate(id);
  };

  const handleWhatsAppAlert = () => {
    alert('Redirigiendo a chat comercial integrado de WhatsApp de Claudia Andrea (+56 9 8765 4321)...');
  };

  return (
    <footer className="bg-[#1A1A1A] text-[#F1EFE9]/70 border-t border-[#D1CEC7]/20 pt-16 pb-8 font-sans" id="footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 mb-12 border-b border-[#D1CEC7]/10">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="border border-[#C5A059]/40 p-2 text-[#C5A059] bg-white/5">
                <Scissors className="h-4 w-4 transform -rotate-45" />
              </div>
              <span className="font-serif font-light tracking-[0.15em] text-[#F9F7F2] text-lg uppercase italic">Claudia Andrea</span>
            </div>
            <p className="text-xs text-[#F1EFE9]/85 leading-relaxed font-light">
              Estilista con más de 12 años transformando miradas en Chile. Especialistas en aclarados orgánicos tridimensionales respetando la salud capilar y educación profesional.
            </p>
            <div className="flex items-center space-x-3 pt-2 text-[#F9F7F2]">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="bg-zinc-900 border border-zinc-800 hover:text-[#C5A059] p-2 hover:bg-zinc-850 duration-300"
                title="Siguenos en Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-[#F9F7F2] font-serif italic text-xs uppercase tracking-[0.2em] font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2.5 text-[10px] uppercase tracking-wider font-semibold">
              {[
                { id: 'inicio', label: 'Inicio' },
                { id: 'servicios', label: 'Especialidades & Servicios' },
                { id: 'academia', label: 'Cursos & Academia' },
                { id: 'galeria', label: 'Galería de Looks' },
                { id: 'asistente', label: 'Estilo Virtual AI' },
                { id: 'agenda', label: 'Agendar Hora Directo' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className="hover:text-[#C5A059] duration-300 block text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Schedule */}
          <div>
            <h4 className="text-[#F9F7F2] font-serif italic text-xs uppercase tracking-[0.2em] font-semibold mb-4">Atención de Salón</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-[#F9F7F2]">Martes a Viernes</span>
                  <span className="block text-[11px] text-[#F1EFE9]/60 mt-0.5 font-mono">09:30 - 19:30 hrs</span>
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-[#F9F7F2]">Sábado</span>
                  <span className="block text-[11px] text-[#F1EFE9]/60 mt-0.5 font-mono">09:00 - 18:30 hrs</span>
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-neutral-400">Domingo y Lunes</span>
                  <span className="block text-[10px] text-zinc-500 font-light mt-0.5">Cerrado (Descanso dominical)</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Location & Contact */}
          <div>
            <h4 className="text-[#F9F7F2] font-serif italic text-xs uppercase tracking-[0.2em] font-semibold mb-4">Ubicación & Contacto</h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#F9F7F2] font-semibold">Sede Providencia</span>
                  <span className="text-[11px] font-light text-[#F1EFE9]/80 block mt-0.5">Av. Providencia 2345, Oficina 402,<br />Providencia (Metro Los Leones), Santiago.</span>
                </div>
              </li>
              <li className="flex items-center space-x-2.5 cursor-pointer hover:text-[#C5A059] duration-300" onClick={handleWhatsAppAlert}>
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span className="font-mono text-[11px]">+56 9 8765 4321</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span className="font-mono text-[10px] shrink-0">contacto@claudiaandreaestilista.cl</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Panel */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-wider font-semibold text-[#F1EFE9]/40 border-t border-[#D1CEC7]/5 pt-6">
          <p>© {currentYear} Claudia Andrea Peluquería. Todos los derechos reservados.</p>
          <p className="flex items-center font-mono">
            <span>Desarrollado para el sector belleza de Santiago de Chile</span>
            <Heart className="w-3 h-3 text-red-500/80 mx-1.5 shrink-0 fill-red-500/20" />
          </p>
        </div>

      </div>
    </footer>
  );
}
