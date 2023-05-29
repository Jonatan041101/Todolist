'use client';
import { useBearStore } from '@/store/store';
import React from 'react';
import ConfigNote from './ConfigNote';

export default function Notes() {
  const { modalOptions } = useBearStore((state) => state);
  return <>{modalOptions && <ConfigNote />}</>;
}
