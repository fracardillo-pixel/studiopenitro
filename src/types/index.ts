// Tipi per il sistema PenitroMed

export interface Specialization {
  id: string;
  name: string;
  icon: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Doctor {
  id: string;
  name: string;
  photo: string;
  videoUrl?: string;
  bio: string;
  specializations: string[]; // IDs delle specializzazioni
  email?: string;
  phone?: string;
  preferredContact: 'whatsapp' | 'email' | 'phone';
  isActive: boolean;
  createdAt: Date;
}

export interface TimeSlot {
  start: string; // formato "HH:MM"
  end: string;
}

export interface DaySchedule {
  isOpen: boolean;
  slots: TimeSlot[];
}

export interface WeekSchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DoctorSchedule {
  doctorId: string;
  weekSchedule: WeekSchedule;
}

export interface ClinicHours {
  weekSchedule: WeekSchedule;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  image: string;
  readTime: string;
  publishedAt: Date;
  isPublished: boolean;
}

export interface AppState {
  specializations: Specialization[];
  doctors: Doctor[];
  doctorSchedules: DoctorSchedule[];
  clinicHours: ClinicHours;
  blogArticles: BlogArticle[];
}

// Tipi per le funzioni di supporto del chatbot
export interface ActiveSpecializationWithDoctors {
  specialization: Specialization;
  doctors: {
    doctor: Doctor;
    schedule: DoctorSchedule | undefined;
  }[];
}

export interface ContactLink {
  type: 'whatsapp' | 'email' | 'phone';
  url: string;
  label: string;
}
