import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Modal({ children }: Props) {
  return <div className="modal">{children}</div>;
}
