'use client';
import Input from '@/atoms/Input';
import { Note, useBearStore } from '@/store/store';
import React, { useEffect, useState } from 'react';

export type EvtChange = React.ChangeEvent<HTMLInputElement>;
export const NOTES = 'NOTES';
export default function AddTask() {
  const [note, setNote] = useState<string>('');
  const { optionsNote, newNote, updateNote, endLoading } = useBearStore(
    (state) => state
  );
  useEffect(() => {
    const existFile = localStorage.getItem(NOTES);
    if (existFile) {
      const notes = JSON.parse(existFile) as Note[];
      updateNote(notes);
    }
    endLoading();
  }, []);
  const confirmModal = () => {
    if (note.length === 0) return;
    optionsNote();
    newNote(note);
    setNote('');
  };
  const handleChange = (evt: EvtChange) => {
    const { value } = evt.currentTarget;
    setNote(value);
  };
  return (
    <div className="addtask">
      <div className="addtask__container">
        <Input note={note} onChangeText={handleChange} onClick={confirmModal} />
      </div>
    </div>
  );
}
