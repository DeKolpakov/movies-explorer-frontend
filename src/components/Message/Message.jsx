import React from 'react';

function Message({img}) {
  return (
    <div className='message'>
      <img className='message__image' src={img} alt='Сообщение' />
    </div>
  );
}

export default Message;

/* [
  !isLoading && firstSearch && noSearch,
  notFound && dontFind,
  error && requestError,
  error && pathname === '/savedmovies' && dontSave,
].find(Boolean) */
