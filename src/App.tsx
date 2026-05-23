import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesList from './components/ServicesList';
import Academy from './components/Academy';
import Gallery from './components/Gallery';
import AiAssistant from './components/AiAssistant';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [preselectedType, setPreselectedType] = useState<'service' | 'course' | null>(null);
  const [preselectedId, setPreselectedId] = useState<string | null>(null);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Custom section targets
    const targetId = sectionId === 'inicio' ? 'hero-section' : `${sectionId}-section`;
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectItem = (type: 'service' | 'course', id: string) => {
    setPreselectedType(type);
    setPreselectedId(id);
    setActiveSection('agenda');

    const targetElement = document.getElementById('agenda-section');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectServiceTypeFromGallery = (serviceName: string) => {
    // If user clicked a look they liked from the gallery, find the match or go to agenda step 1
    setActiveSection('agenda');
    const targetElement = document.getElementById('agenda-section');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleClearPreselections = () => {
    setPreselectedType(null);
    setPreselectedId(null);
  };

  return (
    <div className="bg-[#F9F7F2] min-h-screen text-[#1A1A1A] font-sans selection:bg-[#C5A059] selection:text-white antialiased">
      {/* Dynamic Header */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Single-page Content flow */}
      <main id="app-main-content">
        <Hero onNavigate={handleNavigate} />
        
        <ServicesList onSelectItem={handleSelectItem} />
        
        <Academy onSelectItem={handleSelectItem} />
        
        <Gallery onSelectServiceType={handleSelectServiceTypeFromGallery} />
        
        <AiAssistant />
        
        <BookingForm 
          preselectedType={preselectedType} 
          preselectedId={preselectedId}
          onClearPreselections={handleClearPreselections}
        />
      </main>

      {/* Footer Details */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

