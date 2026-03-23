import React, { useState } from 'react';
import {
  Clock,
  Plus,
  Trash2,
  Save,
  Building2,
  User,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { WeekSchedule, TimeSlot } from '../types';

const dayNames: Record<keyof WeekSchedule, string> = {
  monday: 'Lunedì',
  tuesday: 'Martedì',
  wednesday: 'Mercoledì',
  thursday: 'Giovedì',
  friday: 'Venerdì',
  saturday: 'Sabato',
  sunday: 'Domenica',
};

const dayOrder: (keyof WeekSchedule)[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const ScheduleSection: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [activeTab, setActiveTab] = useState<'clinic' | 'doctors'>('clinic');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(
    state.doctors[0]?.id || null
  );
  const [clinicSchedule, setClinicSchedule] = useState<WeekSchedule>(
    state.clinicHours.weekSchedule
  );
  const [doctorSchedule, setDoctorSchedule] = useState<WeekSchedule | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Carica l'orario del medico selezionato
  React.useEffect(() => {
    if (selectedDoctorId) {
      const existing = state.doctorSchedules.find(
        (ds) => ds.doctorId === selectedDoctorId
      );
      if (existing) {
        setDoctorSchedule(existing.weekSchedule);
      } else {
        // Crea un orario vuoto
        setDoctorSchedule({
          monday: { isOpen: false, slots: [] },
          tuesday: { isOpen: false, slots: [] },
          wednesday: { isOpen: false, slots: [] },
          thursday: { isOpen: false, slots: [] },
          friday: { isOpen: false, slots: [] },
          saturday: { isOpen: false, slots: [] },
          sunday: { isOpen: false, slots: [] },
        });
      }
    }
  }, [selectedDoctorId, state.doctorSchedules]);

  const handleDayToggle = (
    day: keyof WeekSchedule,
    isClinic: boolean
  ) => {
    if (isClinic) {
      setClinicSchedule((prev) => ({
        ...prev,
        [day]: {
          ...prev[day],
          isOpen: !prev[day].isOpen,
          slots: !prev[day].isOpen ? [{ start: '09:00', end: '13:00' }] : [],
        },
      }));
    } else if (doctorSchedule) {
      setDoctorSchedule((prev) =>
        prev
          ? {
              ...prev,
              [day]: {
                ...prev[day],
                isOpen: !prev[day].isOpen,
                slots: !prev[day].isOpen ? [{ start: '09:00', end: '13:00' }] : [],
              },
            }
          : null
      );
    }
    setHasChanges(true);
  };

  const handleSlotChange = (
    day: keyof WeekSchedule,
    slotIndex: number,
    field: 'start' | 'end',
    value: string,
    isClinic: boolean
  ) => {
    if (isClinic) {
      setClinicSchedule((prev) => ({
        ...prev,
        [day]: {
          ...prev[day],
          slots: prev[day].slots.map((slot, i) =>
            i === slotIndex ? { ...slot, [field]: value } : slot
          ),
        },
      }));
    } else if (doctorSchedule) {
      setDoctorSchedule((prev) =>
        prev
          ? {
              ...prev,
              [day]: {
                ...prev[day],
                slots: prev[day].slots.map((slot, i) =>
                  i === slotIndex ? { ...slot, [field]: value } : slot
                ),
              },
            }
          : null
      );
    }
    setHasChanges(true);
  };

  const addSlot = (day: keyof WeekSchedule, isClinic: boolean) => {
    const newSlot: TimeSlot = { start: '15:00', end: '19:00' };
    if (isClinic) {
      setClinicSchedule((prev) => ({
        ...prev,
        [day]: {
          ...prev[day],
          slots: [...prev[day].slots, newSlot],
        },
      }));
    } else if (doctorSchedule) {
      setDoctorSchedule((prev) =>
        prev
          ? {
              ...prev,
              [day]: {
                ...prev[day],
                slots: [...prev[day].slots, newSlot],
              },
            }
          : null
      );
    }
    setHasChanges(true);
  };

  const removeSlot = (
    day: keyof WeekSchedule,
    slotIndex: number,
    isClinic: boolean
  ) => {
    if (isClinic) {
      setClinicSchedule((prev) => ({
        ...prev,
        [day]: {
          ...prev[day],
          slots: prev[day].slots.filter((_, i) => i !== slotIndex),
        },
      }));
    } else if (doctorSchedule) {
      setDoctorSchedule((prev) =>
        prev
          ? {
              ...prev,
              [day]: {
                ...prev[day],
                slots: prev[day].slots.filter((_, i) => i !== slotIndex),
              },
            }
          : null
      );
    }
    setHasChanges(true);
  };

  const saveClinicHours = () => {
    dispatch({
      type: 'UPDATE_CLINIC_HOURS',
      payload: { weekSchedule: clinicSchedule },
    });
    setHasChanges(false);
  };

  const saveDoctorSchedule = () => {
    if (selectedDoctorId && doctorSchedule) {
      dispatch({
        type: 'UPDATE_DOCTOR_SCHEDULE',
        payload: {
          doctorId: selectedDoctorId,
          weekSchedule: doctorSchedule,
        },
      });
      setHasChanges(false);
    }
  };

  const renderScheduleEditor = (
    schedule: WeekSchedule,
    isClinic: boolean
  ) => (
    <div className="space-y-4">
      {dayOrder.map((day) => (
        <div
          key={day}
          className={`p-4 rounded-xl border ${
            schedule[day].isOpen
              ? 'border-green-200 bg-green-50'
              : 'border-gray-200 bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleDayToggle(day, isClinic)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  schedule[day].isOpen ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    schedule[day].isOpen ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
              <span className="font-medium text-gray-800">{dayNames[day]}</span>
            </div>
            {schedule[day].isOpen && (
              <button
                onClick={() => addSlot(day, isClinic)}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <Plus size={16} />
                Aggiungi fascia
              </button>
            )}
          </div>

          {schedule[day].isOpen && schedule[day].slots.length > 0 && (
            <div className="space-y-2 ml-12">
              {schedule[day].slots.map((slot, slotIndex) => (
                <div key={slotIndex} className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-400" />
                  <input
                    type="time"
                    value={slot.start}
                    onChange={(e) =>
                      handleSlotChange(day, slotIndex, 'start', e.target.value, isClinic)
                    }
                    className="px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="time"
                    value={slot.end}
                    onChange={(e) =>
                      handleSlotChange(day, slotIndex, 'end', e.target.value, isClinic)
                    }
                    className="px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {schedule[day].slots.length > 1 && (
                    <button
                      onClick={() => removeSlot(day, slotIndex, isClinic)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {schedule[day].isOpen && schedule[day].slots.length === 0 && (
            <p className="text-sm text-gray-500 ml-12">
              Nessuna fascia oraria definita
            </p>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-xl p-1 shadow-sm border border-gray-100 inline-flex">
        <button
          onClick={() => setActiveTab('clinic')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'clinic'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Building2 size={20} />
          Orari Poliambulatorio
        </button>
        <button
          onClick={() => setActiveTab('doctors')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'doctors'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <User size={20} />
          Orari Medici
        </button>
      </div>

      {/* Contenuto Tab */}
      {activeTab === 'clinic' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Orari di Apertura del Poliambulatorio
              </h3>
              <p className="text-sm text-gray-500">
                Definisci gli orari generali di apertura della struttura
              </p>
            </div>
            <button
              onClick={saveClinicHours}
              disabled={!hasChanges}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                hasChanges
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Save size={18} />
              Salva Modifiche
            </button>
          </div>

          {renderScheduleEditor(clinicSchedule, true)}
        </div>
      )}

      {activeTab === 'doctors' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Lista medici */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h4 className="font-medium text-gray-800 mb-4">Seleziona Medico</h4>
            <div className="space-y-2">
              {state.doctors
                .filter((d) => d.isActive)
                .map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoctorId(doc.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      selectedDoctorId === doc.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    {doc.photo ? (
                      <img
                        src={doc.photo}
                        alt={doc.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <User size={20} className="text-gray-400" />
                      </div>
                    )}
                    <div className="text-left">
                      <p className="font-medium text-sm">{doc.name}</p>
                      <p className="text-xs text-gray-500">
                        {doc.specializations
                          .map(
                            (sId) =>
                              state.specializations.find((s) => s.id === sId)?.name
                          )
                          .filter(Boolean)
                          .slice(0, 2)
                          .join(', ')}
                      </p>
                    </div>
                  </button>
                ))}
            </div>
          </div>

          {/* Editor orari medico */}
          <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            {selectedDoctorId && doctorSchedule ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Disponibilità di{' '}
                      {state.doctors.find((d) => d.id === selectedDoctorId)?.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Definisci i giorni e gli orari in cui il medico è disponibile
                    </p>
                  </div>
                  <button
                    onClick={saveDoctorSchedule}
                    disabled={!hasChanges}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      hasChanges
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Save size={18} />
                    Salva
                  </button>
                </div>

                {renderScheduleEditor(doctorSchedule, false)}
              </>
            ) : (
              <div className="text-center py-12">
                <User size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">
                  Seleziona un medico per modificare i suoi orari
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleSection;
