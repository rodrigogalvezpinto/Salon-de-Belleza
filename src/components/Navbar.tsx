import React, { useState, useEffect } from 'react';
import { Scissors, Menu, X, Phone, MessageSquare, BookOpen, Image, Calendar } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Scissors },
    { id: 'servicios', label: 'Especialidades', icon: Scissors },
    { id: 'academia', label: 'Cursos & Academia', icon: BookOpen },
    { id: 'galeria', label: 'Galería', icon: Image },
    { id: 'asistente', label: 'Consulta AI', icon: MessageSquare },
    { id: 'agenda', label: 'Reservar', icon: Calendar },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#F9F7F2]/95 backdrop-blur-md shadow-sm border-b border-[#D1CEC7] py-3' 
        : 'bg-gradient-to-b from-[#F9F7F2]/90 to-[#F9F7F2]/0 py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => handleLinkClick('inicio')}
            className="flex items-center space-x-3 cursor-pointer group"
            id="nav-logo"
          >
            <div className="bg-[#C5A059]/10 p-2 border border-[#C5A059]/20 group-hover:bg-[#C5A059] group-hover:text-white transition-all duration-300 text-[#C5A059]">
              <Scissors className="h-5 w-5 transform -rotate-45" />
            </div>
            <div>
              <span className="font-serif font-light italic tracking-tight text-2xl text-[#1A1A1A] block">
                Claudia Andrea
              </span>
              <span className="text-[#C5A059] text-[9.5px] tracking-[0.25em] uppercase font-semibold block -mt-1">
                Estilista Profesional & Educadora
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  id={`nav-item-${item.id}`}
                  className={`text-[11px] uppercase tracking-[0.2em] px-4 py-2 font-semibold transition-all duration-200 border-b-2 ${
                    isActive
                      ? 'border-[#1A1A1A] text-[#1A1A1A]'
                      : 'border-transparent text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:border-[#D1CEC7]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Contact Call-To-Action Button */}
          <div className="hidden sm:flex items-center">
            <button
              onClick={() => handleLinkClick('agenda')}
              id="nav-btn-agenda"
              className="bg-[#1A1A1A] hover:bg-[#C5A059] text-white px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center space-x-2"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Reserva Online</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="nav-mobile-hamburger"
              className="inline-flex items-center justify-center p-2 text-[#1A1A1A] hover:bg-[#F1EFE9] focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#F1EFE9] border-b border-[#D1CEC7] animate-fadeIn" id="mobile-menu-container">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  id={`nav-mobile-${item.id}`}
                  className={`w-full text-left flex items-center space-x-3 px-4 py-3 text-xs uppercase tracking-widest font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#C5A059]/10 text-[#C5A059] border-l-4 border-[#C5A059]'
                      : 'text-[#1A1A1A]/80 hover:bg-[#E5E2DB] hover:text-[#1A1A1A]'
                  }`}
                >
                  <Icon className="h-4 w-4 text-[#C5A059]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-4 pb-2 px-4 border-t border-[#D1CEC7]">
              <button
                onClick={() => handleLinkClick('agenda')}
                id="nav-mobile-agenda"
                className="w-full bg-[#C5A059] text-white font-bold py-3 px-4 text-xs uppercase tracking-widest flex items-center justify-center space-x-2"
              >
                <Calendar className="h-4 w-4" />
                <span>Agendar Ahora (Webpay)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

