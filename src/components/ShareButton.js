import { number, shape } from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const ONE_SEC = 1000;
const copy = require('clipboard-copy');

export default function ShareButton({ index, recipe }) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;

  const handleShareButton = () => {
    if (pathname === '/done-recipes' || pathname === '/favorite-recipes') {
      const url = window.location.href.replace(pathname, '');
      copy(`${url}/${recipe.type}s/${recipe.id}`);
    } else {
      copy(window.location.href.replace('/in-progress', ''));
    }

    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), ONE_SEC);
  };

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

ShareButton.defaultProps = {
  index: null,
  recipe: {},
};

ShareButton.propTypes = {
  index: number,
  recipe: shape({}),
};
