import { Link, useHistory } from 'react-router-dom';
import { shape, number } from 'prop-types';
import { useContext } from 'react';
import ShareButton from './ShareButton';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { RecipesContext } from '../contexts/RecipesContext';

function SimpleCard({ recipe, index }) {
  const { setFavoriteRecipes } = useContext(RecipesContext);
  const history = useHistory();
  const { pathname } = history.location;

  const handleFavoriteButton = (id) => {
    const localFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newLocalFavoriteRecipes = localFavoriteRecipes.filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newLocalFavoriteRecipes));
    setFavoriteRecipes(newLocalFavoriteRecipes);
  };

  return (
    <div>
      <div>
        <Link to={ `/${recipe.type}s/${recipe.id}` }>

          <img
            src={ recipe.image }
            alt="Imagem da receita"
            data-testid={ `${index}-horizontal-image` }
            width="300px"
          />
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>

        </Link>
      </div>

      <p data-testid={ `${index}-horizontal-top-text` }>{recipe.type}</p>

      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${recipe.nationality} - ${recipe.category}`}
      </p>

      {pathname === '/done-recipes' && (
        <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
      )}

      <p data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot}</p>

      <ShareButton index={ index } recipe={ recipe } />

      {pathname === '/favorite-recipes' && (
        <button
          type="button"
          onClick={ () => handleFavoriteButton(recipe.id) }
        >
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            alt="ícone de favoritar"
          />
        </button>
      )}

      {pathname === '/done-recipes' && (
        <>
          <p data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }>
            {recipe.tags[0]}
          </p>
          <p data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }>
            {recipe.tags[1]}
          </p>
        </>
      )}

    </div>
  );
}

SimpleCard.propTypes = {
  recipe: shape({}).isRequired,
  index: number.isRequired,
};

export default SimpleCard;
