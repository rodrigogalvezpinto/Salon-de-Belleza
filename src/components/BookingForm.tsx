import React, { useState, useEffect } from 'react';
import { SERVICES, COURSES } from '../data';
import { Service, Course, Booking } from '../types';
import { 
  Calendar, Clock, User, Mail, Phone, MessageSquare, 
  ChevronRight, ArrowLeft, ShieldCheck, Ticket, Download, 
  Scissors, BookOpen, CreditCard, Lock, CheckCircle2, AlertCircle 
} from 'lucide-react';
import WebpayPortal from './WebpayPortal';

interface BookingFormProps {
  preselectedType: 'service' | 'course' | null;
  preselectedId: string | null;
  onClearPreselections: () => void;
}

export default function BookingForm({ 
  preselectedType, 
  preselectedId,
  onClearPreselections
}: BookingFormProps) {
  
  // Step tracker: 1 (Select), 2 (Date/Time), 3 (Client Data), 4 (Confirm/Initiate pay), 5 (External Webpay), 6 (Receipt Summary)
  const [step, setStep] = useState(1);
  const [itemType, setItemType] = useState<'service' | 'course'>('service');
  const [selectedItemId, setSelectedItemId] = useState('');
  
  // Date/Time States
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Customer details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Webpay integration states
  const [webpayToken, setWebpayToken] = useState('');
  const [webpayOrderId, setWebpayOrderId] = useState('');
  const [isWebpayOpen, setIsWebpayOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<{
    authorizationCode?: string;
    cardType?: string;
    cardNumber?: string;
    bankName?: string;
    date?: string;
  }>({});

  // Populate pre-selected options automatically if clicked from direct catalog
  useEffect(() => {
    if (preselectedType && preselectedId) {
      setItemType(preselectedType);
      setSelectedItemId(preselectedId);
      // Automatically skip to date/time selection
      setStep(2);
    }
  }, [preselectedType, preselectedId]);

  // Available times list
  const timeSlots = [
    '09:30 hrs', '11:00 hrs', '13:00 hrs', '14:30 hrs', '16:00 hrs', '17:30 hrs', '19:00 hrs'
  ];

  // Pick item values
  const getSelectedObject = () => {
    if (itemType === 'service') {
      return SERVICES.find(s => s.id === selectedItemId);
    } else {
      return COURSES.find(c => c.id === selectedItemId);
    }
  };

  const selectedObject = getSelectedObject();

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) {
      if (step === 2 && preselectedId) {
        // If they had preselected from list, going back to 1 clears selection
        onClearPreselections();
        setSelectedItemId('');
        setStep(1);
      } else {
        setStep(step - 1);
      }
    }
  };

  // Safe lazy initializer for payment flow
  const handleInitiatePayment = async () => {
    if (!selectedObject) return;
    
    try {
      const response = await fetch('/api/pay/initiate-mock-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: selectedObject.price,
          bookingId: "RES-" + Date.now(),
          itemName: selectedObject.name,
          customerName: name
        }),
      });

      if (!response.ok) {
        throw new Error('Error al iniciar webpay');
      }

      const data = await response.json();
      setWebpayToken(data.token);
      setWebpayOrderId(data.orderId);
      setIsWebpayOpen(true);
      setStep(5); // Enter Webpay view

    } catch (err) {
      console.error(err);
      alert('Error de conexión con la pasarela Webpay. El servidor se encuentra operando sin API de producción.');
    }
  };

  const handleWebpayResult = (success: boolean, details: any) => {
    setIsWebpayOpen(false);
    setPaymentSuccess(success);
    setPaymentDetails(details);
    setStep(6); // Show voucher/payment status
  };

  const handleResetFlow = () => {
    setStep(1);
    setSelectedItemId('');
    setSelectedDate('');
    setSelectedTime('');
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setPaymentSuccess(null);
    setPaymentDetails({});
    onClearPreselections();
  };

  const formatCLP = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Get current date string for minimum calendar validation limit
  const getMinDateStr = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Rendering 
  if (isWebpayOpen && selectedObject) {
    return (
      <WebpayPortal
        token={webpayToken}
        amount={selectedObject.price}
        orderId={webpayOrderId}
        itemName={selectedObject.name}
        customerName={name}
        onPaymentComplete={handleWebpayResult}
        onCancel={() => {
          setIsWebpayOpen(false);
          setPaymentSuccess(false);
          setStep(6);
        }}
      />
    );
  }

  return (
    <section className="bg-[#F1EFE9] py-24 border-t border-[#D1CEC7]" id="agenda-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        {(step < 6) && (
          <div className="text-center mb-12 animate-fadeIn">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C5A059] mb-3">Reservas & Agendamiento</p>
            <h2 className="font-serif font-light text-4xl sm:text-5xl text-[#1A1A1A] tracking-tight mb-4">
              Agenda & Reserva tu Hora
            </h2>
            <div className="w-24 h-[1px] bg-[#C5A059] mx-auto mb-6"></div>
            <p className="max-w-xl mx-auto text-[#1A1A1A]/75 text-sm sm:text-base leading-relaxed font-light">
              Agenda tu cita en línea hoy de manera inmediata. Los pagos son recibidos a través de Webpay Plus con altos parámetros de seguridad cibernética.
            </p>
          </div>
        )}

        {/* Step Guide Bar (only on setup screens) */}
        {(step < 5) && (
          <div className="flex items-center justify-between max-w-xl mx-auto mb-10 text-xs px-2" id="booking-stepper-bars">
            {[
              { num: 1, label: 'Ítem' },
              { num: 2, label: 'Fecha' },
              { num: 3, label: 'Datos' },
              { num: 4, label: 'Pago' }
            ].map((s) => (
              <div key={s.num} className="flex items-center space-x-1.5 sm:space-x-2">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-none flex items-center justify-center font-bold font-mono transition-colors border ${
                  step === s.num
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : step > s.num
                      ? 'bg-[#C5A059]/10 text-[#C5A059] border-[#C5A059]/30 font-semibold'
                      : 'bg-white text-[#1A1A1A]/40 border-[#D1CEC7]'
                }`}>
                  {s.num}
                </div>
                <span className={`text-[10px] uppercase tracking-wider font-semibold ${step === s.num ? 'text-[#1A1A1A] font-bold' : 'text-[#1A1A1A]/50'}`}>
                  {s.label}
                </span>
                {s.num < 4 && <div className="h-[1px] w-4 sm:w-8 bg-[#D1CEC7] rounded-none max-xs:hidden"></div>}
              </div>
            ))}
          </div>
        )}

        {/* Main interactive cards content */}
        <div className="bg-[#F9F7F2] rounded-none border border-[#D1CEC7] p-6 sm:p-10 shadow-sm relative">
          
          {/* STEP 1: Select service or course */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn" id="step-selector-container">
              <h3 className="text-lg font-serif italic text-[#1A1A1A] font-semibold mb-4">¿Qué deseas agendar / inscribirte?</h3>
              
              {/* Type selector */}
              <div className="bg-white p-1 rounded-none border border-[#D1CEC7] flex max-w-sm mb-6">
                <button
                  type="button"
                  onClick={() => { setItemType('service'); setSelectedItemId(''); }}
                  id="tab-itemtype-service"
                  className={`flex-1 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    itemType === 'service'
                      ? 'bg-[#1A1A1A] text-white'
                      : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
                  }`}
                >
                  <Scissors className="w-3.5 h-3.5 inline mr-1.5" />
                  Servicio de Salón
                </button>
                <button
                  type="button"
                  onClick={() => { setItemType('course'); setSelectedItemId(''); }}
                  id="tab-itemtype-course"
                  className={`flex-1 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    itemType === 'course'
                      ? 'bg-[#1A1A1A] text-white'
                      : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 inline mr-1.5" />
                  Cursos / Academia
                </button>
              </div>

              {/* Items select list */}
              <div>
                <label className="block text-[10px] font-bold uppercase text-[#1A1A1A]/70 tracking-widest mb-2">Selecciona la alternativa de {itemType === 'service' ? 'Salón' : 'Educación'}:</label>
                <select
                  value={selectedItemId}
                  onChange={(e) => setSelectedItemId(e.target.value)}
                  id="select-booking-item"
                  className="w-full bg-white text-[#1A1A1A] text-sm px-4 py-3.5 rounded-none border border-[#D1CEC7] focus:border-[#C5A059] focus:outline-none"
                >
                  <option value="" disabled>-- Selecciona de la lista --</option>
                  {itemType === 'service' ? (
                    SERVICES.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({formatCLP(s.price)})</option>
                    ))
                  ) : (
                    COURSES.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({formatCLP(c.price)})</option>
                    ))
                  )}
                </select>
              </div>

              {/* Show detail summary box if selected */}
              {selectedObject && (
                <div className="bg-[#F1EFE9] border border-[#D1CEC7] p-5 rounded-none mt-4 animate-fadeIn">
                  <p className="text-[9px] text-[#C5A059] font-semibold tracking-widest uppercase mb-1">Especificación técnica</p>
                  <h4 className="font-serif italic font-bold text-neutral-900 text-lg">{selectedObject.name}</h4>
                  <p className="text-[#1A1A1A]/70 text-xs mt-1 leading-relaxed font-light">{selectedObject.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-[#1A1A1A]/80 font-medium">
                    <div>
                      <span className="text-neutral-500">Valor de arancel:</span> <strong className="text-[#C5A059] font-serif">{formatCLP(selectedObject.price)}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500">Horas asignadas:</span> <span>{selectedObject.duration}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Next navigation trigger */}
              <div className="pt-6 border-t border-[#D1CEC7] flex justify-end">
                <button
                  type="button"
                  id="btn-next-step-1"
                  disabled={!selectedItemId}
                  onClick={handleNextStep}
                  className="bg-[#1A1A1A] hover:bg-[#C5A059] disabled:opacity-40 text-white font-bold px-6 py-3 rounded-none text-xs uppercase tracking-widest flex items-center space-x-1.5 transition-all cursor-pointer"
                >
                  <span>Siguiente Paso</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: Choose Date & Time */}
          {step === 2 && selectedObject && (
            <div className="space-y-6 animate-fadeIn" id="step-date-container">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-[#C5A059]/10 p-2.5 border border-[#C5A059]/20 text-[#C5A059] text-sm">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-serif italic text-neutral-900 font-semibold">¿Cuándo quieres agendar?</h3>
                  <span className="text-neutral-500 text-xs uppercase font-semibold tracking-wider">{selectedObject.name}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Visual date selector */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/70 mb-2">Selecciona un día:</label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={getMinDateStr()}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    id="booking-date-input"
                    className="w-full bg-white text-neutral-900 font-mono text-sm px-4 py-3 rounded-none border border-[#D1CEC7] focus:border-[#C5A059] outline-none"
                  />
                  <span className="block text-[10px] text-zinc-500 italic mt-1.5">* Atendemos de Martes a Sábado</span>
                </div>

                {/* Hours grid */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/70 mb-2">Selecciona un bloque:</label>
                  <div className="grid grid-cols-2 gap-2 h-fit" id="time-grid-slots">
                    {timeSlots.map((ts) => (
                      <button
                        type="button"
                        key={ts}
                        onClick={() => setSelectedTime(ts)}
                        id={`btn-timeslot-${ts.replace(/\s+/g, '')}`}
                        className={`py-3 px-3 rounded-none text-xs font-semibold font-mono text-center transition-all cursor-pointer ${
                          selectedTime === ts
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'bg-white text-neutral-600 hover:text-white hover:bg-[#1A1A1A]/80 border border-[#D1CEC7]'
                        }`}
                      >
                        {ts}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation triggers */}
              <div className="pt-6 border-t border-[#D1CEC7] flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  id="btn-back-step-2"
                  className="text-neutral-600 hover:text-neutral-905 text-xs sm:text-sm font-semibold flex items-center space-x-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver</span>
                </button>
                <button
                  type="button"
                  id="btn-next-step-2"
                  disabled={!selectedDate || !selectedTime}
                  onClick={handleNextStep}
                  className="bg-[#1A1A1A] hover:bg-[#C5A059] disabled:opacity-40 text-white font-bold px-6 py-3 rounded-none text-xs uppercase tracking-widest flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Siguiente Paso</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: Customer Information */}
          {step === 3 && selectedObject && (
            <div className="space-y-6 animate-fadeIn" id="step-customer-data-container">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-[#C5A059]/10 p-2.5 border border-[#C5A059]/30 text-[#C5A059] text-sm">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-serif italic text-neutral-900 font-semibold">Ingresa tu Información</h3>
                  <p className="text-neutral-500 text-xs">Reserva para {selectedObject.name} el día {selectedDate} a las {selectedTime}</p>
                </div>
              </div>

              {/* Inputs forms */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/70 mb-1.5">Nombre Completo *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 text-neutral-400 w-4 h-4" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="customer-name"
                      placeholder="Ej. Constanza Silva"
                      className="w-full bg-white text-sm text-neutral-800 pl-10 pr-4 py-3 rounded-none border border-[#D1CEC7] focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/70 mb-1.5">Correo Electrónico *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 text-neutral-400 w-4 h-4" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="customer-email"
                      placeholder="Ej. constanza@gmail.com"
                      className="w-full bg-white text-sm text-neutral-800 pl-10 pr-4 py-3 rounded-none border border-[#D1CEC7] focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/70 mb-1.5">Teléfono Móvil *</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 text-neutral-400 w-4 h-4" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      id="customer-phone"
                      placeholder="Ej. +569 1234 5678"
                      className="w-full bg-white text-sm text-neutral-800 pl-10 pr-4 py-3 rounded-none border border-[#D1CEC7] focus:border-[#C5A059] focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/70 mb-1.5">Información Adicional (Opcional)</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 text-neutral-400 w-4 h-4" />
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      id="customer-notes"
                      placeholder="Ej. Pelo fino teñido de cobrizo"
                      className="w-full bg-white text-sm text-neutral-800 pl-10 pr-4 py-3 rounded-none border border-[#D1CEC7] focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Navigation triggers */}
              <div className="pt-6 border-t border-[#D1CEC7] flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  id="btn-back-step-3"
                  className="text-neutral-600 hover:text-neutral-900 text-xs sm:text-sm font-semibold flex items-center space-x-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver</span>
                </button>
                <button
                  type="button"
                  id="btn-next-step-3"
                  disabled={!name || !email || !phone}
                  onClick={handleNextStep}
                  className="bg-[#1A1A1A] hover:bg-[#C5A059] disabled:opacity-40 text-white font-bold px-6 py-3 rounded-none text-xs uppercase tracking-widest flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Siguiente Paso</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 4: Checkout Summary and Redirection */}
          {step === 4 && selectedObject && (
            <div className="space-y-6 animate-fadeIn" id="step-confirm-checkout-container">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-[#C5A059]/10 p-2.5 border border-[#C5A059]/30 text-[#C5A059] text-sm">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-serif italic text-neutral-900 font-semibold">Revisa & Paga tu Reserva</h3>
                  <p className="text-neutral-500 text-xs">Paso final previo al portal seguro Webpay Plus.</p>
                </div>
              </div>

              {/* Checkout details grid */}
              <div className="bg-white rounded-none border border-[#D1CEC7] overflow-hidden divide-y divide-[#D1CEC7]">
                <div className="p-5 flex justify-between items-center bg-[#F1EFE9]">
                  <div>
                    <span className="text-[9px] text-[#C5A059] font-bold uppercase tracking-widest block">Ítem Seleccionado</span>
                    <span className="font-serif italic font-bold text-neutral-900 text-lg block mt-0.5">{selectedObject.name}</span>
                    <span className="text-[9px] text-neutral-500 block uppercase tracking-widest font-semibold mt-1">{selectedObject.duration} • {itemType === 'service' ? 'Salón' : 'Academia'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-serif font-semibold text-[#C5A059]">
                      {formatCLP(selectedObject.price)}
                    </span>
                    <span className="text-[9px] text-neutral-400 font-bold block uppercase tracking-widest">CLP</span>
                  </div>
                </div>

                <div className="p-5 grid sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-neutral-400 font-bold uppercase text-[9px] tracking-wider block">Fecha de Cita / Inicio</span>
                    <span className="font-semibold text-neutral-800 block mt-1">{selectedDate}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-bold uppercase text-[9px] tracking-wider block">Bloque Horario</span>
                    <span className="font-semibold text-neutral-800 block mt-1">{selectedTime}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-bold uppercase text-[9px] tracking-wider block">Cliente Reservante</span>
                    <span className="font-semibold text-neutral-800 block mt-1">{name}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-bold uppercase text-[9px] tracking-wider block">Mail & Teléfono</span>
                    <span className="font-semibold text-neutral-800 block mt-1">{email} / {phone}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#F1EFE9] border border-[#D1CEC7] p-4 rounded-none text-neutral-700 text-xs flex items-start gap-3">
                <Lock className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Al pulsar el botón "Proceder al Pago", te redirigiremos a la pasarela cifrada segura provista por Transbank para que selecciones tu Banco de conveniencia. No se efectúan recargos adicionales.
                </p>
              </div>

              {/* Navigation triggers */}
              <div className="pt-6 border-t border-[#D1CEC7] flex justify-between items-center">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  id="btn-back-step-4"
                  className="text-neutral-600 hover:text-neutral-900 text-xs sm:text-sm font-semibold flex items-center space-x-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver</span>
                </button>
                
                <button
                  type="button"
                  onClick={handleInitiatePayment}
                  id="btn-confirm-and-pay"
                  className="bg-[#1A1A1A] hover:bg-[#C5A059] text-white font-bold px-8 py-4 rounded-none text-xs uppercase tracking-widest flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Proceder al Pago Seguro (Webpay)</span>
                </button>
              </div>

            </div>
          )}

          {/* STEP 6: Successful or failed Voucher screen */}
          {step === 6 && (
            <div className="space-y-6 animate-fadeIn" id="step-payment-status">
              
              {paymentSuccess === true ? (
                <div className="text-center py-6">
                  {/* Circle success indicator */}
                  <div className="inline-flex justify-center items-center bg-[#C5A059]/10 p-4 border border-[#C5A059]/20 rounded-none text-[#C5A059] mb-6 shrink-0 h-16 w-16">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <h3 className="font-serif italic font-bold text-2xl sm:text-3xl text-neutral-900 mb-2">¡Inscripción & Pago Exitosos!</h3>
                  <p className="text-neutral-600 text-sm max-w-md mx-auto mb-10 leading-relaxed font-light">
                    Hemos confirmado tu reserva capilar correctamente. Claudia Andrea ha bloqueado tu espacio prioritario en su agenda de atención.
                  </p>

                  {/* Chilean Transbank Receipt Voucher card */}
                  <div className="bg-white text-neutral-900 rounded-none border border-[#D1CEC7] shadow-md max-w-lg mx-auto overflow-hidden text-left font-sans">
                    {/* Voucher Header banner */}
                    <div className="bg-blue-950 text-white px-5 py-3.5 flex items-center justify-between rounded-none">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-black italic text-lg tracking-tighter">webpay</span>
                        <span className="font-bold text-red-500 text-sm">PLUS</span>
                      </div>
                      <span className="text-[9px] uppercase font-bold tracking-widest bg-emerald-600 px-3 py-1 rounded text-white font-mono">TRANSACCIÓN APROBADA</span>
                    </div>

                    {/* Voucher fields */}
                    <div className="p-6 space-y-4 bg-white">
                      {/* Stylist brand signature */}
                      <div className="text-center border-b border-dashed border-neutral-300 pb-4 mb-4">
                        <h4 className="font-serif italic font-bold text-[#1A1A1A] text-lg tracking-wider uppercase">CLAUDIA ANDREA ESTILISTA</h4>
                        <p className="text-[10px] text-neutral-500 mt-0.5 uppercase tracking-widest">Santiago, Chile • Certificado Transbank</p>
                      </div>

                      <div className="space-y-2.5 text-xs">
                        <div className="flex justify-between border-b pb-1.5 border-neutral-100">
                          <span className="text-neutral-500">Servicio Adquirido:</span>
                          <span className="font-bold text-neutral-900 text-right max-w-xs">{selectedObject?.name}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1.5 border-neutral-100">
                          <span className="text-neutral-500">Fecha de Cita:</span>
                          <span className="font-bold text-neutral-900 font-mono">{selectedDate} - {selectedTime}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1.5 border-neutral-100">
                          <span className="text-neutral-500">Cliente Reservante:</span>
                          <span className="font-semibold text-neutral-800">{name}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1.5 border-neutral-100">
                          <span className="text-neutral-500">Método de Pago:</span>
                          <span className="font-semibold text-[#1A1A1A] font-mono">{paymentDetails.cardType}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1.5 border-neutral-100">
                          <span className="text-neutral-500">Número de Tarjeta:</span>
                          <span className="font-mono text-neutral-800">{paymentDetails.cardNumber}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1.5 border-neutral-100">
                          <span className="text-neutral-500">Código de Autorización:</span>
                          <span className="font-mono font-bold text-neutral-900">{paymentDetails.authorizationCode}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1.5 border-neutral-100">
                          <span className="text-neutral-500">Banco Emisor:</span>
                          <span className="font-semibold text-neutral-800">{paymentDetails.bankName}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1.5 border-neutral-100 font-mono">
                          <span className="text-neutral-500">Orden de Compra:</span>
                          <span className="font-medium text-neutral-850">{webpayOrderId}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1.5 border-neutral-100">
                          <span className="text-neutral-500">Fecha de Transacción:</span>
                          <span className="font-mono text-neutral-800">{paymentDetails.date}</span>
                        </div>
                        
                        {notes && (
                          <div className="bg-neutral-50 p-2.5 rounded border border-neutral-100 text-[11px] text-neutral-600">
                            <strong>Nota adicional:</strong> "{notes}"
                          </div>
                        )}

                        <div className="pt-4 flex justify-between items-center text-sm">
                          <span className="text-neutral-600 font-bold">TOTAL PAGADO:</span>
                          <span className="text-lg font-serif font-bold text-red-650 text-red-650 text-red-700">{formatCLP(selectedObject?.price || 0)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Voucher Footer legal details */}
                    <div className="bg-neutral-50 border-t border-neutral-200 p-4 text-[10px] text-neutral-500 text-center leading-relaxed font-light">
                      <p>Por favor conserve este voucher de pago seguro de Transbank Webpay.<br />Ha recibido una copia certificada de este ticket directamente en su casilla: <strong>{email}</strong>.</p>
                    </div>
                  </div>

                  {/* Receipt Options Panel */}
                  <div className="mt-10 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => alert('Voucher guardado en PDF de tu dispositivo de manera exitosa.')}
                      className="bg-white hover:bg-neutral-50 text-neutral-800 font-semibold py-3 px-6 rounded-none text-xs uppercase tracking-widest transition-colors border border-[#D1CEC7] cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Descargar Recibo</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleResetFlow}
                      id="btn-book-another"
                      className="bg-[#1A1A1A] hover:bg-[#C5A059] text-white font-bold py-3 px-6 rounded-none text-xs uppercase tracking-widest cursor-pointer"
                    >
                      <Ticket className="w-4 h-4 animate-pulse" />
                      <span>Agendar Nuevo Servicio</span>
                    </button>
                  </div>
                </div>
              ) : (
                // CANCELED OR FAILED PAYMENT SCREEN
                <div className="text-center py-6">
                  <div className="inline-flex justify-center items-center bg-red-150 p-4 border border-red-500/20 rounded-none text-red-600 mb-6 shrink-0 h-16 w-16">
                    <AlertCircle className="w-10 h-10" />
                  </div>

                  <h3 className="font-serif italic font-bold text-2xl sm:text-3xl text-neutral-900 mb-2">Transacción Anulada</h3>
                  <p className="text-neutral-600 text-sm max-w-md mx-auto mb-10 leading-relaxed font-light">
                    Hemos recibido un reporte de anulación desde el portal seguro Transbank. Los montos no fueron procesados de tu cuenta bancaria. 
                  </p>

                  <div className="bg-[#F1EFE9] border border-[#D1CEC7] p-5 rounded-none max-w-sm mx-auto text-left text-xs text-[#1A1A1A]/80 space-y-2 mb-10">
                    <p className="text-[#C5A059] font-bold uppercase tracking-widest text-[9px] mb-3">Sugerencias para el pago:</p>
                    <p>• Valida contar con cupo de compras nacionales en tu tarjeta.</p>
                    <p>• Asegúrate de validar tus credenciales de autorización del banco.</p>
                    <p>• O contacta directo a Claudia Andrea para cancelar vía transferencia.</p>
                  </div>

                  <div className="flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleResetFlow}
                      className="bg-[#1A1A1A] hover:bg-[#C5A059] text-white font-bold py-3.5 px-8 rounded-none text-xs uppercase tracking-widest transition-transform cursor-pointer"
                    >
                      Volver a Intentar
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
