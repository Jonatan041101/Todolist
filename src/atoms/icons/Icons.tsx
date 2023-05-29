import React from 'react';
import Add from './Add';
import Delete from './Delete';
import Update from './Update';
import Close from './Close';

type IconType = 'add' | 'delete' | 'update' | 'close';

interface Props {
  icon: IconType;
}

export default function Icons({ icon }: Props) {
  return (
    <i className="icon">
      {icon === 'add' && <Add />}
      {icon === 'delete' && <Delete />}
      {icon === 'update' && <Update />}
      {icon === 'close' && <Close />}
    </i>
  );
}
