import { number } from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

const ONE_SEC = 1000;
const copy = require('clipboard-copy');

export default function ShareButton({ index }) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleShareButton = () => {
    copy(window.location.href.replace('/in-progress', ''));
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), ONE_SEC);
  };
  console.log(index);
  return (
    <div>
      <button
        type="button"
        onClick={ handleShareButton }
      >
        <img
          src={ shareIcon }
          alt="ícone de compartilhar"
          data-testid={ typeof index === 'number'
            ? `${index}-horizontal-share-btn` : 'share-btn' }
        />
      </button>

      {isLinkCopied && <p>Link copied!</p>}
    </div>
  );
}

ShareButton.propTypes = {
  index: number.isRequired,
};
