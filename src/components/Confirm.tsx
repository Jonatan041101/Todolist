import React from 'react';
import Modal from './Modal';

interface Props {
  id: string;
  text: string;
  deleteNote: (id: string) => void;
  cancelDelete: () => void;
}

export default function Confirm({ cancelDelete, deleteNote, text, id }: Props) {
  return (
    <Modal>
      <section className="delete">
        <p>Esta seguro de eliminar la nota: {text}</p>
        <div className="delete__buttons">
          <button className="delete__si" onClick={() => deleteNote(id)}>
            SI
          </button>
          <button className="delete__no" onClick={cancelDelete}>
            NO
          </button>
        </div>
      </section>
    </Modal>
  );
}
