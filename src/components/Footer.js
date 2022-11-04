import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import drinkIcon from '../images/drink-icon.png';
import mealIcon from '../images/meal-icon.png';

export default function Footer() {
  const history = useHistory();
  const { pathname } = history.location;

  return (
    <footer
      data-testid="footer"
      className="mb-20 mt-20 max-w-md relative"
    >
      <div
        className={ `sm:max-w-[27rem] w-full -ml-2 sm:ml-0 fixed bottom-0 bg-purple-800 
        flex justify-around py-2 rounded-xl` }
      >
        <Link to="/meals">
          <img src={ mealIcon } alt="mealIcon" data-testid="meals-bottom-btn" />
        </Link>
        <Link to="/drinks">
          <img src={ drinkIcon } alt="drinkIcon" data-testid="drinks-bottom-btn" />
        </Link>
      </div>

      {pathname === '/profile' && (
        <div className="text-center">
          <p className="mb-2">Desenvolvido por</p>
          <ul className="font-bold">
            <li>Isabela Costa</li>
            <li>Patricia Pedroso</li>
            <li>Rafael Bechstedt</li>
            <li>Renan Munhoes</li>
            <li>Vinicius Bortoletto</li>
          </ul>
        </div>
      )}

    </footer>
  );
}
