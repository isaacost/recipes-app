import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

const ONE_SEC = 1000;
const copy = require('clipboard-copy');

export default function ShareButton() {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleShareButton = () => {
    copy(window.location.href.replace('/in-progress', ''));
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), ONE_SEC);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShareButton }
      >
        <img src={ shareIcon } alt="ícone de compartilhar" />
      </button>

      {isLinkCopied && <p>Link copied!</p>}
    </div>
  );
}
