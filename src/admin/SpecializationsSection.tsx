import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Bone,
  Heart,
  HeartPulse,
  Brain,
  Hand,
  Activity,
  Sparkles,
  Flower2,
  Dumbbell,
  GitBranch,
  Ear,
  Zap,
  Wind,
  Accessibility,
  Stethoscope,
  Monitor,
  Apple,
  Salad,
  Eye,
  Pill,
  Syringe,
  Baby,
  Thermometer,
  GripVertical,
  X,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Specialization } from '../types';

const iconMap: Record<string, React.ElementType> = {
  Bone, Heart, HeartPulse, Brain, Hand, Activity, Sparkles, Flower2, Dumbbell,
  GitBranch, Ear, Zap, Wind, Accessibility, Stethoscope, Monitor, Apple,
  Salad, Eye, Pill, Syringe, Baby, Thermometer,
};

const iconOptions = Object.keys(iconMap);

const SpecializationsSection: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpec, setEditingSpec] = useState<Specialization | null>(null);
  const [formData, setFormData] = useState({ name: '', icon: 'Stethoscope', description: '' });
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const isSearching = searchTerm.trim().length > 0;
  const filteredSpecs = isSearching
    ? state.specializations.filter((spec) =>
        spec.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : state.specializations;

  const handleToggle = (id: string) => dispatch({ type: 'TOGGLE_SPECIALIZATION', payload: id });

  const handleDelete = (id: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questa specializzazione?')) {
      dispatch({ type: 'DELETE_SPECIALIZATION', payload: id });
    }
  };

  const openAddModal = () => {
    setEditingSpec(null);
    setFormData({ name: '', icon: 'Stethoscope', description: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (spec: Specialization) => {
    setEditingSpec(spec);
    setFormData({ name: spec.name, icon: spec.icon, description: spec.description });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSpec) {
      dispatch({ type: 'UPDATE_SPECIALIZATION', payload: { ...editingSpec, ...formData } });
    } else {
      dispatch({
        type: 'ADD_SPECIALIZATION',
        payload: {
          id: formData.name.toLowerCase().replace(/\s+/g, '-'),
          ...formData,
          isActive: true,
          createdAt: new Date(),
        },
      });
    }
    setIsModalOpen(false);
  };

  const renderIcon = (iconName: string, size: number = 24) => {
    const IconComponent = iconMap[iconName] || Stethoscope;
    return <IconComponent size={size} />;
  };

  // Drag-and-drop handlers (only when not filtering)
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
    const reordered = [...state.specializations];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(dropIdx, 0, moved);
    dispatch({ type: 'REORDER_SPECIALIZATIONS', payload: reordered });
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const activeCount = state.specializations.filter((s) => s.isActive).length;
  const inactiveCount = state.specializations.length - activeCount;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Totale Specializzazioni</p>
          <p className="text-3xl font-bold text-gray-800">{state.specializations.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Attive</p>
          <p className="text-3xl font-bold text-green-600">{activeCount}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Disattivate</p>
          <p className="text-3xl font-bold text-orange-500">{inactiveCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cerca specializzazione..."
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
            <span>Aggiungi Specializzazione</span>
          </button>
        </div>
        {!isSearching && (
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            <GripVertical size={12} />
            Trascina le righe per cambiare l'ordine di visualizzazione
          </p>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {!isSearching && <th className="w-10 px-4 py-4"></th>}
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Specializzazione</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 hidden md:table-cell">Descrizione</th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Stato</th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSpecs.map((spec, index) => {
                const realIndex = state.specializations.findIndex((s) => s.id === spec.id);
                const isDraggingOver = dragOverIndex === realIndex && dragIndex !== realIndex;
                return (
                  <tr
                    key={spec.id}
                    draggable={!isSearching}
                    onDragStart={!isSearching ? (e) => handleDragStart(e, realIndex) : undefined}
                    onDragOver={!isSearching ? (e) => handleDragOver(e, realIndex) : undefined}
                    onDrop={!isSearching ? (e) => handleDrop(e, realIndex) : undefined}
                    onDragEnd={!isSearching ? handleDragEnd : undefined}
                    className={`hover:bg-gray-50 transition-colors ${!spec.isActive ? 'opacity-60' : ''} ${
                      dragIndex === realIndex ? 'opacity-40' : ''
                    } ${isDraggingOver ? 'border-t-2 border-blue-400' : ''}`}
                  >
                    {!isSearching && (
                      <td className="px-4 py-4 cursor-grab active:cursor-grabbing">
                        <GripVertical size={18} className="text-gray-300 hover:text-gray-500 transition-colors" />
                      </td>
                    )}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${spec.isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                          {renderIcon(spec.icon, 20)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{spec.name}</p>
                          <p className="text-xs text-gray-400 md:hidden">{spec.description.slice(0, 40)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{spec.description}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleToggle(spec.id)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${spec.isActive ? 'bg-green-500' : 'bg-gray-300'}`}
                        >
                          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${spec.isActive ? 'left-7' : 'left-1'}`} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openEditModal(spec)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Modifica">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(spec.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Elimina">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredSpecs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nessuna specializzazione trovata</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingSpec ? 'Modifica Specializzazione' : 'Nuova Specializzazione'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome Specializzazione</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="es. Cardiologia"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icona</label>
                <div className="grid grid-cols-6 gap-2">
                  {iconOptions.map((iconName) => (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon: iconName })}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        formData.icon === iconName ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-gray-300 text-gray-500'
                      }`}
                    >
                      {renderIcon(iconName, 20)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrizione</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Breve descrizione della specializzazione..."
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Annulla
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {editingSpec ? 'Salva Modifiche' : 'Aggiungi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecializationsSection;
