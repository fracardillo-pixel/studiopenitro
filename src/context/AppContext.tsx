import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, Specialization, Doctor, DoctorSchedule, ClinicHours, BlogArticle, ContactInfo } from '../types';
import { initialData, saveToStorage, loadFromStorage } from '../data/initialData';

// Action types
type Action =
  | { type: 'LOAD_DATA'; payload: AppState }
  | { type: 'ADD_SPECIALIZATION'; payload: Specialization }
  | { type: 'UPDATE_SPECIALIZATION'; payload: Specialization }
  | { type: 'DELETE_SPECIALIZATION'; payload: string }
  | { type: 'TOGGLE_SPECIALIZATION'; payload: string }
  | { type: 'ADD_DOCTOR'; payload: Doctor }
  | { type: 'UPDATE_DOCTOR'; payload: Doctor }
  | { type: 'DELETE_DOCTOR'; payload: string }
  | { type: 'TOGGLE_DOCTOR'; payload: string }
  | { type: 'UPDATE_DOCTOR_SCHEDULE'; payload: DoctorSchedule }
  | { type: 'UPDATE_CLINIC_HOURS'; payload: ClinicHours }
  | { type: 'ADD_BLOG_ARTICLE'; payload: BlogArticle }
  | { type: 'UPDATE_BLOG_ARTICLE'; payload: BlogArticle }
  | { type: 'DELETE_BLOG_ARTICLE'; payload: string }
  | { type: 'TOGGLE_BLOG_ARTICLE'; payload: string }
  | { type: 'UPDATE_CONTACT_INFO'; payload: ContactInfo }
  | { type: 'REORDER_SPECIALIZATIONS'; payload: Specialization[] }
  | { type: 'REORDER_DOCTORS'; payload: Doctor[] };

// Reducer
const appReducer = (state: AppState, action: Action): AppState => {
  let newState: AppState;

  switch (action.type) {
    case 'LOAD_DATA':
      return action.payload;

    case 'ADD_SPECIALIZATION':
      newState = {
        ...state,
        specializations: [...state.specializations, action.payload],
      };
      break;

    case 'UPDATE_SPECIALIZATION':
      newState = {
        ...state,
        specializations: state.specializations.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };
      break;

    case 'DELETE_SPECIALIZATION':
      newState = {
        ...state,
        specializations: state.specializations.filter((s) => s.id !== action.payload),
      };
      break;

    case 'TOGGLE_SPECIALIZATION':
      newState = {
        ...state,
        specializations: state.specializations.map((s) =>
          s.id === action.payload ? { ...s, isActive: !s.isActive } : s
        ),
      };
      break;

    case 'ADD_DOCTOR':
      newState = {
        ...state,
        doctors: [...state.doctors, action.payload],
      };
      break;

    case 'UPDATE_DOCTOR':
      newState = {
        ...state,
        doctors: state.doctors.map((d) =>
          d.id === action.payload.id ? action.payload : d
        ),
      };
      break;

    case 'DELETE_DOCTOR':
      newState = {
        ...state,
        doctors: state.doctors.filter((d) => d.id !== action.payload),
        doctorSchedules: state.doctorSchedules.filter((ds) => ds.doctorId !== action.payload),
      };
      break;

    case 'TOGGLE_DOCTOR':
      newState = {
        ...state,
        doctors: state.doctors.map((d) =>
          d.id === action.payload ? { ...d, isActive: !d.isActive } : d
        ),
      };
      break;

    case 'UPDATE_DOCTOR_SCHEDULE':
      const existingScheduleIndex = state.doctorSchedules.findIndex(
        (ds) => ds.doctorId === action.payload.doctorId
      );
      if (existingScheduleIndex >= 0) {
        newState = {
          ...state,
          doctorSchedules: state.doctorSchedules.map((ds) =>
            ds.doctorId === action.payload.doctorId ? action.payload : ds
          ),
        };
      } else {
        newState = {
          ...state,
          doctorSchedules: [...state.doctorSchedules, action.payload],
        };
      }
      break;

    case 'UPDATE_CLINIC_HOURS':
      newState = {
        ...state,
        clinicHours: action.payload,
      };
      break;

    case 'ADD_BLOG_ARTICLE':
      newState = {
        ...state,
        blogArticles: [...state.blogArticles, action.payload],
      };
      break;

    case 'UPDATE_BLOG_ARTICLE':
      newState = {
        ...state,
        blogArticles: state.blogArticles.map((a) =>
          a.id === action.payload.id ? action.payload : a
        ),
      };
      break;

    case 'DELETE_BLOG_ARTICLE':
      newState = {
        ...state,
        blogArticles: state.blogArticles.filter((a) => a.id !== action.payload),
      };
      break;

    case 'TOGGLE_BLOG_ARTICLE':
      newState = {
        ...state,
        blogArticles: state.blogArticles.map((a) =>
          a.id === action.payload ? { ...a, isPublished: !a.isPublished } : a
        ),
      };
      break;

    case 'UPDATE_CONTACT_INFO':
      newState = {
        ...state,
        contactInfo: action.payload,
      };
      break;

    case 'REORDER_SPECIALIZATIONS':
      newState = {
        ...state,
        specializations: action.payload,
      };
      break;

    case 'REORDER_DOCTORS':
      newState = {
        ...state,
        doctors: action.payload,
      };
      break;

    default:
      return state;
  }

  // Salva automaticamente in localStorage
  saveToStorage(newState);
  return newState;
};

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialData);

  // Carica dati da localStorage al mount
  useEffect(() => {
    const storedData = loadFromStorage();
    if (storedData) {
      dispatch({ type: 'LOAD_DATA', payload: storedData });
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizzato
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
