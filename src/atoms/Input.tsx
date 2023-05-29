import React, { useState } from 'react';
import Icons from './icons/Icons';
import { EvtChange } from '@/components/AddTask';

interface Props {
  note: string;
  onChangeText: (evt: EvtChange) => void;
  onClick: () => void;
}

export default function Input({ note, onChangeText, onClick }: Props) {
  return (
    <div className="input">
      <input
        value={note}
        onChange={onChangeText}
        type="text"
        className="input__input"
        placeholder="Agrega notas..."
      />
      <button className="input__button" onClick={onClick}>
        <Icons icon="add" />
      </button>
    </div>
  );
}
