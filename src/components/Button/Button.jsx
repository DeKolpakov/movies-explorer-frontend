import React from 'react';

function Button({buttonName, buttonId, additionalClass, onClick, type, disabled}) {
  return (
    <button className={`button ${additionalClass}`}  id={buttonId} onClick={onClick} type={type} disabled={disabled}>
      {buttonName}
    </button>
  );
}

export default Button;
