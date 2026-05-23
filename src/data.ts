import { Service, Course, GalleryItem } from './types';

export const SERVICES: Service[] = [
  {
    id: 's-1',
    name: 'Balayage Premium & Brushing',
    category: 'color',
    price: 95000,
    duration: '240 min',
    description: 'Técnica de aclarado a mano alzada para un degradado luminoso y sutil. Incluye diagnóstico capilar, matización, tratamiento protector de enlaces (Plex) y peinado final.',
    features: ['Evaluación previa personalizada', 'Tratamiento protector de fibra Olaplex/K18', 'Tonalización a medida', 'Brushing u ondas de terminación']
  },
  {
    id: 's-2',
    name: 'Babylights & Corrección de Color',
    category: 'color',
    price: 110000,
    duration: '270 min',
    description: 'Reflejos ultra finos desde la raíz para un aclarado uniforme de aspecto natural y juvenil. Ideal para dar luz general o camuflar primeras canas.',
    features: ['Reflejos ultra delicados y tupidos', 'Tratamiento de nutrición post-color', 'Masaje capilar relajante', 'Corte de puntas de cortesía']
  },
  {
    id: 's-3',
    name: 'Corte de Diseño Claudia Andrea',
    category: 'corte',
    price: 35000,
    duration: '60 min',
    description: 'Corte adaptado a la visajismo (forma de tu rostro), textura de tu cabello y estilo personal. Incluye lavado spa con masaje capilar y peinado con ondas o lacio.',
    features: ['Diagnóstico de visajismo facial', 'Lavado con shampoo de tratamiento especializado', 'Masaje craneal estimulante', 'Peinado profesional final']
  },
  {
    id: 's-4',
    name: 'Tratamiento Alisado Orgánico de Keratina',
    category: 'tratamiento',
    price: 85000,
    duration: '180 min',
    description: 'Sella la cutícula, elimina el frizz y aporta un brillo espejo espectacular controlando el volumen excesivo. Fórmula orgánica libre de formol.',
    features: ['Fórmula Termoactiva Segura para embarazadas', 'Brillo espejo de alta duración (3-4 meses)', 'Aporte de nutrición profunda', 'Eliminación del 100% del encrespamiento']
  },
  {
    id: 's-5',
    name: 'Botox Capilar Ultra Reconstructor',
    category: 'tratamiento',
    price: 55000,
    duration: '90 min',
    description: 'Tratamiento rellenador de la fibra capilar para cabellos secos, dañados o procesados químicamente. Devuelve la fuerza, suavidad y elasticidad.',
    features: ['Enriquecido con ácido hialurónico y colágeno', 'Recuperación de la masa capilar perdida', 'Ideal para post-decoloraciones', 'Brillo instantáneo de salón']
  },
  {
    id: 's-6',
    name: 'Peinado de Novia o Evento de Alta Gala',
    category: 'corte',
    price: 60000,
    duration: '90 min',
    description: 'Diseño exclusivo de peinados recogidos, semi-recogidos u ondas glamorosas de larga duración para tus días más importantes.',
    features: ['Estudio de tocado o velo', 'Preparación de la textura con termo-protectores', 'Fijación de alta fidelidad resistente al clima', 'Prueba opcional en salón (se agenda aparte)']
  }
];

export const COURSES: Course[] = [
  {
    id: 'c-1',
    name: 'Masterclass: Colorimetría Aplicada y Técnicas de Balayage',
    price: 150000,
    duration: '16 horas (2 sábados)',
    schedule: 'Sábados de 09:00 a 17:00 hrs',
    description: 'Aprende los fundamentos científicos del color, alturas de tono, fondos de aclaración y domina 3 técnicas diferentes de Balayage moderno con prácticas en cabezales y modelo real.',
    modality: 'Presencial',
    features: [
      'Material teórico impreso y cuadernillo técnico',
      'Uso de decolorantes y tinturas premium incluidos',
      'Práctica con modelo en vivo supervisada',
      'Certificado de Especialización firmado por Claudia Andrea',
      'Coffee Break premium ambos días'
    ]
  },
  {
    id: 'c-2',
    name: 'Taller de AutoPeinado y Ondeado Express',
    price: 45000,
    duration: '4 horas (1 sesión)',
    schedule: 'Viernes de 16:00 a 20:00 hrs',
    description: 'Descubre cómo sacarle el máximo partido a tu cabello tú misma. Aprende a dominar la plancha, el ondulador y las trenzas básicas para lucir fabulosa todos los días en pocos minutos.',
    modality: 'Presencial',
    features: [
      'Clase ultra personalizada (máximo 5 alumnas)',
      'Análisis de la forma del rostro para sugerir estilos',
      'Trucos de fijación y protección térmica',
      'Práctica guiada paso a paso frente al espejo',
      'Regalo: Cepillo profesional y protector térmico mini'
    ]
  },
  {
    id: 'c-3',
    name: 'Curso Online: Negocio y Marketing para Estilistas',
    price: 80000,
    duration: '10 horas de contenido',
    schedule: 'Acceso ilimitado 24/7 + 2 mentorías en vivo',
    description: 'Lleva tu salón o carrera independiente al siguiente nivel. Aprende cómo tomar fotos atractivas a tus trabajos, gestionar tu Instagram, fijar precios que den rentabilidad y fidelizar clientes.',
    modality: 'Híbrido',
    features: [
      'Videotutoriales HD de edición de fotos y manejo de redes',
      'Plantillas descargables para presupuestos y cálculo de costos',
      'Acceso a grupo de apoyo cerrado en Telegram',
      '2 Sesiones de consulta grupal por Zoom con Claudia Andrea',
      'E-book exclusivo: "Fidelización Express de Clientas"'
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800',
    title: 'Balayage Vainilla Glaseado',
    category: 'color',
    description: 'Difuminación perfecta en tonos fríos para aportar máxima luminosidad sin dañar la integridad de la hebra capilar.'
  },
  {
    id: 'g-2',
    imageUrl: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&q=80&w=800',
    title: 'Babylights & Miel Tridimensional',
    category: 'color',
    description: 'Millones de micro reflejos en tonalidades avellana y miel que aportan volumen visual y movimiento.'
  },
  {
    id: 'g-3',
    imageUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=800',
    title: 'Peinado Boho Chic con Trenza Cruzada',
    category: 'peinado',
    description: 'Diseño de peinado de novia relajado y elegante, adornado con flores secas para ceremonia campestre.'
  },
  {
    id: 'g-4',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
    title: 'Rubio Platino Total & Plex',
    category: 'color',
    description: 'Decoloración global segura con doble enlace protector para mantener la salud y el brillo en tonos extremos.'
  },
  {
    id: 'g-5',
    imageUrl: 'https://images.unsplash.com/photo-1605497746444-ac9dbd39f475?auto=format&fit=crop&q=80&w=800',
    title: 'Corte Shag Desfilado',
    category: 'corte',
    description: 'Corte moderno texturizado con flequillo cortina, ideal para potenciar el movimiento natural del cabello.'
  },
  {
    id: 'g-6',
    imageUrl: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800',
    title: 'Ondas Hollywood Clásicas',
    category: 'peinado',
    description: 'Marcado pulido con brillo extremo y ondas simétricas para gala, eventos formales o alfombra roja.'
  }
];
