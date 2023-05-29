import { NOTES } from '@/components/AddTask';
import { create, StateCreator } from 'zustand';

export interface Note {
  id: string;
  note: string;
  important: boolean;
  category: string;
  color: string;
}

interface TodoApp {
  note: string;
  allNotes: Note[];
  modalOptions: boolean;
  loading: boolean;
  newNote: (note: string) => void;
  addNote: (note: Note) => void;
  optionsNote: () => void;
  deleteNote: (note: Note[]) => void;
  updateNote: (note: Note[]) => void;
  endLoading: () => void;
}

const sliceNotes: StateCreator<TodoApp> = (set) => ({
  note: '',
  allNotes: [],
  modalOptions: false,
  loading: false,
  endLoading: () => {
    set((state) => ({ ...state, loading: true }));
  },
  newNote: (note: string) => {
    set((state) => ({ ...state, note }));
  },
  addNote: (note) => {
    set((state) => {
      localStorage.setItem(NOTES, JSON.stringify([...state.allNotes, note]));
      return {
        ...state,
        allNotes: [...state.allNotes, note],
        modalOptions: !state.modalOptions,
      };
    });
  },
  optionsNote: () => {
    set((state) => ({ ...state, modalOptions: !state.modalOptions }));
  },
  deleteNote: (notes) => {
    localStorage.setItem(NOTES, JSON.stringify([...notes]));
    set((state) => {
      return { ...state, allNotes: notes };
    });
  },
  updateNote: (notes) => {
    localStorage.setItem(NOTES, JSON.stringify([...notes]));
    set((state) => ({ ...state, allNotes: notes }));
  },
});

export const useBearStore = create<TodoApp>((...set) => ({
  ...sliceNotes(...set),
}));
