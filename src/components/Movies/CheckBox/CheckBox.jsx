import React from 'react';

function CheckBox() {
  return (
    <div className='check-box'>
      <label className='switch'>
        <input className='switch__checkbox' type='checkbox' />
        <span className='switch__slider'></span>
      </label>
      <p className='check-box__name'>Короткометражки</p>
    </div>
  );
}

export default CheckBox;
