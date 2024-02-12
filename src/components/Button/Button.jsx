import React from 'react';

function Button({buttonName, buttonId, additionalClass, disabled}) {
  return (
    <button className={`button ${additionalClass}`} disabled={disabled} id={buttonId} type='submit'>
      {buttonName}
    </button>
  );
}

export default Button;
