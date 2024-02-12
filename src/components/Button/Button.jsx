import React from 'react';

function Button({buttonName, buttonId}) {
  return (
    <button className='button button_active' id={buttonId} type='submit' disabled>
      {buttonName}
    </button>
  );
}

export default Button;
