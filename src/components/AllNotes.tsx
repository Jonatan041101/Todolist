'use client';
import Icons from '@/atoms/icons/Icons';
import { Note, useBearStore } from '@/store/store';
import React, { useEffect, useState } from 'react';
import NoteC from './Note';
import SwitchButton from './SwitchButton';
import Confirm from './Confirm';
interface DeleteMod {
  modal: boolean;
  text: string;
  id: string;
}
const INITIAL_STATE_DELETE: DeleteMod = {
  modal: false,
  text: '',
  id: '',
};
export default function AllNotes() {
  const [important, setImportant] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] =
    useState<DeleteMod>(INITIAL_STATE_DELETE);
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
  const openModalDelete = (id: string, text: string) => {
    setConfirmDelete({
      ...confirmDelete,
      id,
      text,
      modal: true,
    });
  };
  const handleDelete = (id: string) => {
    const filtersNote = allNotes.filter((note) => note.id !== id);
    deleteNote(filtersNote);
    cancelDelete();
  };
  const handleUpdate = (id: string, text: string) => {
    const notes = [...allNotes];
    const note = notes.find((note) => note.id === id);
    if (note) {
      note.note = text;
      updateNote(notes);
    }
  };
  const cancelDelete = () => {
    setConfirmDelete(INITIAL_STATE_DELETE);
  };
  return (
    <>
      {confirmDelete.modal && (
        <Confirm
          text={confirmDelete.text}
          id={confirmDelete.id}
          cancelDelete={cancelDelete}
          deleteNote={handleDelete}
        />
      )}
      <section className="allnotes">
        <div className="allnotes__filter">
          Mostrar notas importantes:
          <SwitchButton move={important} handleMove={filterImportant} />
        </div>
        {allNotesState.map((note) => (
          <NoteC
            key={note.id}
            note={note}
            handleDelete={openModalDelete}
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
    </>
  );
}
