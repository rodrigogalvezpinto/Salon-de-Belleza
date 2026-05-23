import React from 'react';
import { COURSES } from '../data';
import { Course } from '../types';
import { BookOpen, Clock, Calendar, Check, Award, Sliders, PlayCircle } from 'lucide-react';

interface AcademyProps {
  onSelectItem: (type: 'service' | 'course', id: string) => void;
}

export default function Academy({ onSelectItem }: AcademyProps) {
  
  const formatCLP = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <section className="bg-[#F9F7F2] py-24 border-t border-[#D1CEC7]" id="academia-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 border border-[#C5A059] px-3 py-1 text-[#C5A059] text-[10px] uppercase tracking-[0.2em] font-semibold mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Capacitaciones de Alta Escuela</span>
          </div>
          <h2 className="font-serif font-light text-4xl sm:text-5xl text-[#1A1A1A] tracking-tight mb-4">
            Cursos, Talleres & Academia
          </h2>
          <div className="w-24 h-[1px] bg-[#C5A059] mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-[#1A1A1A]/75 text-sm sm:text-base leading-relaxed font-light">
            ¿Quieres aprender a diseñar cabellos radiantes para tus clientas de forma profesional o dominar tu propio estilo en el día a día? Claudia Andrea ofrece cursos teóricos y prácticos de alto nivel con acreditación comercial y cupos reducidos para asegurar tu aprendizaje.
          </p>
        </div>

        {/* Courses Cards Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" id="academy-grid">
          {COURSES.map((course) => (
            <div 
              key={course.id}
              id={`course-card-${course.id}`}
              className="bg-[#F1EFE9] rounded-none border border-[#D1CEC7] p-6 flex flex-col justify-between hover:border-[#C5A059] transition-all duration-300 relative overflow-hidden group"
            >
              {/* Badge for Modality */}
              <div className="absolute top-4 right-4">
                <span className="px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 rounded-none">
                  {course.modality}
                </span>
              </div>

              <div>
                <div className="text-[#C5A059] mb-4 bg-white border border-[#D1CEC7] w-fit p-3 rounded-none">
                  {course.id === 'c-1' ? (
                    <Award className="w-5 h-5" />
                  ) : course.id === 'c-2' ? (
                    <Sliders className="w-5 h-5" />
                  ) : (
                    <PlayCircle className="w-5 h-5" />
                  )}
                </div>

                <h3 className="text-xl md:text-2xl font-serif font-semibold italic text-[#1A1A1A] mb-2 leading-tight group-hover:text-[#C5A059] transition-colors">
                  {course.name}
                </h3>

                <p className="text-xl font-serif font-semibold text-[#C5A059] mb-4">
                  {formatCLP(course.price)}
                </p>

                <p className="text-[#1A1A1A]/75 text-sm mb-6 leading-relaxed font-light">
                  {course.description}
                </p>

                {/* Direct info list */}
                <div className="space-y-2 mb-6 bg-white p-4 rounded-none border border-[#D1CEC7]">
                  <div className="flex items-center text-xs text-[#1A1A1A]/80">
                    <Clock className="w-4 h-4 text-[#C5A059] mr-2 shrink-0" />
                    <span><strong>Duración:</strong> {course.duration}</span>
                  </div>
                  <div className="flex items-center text-xs text-[#1A1A1A]/80">
                    <Calendar className="w-4 h-4 text-[#C5A059] mr-2 shrink-0" />
                    <span><strong>Horario:</strong> {course.schedule}</span>
                  </div>
                </div>

                {/* Course Syllabus Checklist */}
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C5A059] mb-3">Programa Académico:</h4>
                <ul className="space-y-2.5 mb-8">
                  {course.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-xs text-[#1A1A1A]/80">
                      <Check className="w-4 h-4 text-[#C5A059] mr-2.5 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectItem('course', course.id)}
                id={`btn-enroll-course-${course.id}`}
                className="w-full bg-[#1A1A1A] hover:bg-[#C5A059] text-white py-3.5 px-4 rounded-none text-xs uppercase tracking-widest font-bold transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Inscribirme en Sede</span>
              </button>
            </div>
          ))}
        </div>

        {/* Education Highlight Box */}
        <div className="mt-16 bg-[#F1EFE9] p-8 rounded-none border border-[#D1CEC7] flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/3">
            <h3 className="font-serif italic font-semibold text-xl text-[#1A1A1A] mb-2">Clases Personalizadas & Certificación</h3>
            <p className="text-[#1A1A1A]/70 text-sm leading-relaxed font-light">
              Cada alumna que culmina satisfactoriamente los entrenamientos prácticos recibe un diploma de honor que valida sus conocimientos y habilidades adquiridas con reconocimiento comercial.
            </p>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <div className="p-4 bg-white border border-[#D1CEC7] rounded-none text-center">
              <span className="block text-2xl font-serif italic text-[#C5A059] font-semibold mb-1">Máx. 5</span>
              <span className="text-[#1A1A1A]/70 text-xs font-semibold uppercase tracking-wider">Alumnas por Clase</span>
            </div>
            <div className="p-4 bg-white border border-[#D1CEC7] rounded-none text-center">
              <span className="block text-2xl font-serif italic text-[#C5A059] font-semibold mb-1">100%</span>
              <span className="text-[#1A1A1A]/70 text-xs font-semibold uppercase tracking-wider">Materiales Incluidos</span>
            </div>
            <div className="p-4 bg-white border border-[#D1CEC7] rounded-none text-center">
              <span className="block text-2xl font-serif italic text-emerald-700 font-semibold mb-1">Diploma</span>
              <span className="text-[#1A1A1A]/70 text-xs font-semibold uppercase tracking-wider">Firma Claudia Andrea</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
