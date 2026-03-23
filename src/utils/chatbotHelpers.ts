import { AppState, ActiveSpecializationWithDoctors, ContactLink, Doctor, DoctorSchedule, WeekSchedule } from '../types';

const CLINIC_PHONE = '+39 0771 123456';
const CLINIC_WHATSAPP = '390771123456';

interface ClinicContacts {
  phone: string;
  whatsapp: string;
  email: string;
}

/**
 * Estrae le specializzazioni attive con i relativi medici e orari
 * Usata dal chatbot per mostrare solo le opzioni disponibili
 */
export const getActiveSpecializationsWithDoctors = (state: AppState): ActiveSpecializationWithDoctors[] => {
  const activeSpecs = state.specializations.filter((s) => s.isActive);

  return activeSpecs.map((spec) => {
    // Trova i medici attivi associati a questa specializzazione
    const associatedDoctors = state.doctors
      .filter((doc) => doc.isActive && doc.specializations.includes(spec.id))
      .map((doc) => ({
        doctor: doc,
        schedule: state.doctorSchedules.find((ds) => ds.doctorId === doc.id),
      }));

    return {
      specialization: spec,
      doctors: associatedDoctors,
    };
  });
};

/**
 * Genera un link di contatto (WhatsApp, email o telefono) precompilato
 * in base al medico scelto e alla specializzazione
 */
export const generateContactLink = (
  doctor: Doctor | null,
  specialization: string,
  contactType?: 'whatsapp' | 'email' | 'phone',
  clinicContacts?: ClinicContacts
): ContactLink => {
  const type = contactType || doctor?.preferredContact || 'whatsapp';
  const doctorName = doctor?.name || 'un medico';
  const message = `Buongiorno, vorrei prenotare una visita di ${specialization}${doctor ? ` con ${doctorName}` : ''} presso PenitroMed. Potete contattarmi per fissare un appuntamento? Grazie.`;
  const fallbackWhatsapp = clinicContacts ? clinicContacts.whatsapp.replace(/[\s+]/g, '') : CLINIC_WHATSAPP;
  const fallbackPhone = clinicContacts ? clinicContacts.phone : CLINIC_PHONE;
  const fallbackEmail = clinicContacts ? clinicContacts.email : 'info@penitromed.it';

  switch (type) {
    case 'whatsapp': {
      const phone = doctor?.phone?.replace(/\s+/g, '').replace('+', '') || fallbackWhatsapp;
      const encodedMessage = encodeURIComponent(message);
      return {
        type: 'whatsapp',
        url: `https://wa.me/${phone}?text=${encodedMessage}`,
        label: 'Scrivi su WhatsApp',
      };
    }

    case 'email': {
      const email = doctor?.email || fallbackEmail;
      const subject = encodeURIComponent(`Richiesta prenotazione ${specialization}`);
      const body = encodeURIComponent(message);
      return {
        type: 'email',
        url: `mailto:${email}?subject=${subject}&body=${body}`,
        label: 'Invia Email',
      };
    }

    case 'phone':
    default: {
      const phone = doctor?.phone || fallbackPhone;
      return {
        type: 'phone',
        url: `tel:${phone.replace(/\s+/g, '')}`,
        label: 'Chiama ora',
      };
    }
  }
};

/**
 * Genera il link WhatsApp della clinica con messaggio precompilato
 */
export const generateClinicWhatsAppLink = (specialization?: string, clinicWhatsapp?: string): string => {
  const message = specialization
    ? `Buongiorno, vorrei prenotare una visita di ${specialization} presso PenitroMed. Potete contattarmi per fissare un appuntamento? Grazie.`
    : 'Buongiorno, vorrei prenotare una visita presso PenitroMed. Potete contattarmi per fissare un appuntamento? Grazie.';
  const number = clinicWhatsapp ? clinicWhatsapp.replace(/[\s+]/g, '') : CLINIC_WHATSAPP;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

/**
 * Formatta gli orari di disponibilità di un medico in italiano
 */
export const formatDoctorSchedule = (schedule: DoctorSchedule | undefined): string => {
  if (!schedule) return 'Orari da definire';

  const dayNames: Record<keyof WeekSchedule, string> = {
    monday: 'Lunedì',
    tuesday: 'Martedì',
    wednesday: 'Mercoledì',
    thursday: 'Giovedì',
    friday: 'Venerdì',
    saturday: 'Sabato',
    sunday: 'Domenica',
  };

  const days = Object.entries(schedule.weekSchedule)
    .filter(([_, day]) => (day as { isOpen: boolean; slots: { start: string; end: string }[] }).isOpen && (day as { isOpen: boolean; slots: { start: string; end: string }[] }).slots.length > 0)
    .map(([dayKey, day]) => {
      const dayData = day as { isOpen: boolean; slots: { start: string; end: string }[] };
      const slots = dayData.slots.map((s: { start: string; end: string }) => `${s.start}-${s.end}`).join(', ');
      return `${dayNames[dayKey as keyof WeekSchedule]}: ${slots}`;
    });

  return days.length > 0 ? days.join(' | ') : 'Nessun orario disponibile';
};

/**
 * Ottiene solo le specializzazioni attive (senza medici)
 */
export const getActiveSpecializations = (state: AppState) => {
  return state.specializations.filter((s: { isActive: boolean }) => s.isActive);
};

/**
 * Ottiene i medici attivi per una specifica specializzazione
 */
export const getDoctorsForSpecialization = (state: AppState, specializationId: string) => {
  return state.doctors.filter(
    (doc) => doc.isActive && doc.specializations.includes(specializationId)
  );
};

/**
 * Verifica se una specializzazione ha almeno un medico attivo
 */
export const hasActiveDoctors = (state: AppState, specializationId: string): boolean => {
  return state.doctors.some(
    (doc) => doc.isActive && doc.specializations.includes(specializationId)
  );
};
