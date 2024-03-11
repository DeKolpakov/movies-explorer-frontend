import React from 'react';

function Message({img}) {
  return (
    <div className='message'>
      <img className='message__image' src={img} alt='Сообщение' />
    </div>
  );
}

export default Message;
