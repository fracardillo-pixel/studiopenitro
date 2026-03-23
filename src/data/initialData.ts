import { AppState, WeekSchedule, ContactInfo } from '../types';

const defaultWeekSchedule: WeekSchedule = {
  monday: { isOpen: true, slots: [{ start: '09:00', end: '13:00' }, { start: '15:00', end: '19:00' }] },
  tuesday: { isOpen: true, slots: [{ start: '09:00', end: '13:00' }, { start: '15:00', end: '19:00' }] },
  wednesday: { isOpen: true, slots: [{ start: '09:00', end: '13:00' }, { start: '15:00', end: '19:00' }] },
  thursday: { isOpen: true, slots: [{ start: '09:00', end: '13:00' }, { start: '15:00', end: '19:00' }] },
  friday: { isOpen: true, slots: [{ start: '09:00', end: '13:00' }, { start: '15:00', end: '19:00' }] },
  saturday: { isOpen: true, slots: [{ start: '09:00', end: '13:00' }] },
  sunday: { isOpen: false, slots: [] },
};

export const initialData: AppState = {
  specializations: [
    { id: 'ortopedia', name: 'Ortopedia', icon: 'Bone', description: 'Diagnosi e trattamento delle patologie muscolo-scheletriche', isActive: true, createdAt: new Date() },
    { id: 'ginecologia', name: 'Ginecologia', icon: 'Heart', description: 'Salute della donna e ostetricia', isActive: true, createdAt: new Date() },
    { id: 'cardiologia', name: 'Cardiologia', icon: 'HeartPulse', description: 'Prevenzione e cura delle malattie cardiovascolari', isActive: true, createdAt: new Date() },
    { id: 'psichiatria', name: 'Psichiatria', icon: 'Brain', description: 'Salute mentale e benessere psicologico', isActive: true, createdAt: new Date() },
    { id: 'reumatologia', name: 'Reumatologia', icon: 'Hand', description: 'Patologie reumatiche e autoimmuni', isActive: true, createdAt: new Date() },
    { id: 'endocrinologia', name: 'Endocrinologia', icon: 'Activity', description: 'Disturbi ormonali e metabolici', isActive: true, createdAt: new Date() },
    { id: 'medicina-estetica', name: 'Medicina Estetica', icon: 'Sparkles', description: 'Trattamenti estetici e chirurgia plastica', isActive: true, createdAt: new Date() },
    { id: 'allergologia', name: 'Allergologia', icon: 'Flower2', description: 'Diagnosi e cura delle allergie', isActive: true, createdAt: new Date() },
    { id: 'medicina-sport', name: 'Medicina dello Sport', icon: 'Dumbbell', description: 'Certificati e visite sportive', isActive: true, createdAt: new Date() },
    { id: 'chirurgia-vascolare', name: 'Chirurgia Vascolare', icon: 'GitBranch', description: 'Patologie venose e arteriose', isActive: true, createdAt: new Date() },
    { id: 'otorinolaringoiatria', name: 'Otorinolaringoiatria', icon: 'Ear', description: 'Orecchio, naso e gola', isActive: true, createdAt: new Date() },
    { id: 'neurologia', name: 'Neurologia', icon: 'Zap', description: 'Sistema nervoso e patologie neurologiche', isActive: true, createdAt: new Date() },
    { id: 'pneumologia', name: 'Pneumologia', icon: 'Wind', description: 'Apparato respiratorio e polmoni', isActive: true, createdAt: new Date() },
    { id: 'fisiatria', name: 'Fisiatria', icon: 'Accessibility', description: 'Riabilitazione e medicina fisica', isActive: true, createdAt: new Date() },
    { id: 'urologia', name: 'Urologia', icon: 'Stethoscope', description: 'Apparato urinario e genitale maschile', isActive: true, createdAt: new Date() },
    { id: 'ecografia', name: 'Ecografia', icon: 'Monitor', description: 'Diagnostica ecografica avanzata', isActive: true, createdAt: new Date() },
    { id: 'gastroenterologia', name: 'Gastroenterologia', icon: 'Apple', description: 'Apparato digerente e fegato', isActive: true, createdAt: new Date() },
    { id: 'nutrizione', name: 'Nutrizione', icon: 'Salad', description: 'Piani alimentari e diete personalizzate', isActive: true, createdAt: new Date() },
  ],
  doctors: [
    {
      id: 'doc-1',
      name: 'Dr. Marco Rossi',
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
      videoUrl: 'https://www.youtube.com/watch?v=example1',
      bio: 'Specialista in Cardiologia con oltre 15 anni di esperienza. Si occupa di prevenzione cardiovascolare e trattamento delle patologie cardiache.',
      specializations: ['cardiologia'],
      email: 'm.rossi@penitromed.it',
      phone: '+39 0771 123456',
      preferredContact: 'whatsapp',
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: 'doc-2',
      name: 'Dr.ssa Laura Bianchi',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
      videoUrl: 'https://www.youtube.com/watch?v=example2',
      bio: 'Specialista in Ginecologia e Ostetricia. Segue le pazienti dalla prevenzione alla maternità con un approccio empatico e professionale.',
      specializations: ['ginecologia'],
      email: 'l.bianchi@penitromed.it',
      phone: '+39 0771 123456',
      preferredContact: 'whatsapp',
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: 'doc-3',
      name: 'Dr. Giuseppe Verdi',
      photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face',
      videoUrl: '',
      bio: 'Ortopedico specializzato in traumatologia sportiva e chirurgia artroscopica del ginocchio e della spalla.',
      specializations: ['ortopedia', 'medicina-sport'],
      email: 'g.verdi@penitromed.it',
      phone: '+39 0771 123456',
      preferredContact: 'phone',
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: 'doc-4',
      name: 'Dr.ssa Anna Ferrari',
      photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face',
      videoUrl: 'https://www.youtube.com/watch?v=example4',
      bio: 'Medico estetico e chirurgo plastico con formazione internazionale. Specializzata in ringiovanimento del viso e trattamenti mini-invasivi.',
      specializations: ['medicina-estetica'],
      email: 'a.ferrari@penitromed.it',
      phone: '+39 0771 123456',
      preferredContact: 'whatsapp',
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: 'doc-5',
      name: 'Dr. Paolo Marino',
      photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face',
      videoUrl: '',
      bio: 'Neurologo con expertise in cefalee, disturbi del sonno e malattie neurodegenerative. Approccio multidisciplinare alla cura del paziente.',
      specializations: ['neurologia'],
      email: 'p.marino@penitromed.it',
      phone: '+39 0771 123456',
      preferredContact: 'email',
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: 'doc-6',
      name: 'Dr.ssa Elena Conti',
      photo: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop&crop=face',
      videoUrl: 'https://www.youtube.com/watch?v=example6',
      bio: 'Chirurgo vascolare esperta in flebologia e trattamento delle varici. Utilizza tecniche mini-invasive per il massimo comfort del paziente.',
      specializations: ['chirurgia-vascolare'],
      email: 'e.conti@penitromed.it',
      phone: '+39 0771 123456',
      preferredContact: 'whatsapp',
      isActive: true,
      createdAt: new Date(),
    },
  ],
  doctorSchedules: [
    {
      doctorId: 'doc-1',
      weekSchedule: {
        monday: { isOpen: true, slots: [{ start: '09:00', end: '13:00' }] },
        tuesday: { isOpen: false, slots: [] },
        wednesday: { isOpen: true, slots: [{ start: '15:00', end: '19:00' }] },
        thursday: { isOpen: false, slots: [] },
        friday: { isOpen: true, slots: [{ start: '09:00', end: '13:00' }] },
        saturday: { isOpen: false, slots: [] },
        sunday: { isOpen: false, slots: [] },
      },
    },
    {
      doctorId: 'doc-2',
      weekSchedule: {
        monday: { isOpen: false, slots: [] },
        tuesday: { isOpen: true, slots: [{ start: '09:00', end: '13:00' }, { start: '15:00', end: '18:00' }] },
        wednesday: { isOpen: false, slots: [] },
        thursday: { isOpen: true, slots: [{ start: '09:00', end: '13:00' }] },
        friday: { isOpen: false, slots: [] },
        saturday: { isOpen: true, slots: [{ start: '09:00', end: '12:00' }] },
        sunday: { isOpen: false, slots: [] },
      },
    },
    {
      doctorId: 'doc-3',
      weekSchedule: {
        monday: { isOpen: true, slots: [{ start: '14:00', end: '18:00' }] },
        tuesday: { isOpen: true, slots: [{ start: '09:00', end: '13:00' }] },
        wednesday: { isOpen: false, slots: [] },
        thursday: { isOpen: true, slots: [{ start: '14:00', end: '18:00' }] },
        friday: { isOpen: false, slots: [] },
        saturday: { isOpen: false, slots: [] },
        sunday: { isOpen: false, slots: [] },
      },
    },
  ],
  clinicHours: {
    weekSchedule: defaultWeekSchedule,
  },
  contactInfo: {
    phone: '+39 0771 000 000',
    whatsapp: '+39 331 000 0000',
    email: 'info@penitromed.it',
  },
  blogArticles: [
    {
      id: 'blog-1',
      title: 'Prevenzione cardiovascolare: i controlli da fare dopo i 40 anni',
      excerpt: 'Scopri quali esami sono fondamentali per mantenere il cuore in salute e prevenire le malattie cardiovascolari.',
      content: 'La prevenzione cardiovascolare è fondamentale per mantenere una buona qualità di vita...',
      category: 'Cardiologia',
      author: 'Dr. Marco Rossi',
      authorRole: 'Cardiologo',
      image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600&h=400&fit=crop',
      readTime: '5 min',
      publishedAt: new Date('2024-01-15'),
      isPublished: true,
    },
    {
      id: 'blog-2',
      title: 'Alimentazione e salute: consigli per un\'estate in forma',
      excerpt: 'I consigli del nostro nutrizionista per affrontare l\'estate con energia e vitalità.',
      content: 'L\'estate è il momento perfetto per rivedere le proprie abitudini alimentari...',
      category: 'Nutrizione',
      author: 'Dr.ssa Maria Esposito',
      authorRole: 'Nutrizionista',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
      readTime: '4 min',
      publishedAt: new Date('2024-01-10'),
      isPublished: true,
    },
    {
      id: 'blog-3',
      title: 'Mal di schiena: quando consultare l\'ortopedico',
      excerpt: 'Impara a riconoscere i segnali che indicano la necessità di una visita specialistica.',
      content: 'Il mal di schiena è uno dei disturbi più comuni nella popolazione adulta...',
      category: 'Ortopedia',
      author: 'Dr. Giuseppe Verdi',
      authorRole: 'Ortopedico',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
      readTime: '6 min',
      publishedAt: new Date('2024-01-05'),
      isPublished: true,
    },
  ],
};

// Funzione per salvare in localStorage
export const saveToStorage = (data: AppState): void => {
  localStorage.setItem('penitromed_data', JSON.stringify(data));
};

// Funzione per caricare da localStorage
export const loadFromStorage = (): AppState | null => {
  const stored = localStorage.getItem('penitromed_data');
  if (stored) {
    try {
      const data = JSON.parse(stored);
      // Converti le date da stringhe a oggetti Date
      data.specializations = data.specializations.map((s: any) => ({
        ...s,
        createdAt: new Date(s.createdAt),
      }));
      data.doctors = data.doctors.map((d: any) => ({
        ...d,
        createdAt: new Date(d.createdAt),
      }));
      data.blogArticles = data.blogArticles.map((a: any) => ({
        ...a,
        publishedAt: new Date(a.publishedAt),
      }));
      if (!data.contactInfo) {
        data.contactInfo = {
          phone: '+39 0771 000 000',
          whatsapp: '+39 331 000 0000',
          email: 'info@penitromed.it',
        };
      }
      return data;
    } catch {
      return null;
    }
  }
  return null;
};
