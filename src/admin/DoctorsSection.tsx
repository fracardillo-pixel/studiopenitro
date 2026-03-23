import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Video,
  Phone,
  Mail,
  MessageCircle,
  GripVertical,
  X,
  User,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Doctor } from '../types';

const DoctorsSection: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    videoUrl: '',
    bio: '',
    specializations: [] as string[],
    email: '',
    phone: '',
    preferredContact: 'whatsapp' as 'whatsapp' | 'email' | 'phone',
  });
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const isSearching = searchTerm.trim().length > 0;
  const filteredDoctors = isSearching
    ? state.doctors.filter((doc) => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : state.doctors;

  const handleToggle = (id: string) => dispatch({ type: 'TOGGLE_DOCTOR', payload: id });

  const handleDelete = (id: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo medico?')) {
      dispatch({ type: 'DELETE_DOCTOR', payload: id });
    }
  };

  const openAddModal = () => {
    setEditingDoctor(null);
    setFormData({ name: '', photo: '', videoUrl: '', bio: '', specializations: [], email: '', phone: '', preferredContact: 'whatsapp' });
    setIsModalOpen(true);
  };

  const openEditModal = (doc: Doctor) => {
    setEditingDoctor(doc);
    setFormData({
      name: doc.name, photo: doc.photo, videoUrl: doc.videoUrl || '',
      bio: doc.bio, specializations: doc.specializations,
      email: doc.email || '', phone: doc.phone || '', preferredContact: doc.preferredContact,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDoctor) {
      dispatch({ type: 'UPDATE_DOCTOR', payload: { ...editingDoctor, ...formData } });
    } else {
      dispatch({
        type: 'ADD_DOCTOR',
        payload: { id: `doc-${Date.now()}`, ...formData, isActive: true, createdAt: new Date() },
      });
    }
    setIsModalOpen(false);
  };

  const handleSpecToggle = (specId: string) => {
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.includes(specId)
        ? prev.specializations.filter((s) => s !== specId)
        : [...prev.specializations, specId],
    }));
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'whatsapp': return <MessageCircle size={16} className="text-green-500" />;
      case 'email': return <Mail size={16} className="text-blue-500" />;
      case 'phone': return <Phone size={16} className="text-orange-500" />;
      default: return null;
    }
  };

  // Drag-and-drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIdx: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === dropIdx) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    const reordered = [...state.doctors];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(dropIdx, 0, moved);
    dispatch({ type: 'REORDER_DOCTORS', payload: reordered });
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const activeCount = state.doctors.filter((d) => d.isActive).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Totale Medici</p>
          <p className="text-3xl font-bold text-gray-800">{state.doctors.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Attivi</p>
          <p className="text-3xl font-bold text-green-600">{activeCount}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Con Video</p>
          <p className="text-3xl font-bold text-purple-600">{state.doctors.filter((d) => d.videoUrl).length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cerca medico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>Aggiungi Medico</span>
          </button>
        </div>
        {!isSearching && (
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            <GripVertical size={12} />
            Trascina le card per cambiare l'ordine di visualizzazione
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => {
          const realIndex = state.doctors.findIndex((d) => d.id === doc.id);
          const isDragging = dragIndex === realIndex;
          const isDraggingOver = dragOverIndex === realIndex && dragIndex !== realIndex;
          return (
            <div
              key={doc.id}
              draggable={!isSearching}
              onDragStart={!isSearching ? (e) => handleDragStart(e, realIndex) : undefined}
              onDragOver={!isSearching ? (e) => handleDragOver(e, realIndex) : undefined}
              onDrop={!isSearching ? (e) => handleDrop(e, realIndex) : undefined}
              onDragEnd={!isSearching ? handleDragEnd : undefined}
              className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all ${
                !doc.isActive ? 'opacity-60' : ''
              } ${isDragging ? 'opacity-40 scale-95' : ''} ${
                isDraggingOver ? 'border-blue-400 border-2 shadow-lg' : 'border-gray-100'
              }`}
            >
              <div className="relative">
                {!isSearching && (
                  <div className="absolute top-3 right-3 z-10 cursor-grab active:cursor-grabbing bg-white/80 backdrop-blur-sm rounded-lg p-1.5">
                    <GripVertical size={16} className="text-gray-400" />
                  </div>
                )}
                {doc.photo ? (
                  <img src={doc.photo} alt={doc.name} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <User size={48} className="text-gray-300" />
                  </div>
                )}
                {doc.videoUrl && (
                  <div className="absolute top-3 left-3 bg-purple-500 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                    <Video size={14} />
                    Video
                  </div>
                )}
                <div className="absolute bottom-3 left-3">
                  <button
                    onClick={() => handleToggle(doc.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      doc.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {doc.isActive ? 'Attivo' : 'Disattivato'}
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-800">{doc.name}</h3>
                  {getContactIcon(doc.preferredContact)}
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {doc.specializations.map((specId) => {
                    const spec = state.specializations.find((s) => s.id === specId);
                    return spec ? (
                      <span key={specId} className={`px-2 py-0.5 rounded-full text-xs ${spec.isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                        {spec.name}
                      </span>
                    ) : null;
                  })}
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{doc.bio}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(doc)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Edit2 size={16} />
                    Modifica
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="p-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
          <User size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Nessun medico trovato</p>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingDoctor ? 'Modifica Medico' : 'Nuovo Medico'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Dr. Mario Rossi" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL Foto</label>
                  <input type="url" value={formData.photo} onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL Video Presentazione</label>
                  <input type="url" value={formData.videoUrl} onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://youtube.com/..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="email@esempio.it" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+39 0771 123456" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contatto Preferito</label>
                  <div className="flex gap-4">
                    {(['whatsapp', 'phone', 'email'] as const).map((type) => (
                      <label key={type} className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer ${formData.preferredContact === type ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="preferredContact" value={type} checked={formData.preferredContact === type}
                          onChange={() => setFormData({ ...formData, preferredContact: type })} className="sr-only" />
                        {getContactIcon(type)}
                        <span className="capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specializzazioni</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                    {state.specializations.filter((s) => s.isActive).map((spec) => (
                      <label key={spec.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${formData.specializations.includes(spec.id) ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                        <input type="checkbox" checked={formData.specializations.includes(spec.id)} onChange={() => handleSpecToggle(spec.id)} className="sr-only" />
                        <span className="text-sm">{spec.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Biografia</label>
                  <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4} placeholder="Breve biografia del medico..." required />
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Annulla
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {editingDoctor ? 'Salva Modifiche' : 'Aggiungi Medico'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsSection;
