import React, { useState } from 'react';
import { ShieldCheck, Lock, CreditCard, ChevronRight, ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react';

interface WebpayPortalProps {
  token: string;
  amount: number;
  orderId: string;
  itemName: string;
  customerName: string;
  onPaymentComplete: (success: boolean, details: {
    authorizationCode?: string;
    cardType?: string;
    cardNumber?: string;
    bankName?: string;
    date?: string;
  }) => void;
  onCancel: () => void;
}

export default function WebpayPortal({
  token,
  amount,
  orderId,
  itemName,
  customerName,
  onPaymentComplete,
  onCancel
}: WebpayPortalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'debit'>('credit');
  const [selectedBank, setSelectedBank] = useState('Banco de Chile');
  const [cardNumber, setCardNumber] = useState('XXXX-XXXX-XXXX-4589');
  const [status, setStatus] = useState<'selection' | 'processing'>('selection');

  const formatCLP = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(value);
  };

  const banks = [
    'Banco de Chile / Edwards',
    'Banco Santander',
    'Banco del Estado de Chile',
    'BCI / TBanc',
    'Banco Itaú / Corpbanca',
    'Scotiabank Azul',
    'MACH / Bci Prepaid',
    'Tenpo Prepago',
    'Otro Banco Local'
  ];

  const handleSimulatePayment = (approved: boolean) => {
    setStatus('processing');
    
    // Simulate Transbank validation lag
    setTimeout(() => {
      if (approved) {
        const randomAuth = Math.floor(100000 + Math.random() * 900000).toString();
        onPaymentComplete(true, {
          authorizationCode: randomAuth,
          cardType: paymentMethod === 'credit' ? 'Tarj. Crédito (VISA)' : 'Redcompra (Débito)',
          cardNumber: cardNumber || 'XXXX-XXXX-XXXX-4589',
          bankName: selectedBank,
          date: new Date().toLocaleDateString('es-CL', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })
        });
      } else {
        onPaymentComplete(false, {});
      }
    }, 2800);
  };

  if (status === 'processing') {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4" id="webpay-processing-state">
        <div className="bg-white text-neutral-900 rounded-2xl p-8 max-w-md w-full shadow-2xl border-t-8 border-red-600 text-center">
          <div className="flex justify-center mb-6">
            <RefreshCw className="w-16 h-16 text-red-600 animate-spin" />
          </div>
          <h2 className="text-xl font-bold mb-2">Transacción en Proceso</h2>
          <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-4">Webpay Plus • Transbank</p>
          <div className="w-10 h-0.5 bg-neutral-200 mx-auto mb-6"></div>
          
          <p className="text-neutral-600 text-sm mb-6 leading-relaxed">
            Estamos validando tu pago seguro con tu institución emisora <strong>{selectedBank}</strong>.<br />
            Por favor, no recargues la pestaña, no presiones el botón de retroceso ni cierres esta ventana.
          </p>

          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 text-left">
            <div className="flex justify-between text-xs text-neutral-500 mb-1">
              <span>Comercio:</span>
              <span className="font-semibold text-neutral-800">Claudia Andrea Estilista</span>
            </div>
            <div className="flex justify-between text-xs text-neutral-500 mb-1">
              <span>Orden de Compra:</span>
              <span className="font-mono font-semibold text-neutral-800">{orderId}</span>
            </div>
            <div className="flex justify-between text-xs text-neutral-500">
              <span>Monto total:</span>
              <span className="font-bold text-red-600 font-mono">{formatCLP(amount)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col justify-between py-10 px-4 text-neutral-900" id="webpay-portal-container">
      {/* Top Banner (Clean corporate feel) */}
      <div className="max-w-3xl w-full mx-auto">
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-sm border border-neutral-200 mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black italic tracking-tighter text-blue-900">webpay</span>
            <span className="text-xl font-bold text-red-600">PLUS</span>
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Conexión de Alta Seguridad</span>
          </div>
        </div>

        {/* Main Interface Layout */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Order Details Column (Left/Sidebar) */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-5 md:col-span-1 h-fit">
            <h3 className="font-bold text-xs uppercase tracking-widest text-neutral-500 mb-4 pb-2 border-b border-neutral-150">Resumen del Pago</h3>
            
            <div className="space-y-4">
              <div>
                <span className="block text-xs text-neutral-400 uppercase">Comercio</span>
                <span className="font-medium text-sm text-neutral-800">Claudia Andrea Estilista</span>
              </div>
              <div>
                <span className="block text-xs text-neutral-400 uppercase">Servicio / Curso</span>
                <span className="font-medium text-sm text-neutral-800 line-clamp-2">{itemName}</span>
              </div>
              <div>
                <span className="block text-xs text-neutral-400 uppercase font-mono">Orden de Compra</span>
                <span className="font-mono font-medium text-sm text-neutral-800">{orderId}</span>
              </div>
              <div>
                <span className="block text-xs text-neutral-400 uppercase">Cliente</span>
                <span className="font-medium text-sm text-neutral-800">{customerName}</span>
              </div>

              <div className="pt-4 border-t border-dashed border-neutral-200">
                <span className="block text-xs text-neutral-400 uppercase">Monto Total a Pagar</span>
                <span className="text-2xl font-extrabold text-red-650 text-red-600 font-mono block">
                  {formatCLP(amount)}
                </span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">Peso Chileno (CLP)</span>
              </div>
            </div>
          </div>

          {/* Payment selector and validation forms */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 md:col-span-2">
            <h2 className="text-lg font-bold mb-2 text-neutral-850">Selecciona el Método de Pago</h2>
            <p className="text-xs text-neutral-500 mb-6">Transacciones procesadas de forma cifrada mediante pasarela oficial Transbank de Chile.</p>

            {/* Credit / Debit switcher */}
            <div className="grid grid-cols-2 gap-3 mb-6" id="webpay-payment-selection-method">
              <button
                type="button"
                onClick={() => setPaymentMethod('credit')}
                className={`py-4 px-4 rounded-xl border text-center font-semibold transition-all ${
                  paymentMethod === 'credit'
                    ? 'border-red-600 bg-red-50/10 text-red-600 font-bold ring-2 ring-red-600/10'
                    : 'border-neutral-250 hover:bg-neutral-50 text-neutral-600'
                }`}
              >
                <div className="flex justify-center mb-1 text-red-600">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="text-sm">Tarjeta de Crédito</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('debit')}
                className={`py-4 px-4 rounded-xl border text-center font-semibold transition-all ${
                  paymentMethod === 'debit'
                    ? 'border-red-650 border-red-600 bg-red-50/10 text-red-600 font-bold ring-2 ring-red-600/10'
                    : 'border-neutral-25          border-neutral-250 hover:bg-neutral-50 text-neutral-600'
                }`}
              >
                <div className="flex justify-center mb-1 text-red-600">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="text-sm">Débito / Redcompra</span>
              </button>
            </div>

            {/* Input fields based on selection */}
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Banco Emisor</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full bg-neutral-50 text-sm px-4 py-2.5 rounded-lg border border-neutral-200 outline-none focus:border-red-500 shadow-inner"
                >
                  {banks.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-500 mb-1.5 uppercase">Número de la Tarjeta</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="XXXX-XXXX-XXXX-4589"
                  className="w-full bg-neutral-50 text-sm px-4 py-2.5 rounded-lg border border-neutral-200 outline-none focus:border-red-500 shadow-inner font-mono text-neutral-800"
                />
              </div>
            </div>

            {/* Simulating Control Panel */}
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 shadow-inner mb-8">
              <span className="flex items-center text-amber-800 text-xs font-bold mb-1.5">
                <AlertTriangle className="w-4 h-4 mr-1 shrink-0" />
                PANEL DE SIMULACIÓN PARA CLIENTAS
              </span>
              <p className="text-xs text-amber-700 leading-relaxed mb-4">
                Elige de qué forma deseas completar esta transacción para modelar la experiencia que tus usuarias de peluquería Claudia Andrea verán:
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => handleSimulatePayment(true)}
                  id="webpay-btn-success"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg text-xs transition-colors flex items-center justify-center space-x-1"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>SIMULAR TRANSACCIÓN APROBADA</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSimulatePayment(false)}
                  id="webpay-btn-fail"
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-lg text-xs transition-colors flex items-center justify-center space-x-1"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>SIMULAR RECHAZO DE PAGO</span>
                </button>
              </div>
            </div>

            {/* Exit/Cancel option */}
            <div className="flex items-center justify-between border-t border-neutral-100 pt-5">
              <button
                type="button"
                onClick={onCancel}
                className="text-xs text-neutral-500 hover:text-black flex items-center space-x-1 font-medium transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Anular Pago y volver al comercio</span>
              </button>
              <div className="flex items-center space-x-1 text-neutral-450 text-[10px] text-neutral-450 uppercase">
                <Lock className="w-3 h-3 text-neutral-400" />
                <span>SSL de alta seguridad corporativo</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Footer copyright */}
      <div className="text-center text-neutral-400 text-xs py-4 border-t border-neutral-200 mt-10">
        <p>© 2026 Transbank S.A. Todos los derechos reservados. Webpay Plus es una marca registrada de Transbank.</p>
      </div>
    </div>
  );
}
