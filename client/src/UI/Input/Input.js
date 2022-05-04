import React from 'react';
import './Input.css';

const Input = ({ inputChange, inputValue, labelName, isEmail }) => {
  return (
    <div className='form-group Input'>
      <label className='font-weight-bolder'>{labelName}</label>
      <input
        type={isEmail ? 'email' : 'text'}
        className='form-control'
        onChange={inputChange}
        value={inputValue}
      />
    </div>
  );
};

export default Input;
