import React from 'react';

export interface IInputProps {
  changeValue: (e: React.ChangeEvent<HTMLInputElement>) => void,
  id?: string,
  label?: string,
  invalidMessage?: string,
  validate?: (e?: React.ChangeEvent<HTMLInputElement>) => void,
}
