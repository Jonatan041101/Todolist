'use client';
import Icons from '@/atoms/icons/Icons';
import { Note } from '@/store/store';
import React, { useEffect, useRef, useState } from 'react';
import { EvtChange } from './AddTask';

interface Props {
  note: Note;
  handleDelete: (id: string, text: string) => void;
  handleUpdate: (id: string, text: string) => void;
}

export default function Note({ handleDelete, note, handleUpdate }: Props) {
  const [change, setChange] = useState<boolean>(false);
  const [text, setText] = useState<string>(note.note);
  const textRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (change && textRef.current) {
      textRef.current.focus();
    }
  }, [change]);
  const handleChange = (evt: EvtChange) => {
    const { value } = evt.currentTarget;
    setText(value);
  };
  const handleUpdateText = () => {
    setChange(!change);
  };
  const handleTextUpdate = () => {
    handleUpdate(note.id, text);
    setChange(!change);
  };
  return (
    <article key={note.id} className="allnotes__article">
      <div
        className="allnotes__color"
        style={{ backgroundColor: note.color }}
      />
      {change ? (
        <div className="allnotes__up">
          <input
            className="allnotes__p"
            value={text}
            onChange={handleChange}
            ref={textRef}
          />
          <button className="btn allnotes__add" onClick={handleTextUpdate}>
            <Icons icon="add" />
          </button>
          <button className="btn allnotes__close" onClick={handleUpdateText}>
            <Icons icon="close" />
          </button>
        </div>
      ) : (
        <p className="allnotes__p">{text}</p>
      )}
      {!change && (
        <div className="allnotes__buttons">
          <button
            className="btn allnotes__delete"
            onClick={() => handleDelete(note.id, note.note)}
          >
            <Icons icon="delete" />
          </button>
          <button className="btn allnotes__update" onClick={handleUpdateText}>
            <Icons icon="update" />
          </button>
        </div>
      )}
    </article>
  );
}
