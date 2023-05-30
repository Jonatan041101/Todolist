'use client';
import React, { useEffect, useRef, useState } from 'react';
import Modal from './Modal';
import { Note, useBearStore } from '@/store/store';
import { EvtChange } from './AddTask';
import Icons from '@/atoms/icons/Icons';

interface Props {}
type EvtClick = React.MouseEvent<HTMLElement | HTMLButtonElement>;
const colorsInput = ['#9bde32', '#7c36a3', '#f1bb02'];
const COLOR_HOME = '#7c5ff9';
export default function ConfigNote({}: Props) {
  const { note, addNote } = useBearStore((state) => state);
  const refChange = useRef<HTMLSpanElement | null>(null);
  const [configNote, setConfigNote] = useState({
    color: colorsInput[0],
    important: false,
    changeNote: false,
  });
  const [noteState, setNoteState] = useState(note);
  const [newNote, setNewNote] = useState<Note>({
    id: '',
    color: configNote.color,
    category: '',
    important: false,
    note: noteState,
  });
  useEffect(() => {
    if (refChange.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(refChange.current);
      range.collapse(false);
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        refChange.current.focus();
      }
    }
  }, [configNote.changeNote]);
  const changeColor = (color: string) => {
    setNewNote({ ...newNote, color });
    setConfigNote({ ...configNote, color });
  };
  const handleAddNote = (evt: EvtClick) => {
    evt.stopPropagation();
    const id = crypto.randomUUID();
    const newNoteStore: Note = {
      ...newNote,
      id,
      important: configNote.important,
      note: noteState,
    };
    addNote(newNoteStore);
  };
  const handleChangeImportant = (evt: EvtChange) => {
    const { checked } = evt.currentTarget;
    setConfigNote({ ...configNote, important: checked });
  };

  const handleUpdateNote = (evt: EvtClick) => {
    evt.stopPropagation();
    setConfigNote({ ...configNote, changeNote: true });
  };
  const handleChangeNote = (evt: React.ChangeEvent<HTMLSpanElement>) => {
    if (evt.currentTarget.textContent) {
      setNoteState(evt.currentTarget.textContent);
    }
  };
  const handleChangeColor = (evt: EvtClick, color: string) => {
    evt.stopPropagation();
    changeColor(color);
  };
  const handleRemoveFocus = () => {
    setConfigNote({ ...configNote, changeNote: false });
  };

  return (
    <Modal>
      <div className="config" onClick={handleRemoveFocus}>
        <div className="config__text">
          <div className="config__p">
            Nueva nota:{' '}
            <span
              ref={refChange}
              className="config__editable"
              contentEditable={configNote.changeNote}
              onInput={handleChangeNote}
              suppressContentEditableWarning={true}
              style={{
                color: configNote.changeNote ? COLOR_HOME : '#000',
              }}
            >
              {note}
            </span>
          </div>
          <button
            className="config__update"
            onClick={(evt) => handleUpdateNote(evt)}
          >
            <Icons icon="update" />
          </button>
        </div>
        <div className="config__config">
          <div className="config__colors">
            <h3 className="config__h3">Color de la nota:</h3>
            <section className="config__section">
              {colorsInput.map((color) => (
                <article
                  key={color}
                  style={{
                    background: color,
                    borderColor:
                      color === configNote.color ? COLOR_HOME : 'transparent',
                  }}
                  className="config__color"
                  onClick={(evt) => handleChangeColor(evt, color)}
                ></article>
              ))}
            </section>
          </div>
          <div className="config__colors">
            <h3 className="config__important">Importante ?</h3>
            <input
              className="config__check"
              type="checkbox"
              checked={configNote.important}
              onChange={handleChangeImportant}
            />
          </div>
        </div>
        <button
          className="config__newnote"
          onClick={(evt) => handleAddNote(evt)}
        >
          Agregar Nota
        </button>
      </div>
    </Modal>
  );
}
