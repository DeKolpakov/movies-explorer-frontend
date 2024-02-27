import React from 'react';

function BurgerButton({onBurgerMenu}) {
  return <button className='burger-button' type='button' onClick={onBurgerMenu} />;
}

export default BurgerButton;
