import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, MessageSquare, Trash2, ArrowRight, User, Scissors } from 'lucide-react';
import { ChatMessage } from '../types';

export default function AiAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: '¡Hola! Te doy la bienvenida al Asistente de Estilo Virtual de Claudia Andrea. 🌸\n\nCuéntame, ¿qué tipo de cambio estás buscando? ¿Te gustaría mejorar el brillo, combatir el frizz, aclarar progresivamente tu cabello con un balayage luminoso o te interesa formarte profesionalmente en mi academia?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Assemble chat history formatted as simple text bubbles
      const history = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({
          sender: m.sender,
          text: m.text
        }));

      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: textToSend, 
          history: history 
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo conectar con el servidor.');
      }

      const data = await response.json();
      
      const assistantMessage: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: data.response || 'Disculpa, ocurrió un inconveniente al procesar tus datos capilares.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error: any) {
      console.error("AI Error:", error);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: '¡Vaya! He experimentado un breve problema de conexión. Te recomiendo recargar la página o agendar tu cita de evaluación presencial directo con Claudia Andrea para un diagnóstico más certero. 💖',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: '¡Conversación restablecida!\n\nEstoy lista para asesorarte. Cuéntame sobre la porosidad de tu cabello, tu tono natural o qué tipo de asesoramiento de salón o académico necesitas.',
        timestamp: new Date()
      }
    ]);
  };

  const quickPrompts = [
    { text: '¿Qué diferencia hay entre Balayage y Babylights?', label: '💡 Balayage vs Babylights' },
    { text: 'Tengo frizz rebelde, ¿qué tratamiento me recomiendas?', label: '✨ Tratamiento Frizz' },
    { text: '¿Cuánto dura el curso presencial de Balayage?', label: '🎓 Info Cursos' },
    { text: 'Tengo cabello decolorado seco, ¿cómo lo recupero?', label: '🧴 Recuperar Hebra' }
  ];

  return (
    <section className="bg-[#F9F7F2] py-24 border-t border-[#D1CEC7]" id="asistente-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 border border-[#C5A059] px-4 py-1.5 text-[#C5A059] text-[10px] uppercase tracking-[0.2em] font-semibold mb-4">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>Asesor Virtual Inteligente (Gemini AI)</span>
          </div>
          <h2 className="font-serif font-light text-4xl sm:text-5xl text-[#1A1A1A] tracking-tight mb-4">
            Consulta Capilar AI & Coach de Estilo
          </h2>
          <div className="w-24 h-[1px] bg-[#C5A059] mx-auto mb-6"></div>
          <p className="text-[#1A1A1A]/75 text-sm max-w-xl mx-auto leading-relaxed font-light">
            Nuestra inteligencia artificial entrenada por Claudia Andrea te recomendará el corte, tratamiento o curso idóneo según tus condiciones e inquietudes.
          </p>
        </div>

        {/* Chat Widget Base */}
        <div className="bg-[#F1EFE9] rounded-none border border-[#D1CEC7] overflow-hidden flex flex-col h-[580px] relative">
          
          {/* Top Panel */}
          <div className="bg-[#E5E2DB] border-b border-[#D1CEC7] px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white border border-[#D1CEC7] rounded-none flex items-center justify-center text-[#C5A059] font-bold">
                  <Scissors className="w-5 h-5 transform -rotate-45" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-600 rounded-full w-3.5 h-3.5 border-2 border-white"></div>
              </div>
              <div>
                <span className="block font-serif italic font-bold text-sm text-[#1A1A1A]">Virtual Hair Coach</span>
                <span className="block text-[9px] text-[#1A1A1A]/60 uppercase tracking-widest font-semibold">Respuesta inmediata • Consejos Profesionales</span>
              </div>
            </div>

            <button
              onClick={handleClearChat}
              id="btn-clear-chat"
              title="Borrar conversación"
              className="p-1 px-3 bg-white text-[#1A1A1A] hover:bg-[#F9F7F2] text-[10px] uppercase tracking-widest font-semibold border border-[#D1CEC7] rounded-none flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="max-sm:hidden">Reset</span>
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F9F7F2]/40" id="chat-messages-container">
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} animate-fadeIn`}
                >
                  <div className={`flex items-start space-x-2.5 max-w-[85%] ${!isAssistant && 'flex-row-reverse space-x-reverse'}`}>
                    <div className={`w-8 h-8 rounded-none border border-[#D1CEC7] flex items-center justify-center text-xs shrink-0 ${
                      isAssistant 
                        ? 'bg-white text-[#C5A059]' 
                        : 'bg-[#1A1A1A] text-white'
                    }`}>
                      {isAssistant ? <Sparkles className="w-3.5 h-3.5 animate-pulse" /> : <User className="w-3.5 h-3.5" />}
                    </div>
                    
                    <div className={`p-4 rounded-none text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      isAssistant 
                        ? 'bg-white border border-[#D1CEC7] text-[#1A1A1A]' 
                        : 'bg-[#C5A059] text-white font-medium shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {isLoading && (
              <div className="flex justify-start items-center space-x-2 animate-pulse">
                <div className="w-8 h-8 rounded-none border border-[#D1CEC7] bg-white flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-spin" />
                </div>
                <div className="bg-white border border-[#D1CEC7] p-3.5 rounded-none text-xs text-[#1A1A1A]/70">
                  <span className="font-serif italic font-semibold">Diagnosticando hebra capilar...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick-starter Buttons */}
          <div className="px-4 pt-3 border-t border-[#D1CEC7] bg-[#E5E2DB]/30">
            <p className="text-[10px] text-[#1A1A1A]/55 font-bold uppercase tracking-widest mb-1.5">Preguntas Frecuentes:</p>
            <div className="flex flex-wrap gap-2 pb-3 overflow-x-auto max-h-24 scrollbar-none">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(prompt.text)}
                  id={`quick-prompt-${index}`}
                  className="bg-white hover:bg-[#F9F7F2] text-[#1A1A1A] border border-[#D1CEC7] text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-none transition-all duration-200 shrink-0 cursor-pointer font-semibold"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Panel */}
          <div className="p-3 bg-white border-t border-[#D1CEC7]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Pregunta sobre tintura, frizz, visajismo, cursos o agenda..."
                id="chat-input"
                className="flex-1 bg-white text-[#1A1A1A] placeholder-[#1A1A1A]/40 text-xs sm:text-sm rounded-none px-4 py-3 border border-[#D1CEC7] focus:border-[#C5A059] focus:outline-none"
              />
              <button
                type="submit"
                id="btn-chat-send"
                disabled={!inputText.trim() || isLoading}
                className="bg-[#1A1A1A] hover:bg-[#C5A059] disabled:opacity-40 text-white p-3.5 rounded-none transition-all cursor-pointer font-bold shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
