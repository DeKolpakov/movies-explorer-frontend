import React from 'react';
import {useLocation} from 'react-router-dom';

import noSearch from '../../images/firstSearch.png';
import dontFind from '../../images/dontFind.png';
import dontSave from '../../images/dontSave.png';
import requestError from '../../images/requestError.png';

function Message({isLoading, firstSearch, notFound, error}) {
  const {pathname} = useLocation();
  return (
    <div className='message'>
      <img
        className='message__image'
        src={[
          !isLoading && firstSearch && noSearch,
          notFound && dontFind,
          error && requestError,
          error && pathname === '/savedmovies' && dontSave,
        ].find(Boolean)}
        alt='#'
      />
    </div>
  );
}

export default Message;

