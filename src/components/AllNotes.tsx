'use client';
import Icons from '@/atoms/icons/Icons';
import { Note, useBearStore } from '@/store/store';
import React, { useEffect, useState } from 'react';
import NoteC from './Note';
import SwitchButton from './SwitchButton';
export default function AllNotes() {
  const [important, setImportant] = useState<boolean>(false);
  const { allNotes, loading, deleteNote, updateNote } = useBearStore(
    (state) => state
  );
  const [allNotesState, setAllNotesState] = useState<Note[]>(allNotes);
  useEffect(() => {
    setAllNotesState(allNotes);
  }, [allNotes]);
  const filterImportant = () => {
    setImportant(!important);
    if (!important) {
      const notesImportant = allNotes.filter(({ important }) => important);
      setAllNotesState(notesImportant);
      return;
    }
    setAllNotesState(allNotes);
  };
  const handleDelete = (id: string) => {
    const filtersNote = allNotes.filter((note) => note.id !== id);
    deleteNote(filtersNote);
  };
  const handleUpdate = (id: string, text: string) => {
    const notes = [...allNotes];
    const note = notes.find((note) => note.id === id);
    if (note) {
      note.note = text;
      updateNote(notes);
    }
  };
  console.log({ important });

  return (
    <section className="allnotes">
      <div className="allnotes__filter">
        Mostrar notas importantes:
        <SwitchButton move={important} handleMove={filterImportant} />
      </div>
      {allNotesState.map((note) => (
        <NoteC
          key={note.id}
          note={note}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      ))}
      {!loading && (
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {loading && allNotes.length === 0 ? (
        <div className="allnotes__cero">No hay notas agregadas.</div>
      ) : null}
    </section>
  );
}
