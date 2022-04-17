import React from 'react';
import { IInputProps } from '../../Domains/Components/Input';
import './Input.scss';

export function Input(props: IInputProps) {
  return (
    <div className="input__wrapper">
      {props.label ? <label htmlFor={props.id}>{props.label}</label> : ''}
      <input
        id={props.id ? props.id : ''}
        type="text"
        className={`input ${props.invalidMessage ? 'error' : ''}`}
        onBlur={e => props.validate ? props.validate(e) : ''}
        onChange={e => props.changeValue(e)}
      />
      <div
        className={`error-message ${!props.invalidMessage ? 'hide' : ''}`}
      >
        {props.invalidMessage}
      </div>
    </div>
  )
}
