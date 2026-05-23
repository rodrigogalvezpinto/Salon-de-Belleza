export interface Service {
  id: string;
  name: string;
  category: 'corte' | 'color' | 'tratamiento';
  price: number;
  duration: string;
  description: string;
  features: string[];
}

export interface Course {
  id: string;
  name: string;
  price: number;
  duration: string;
  schedule: string;
  description: string;
  modality: 'Presencial' | 'Online' | 'Híbrido';
  features: string[];
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  category: 'corte' | 'color' | 'peinado';
  description: string;
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  itemType: 'service' | 'course';
  itemId: string;
  itemName: string;
  price: number;
  date: string;
  timeSlot: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  paymentMethod?: string;
  transactionId?: string;
  authorizationCode?: string;
  paymentDate?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}
