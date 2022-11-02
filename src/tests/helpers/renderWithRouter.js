import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component, route = '/') => {
  const history = createBrowserHistory();
  history.push(route);

  const { ...resources } = render(
    <Router history={ history }>
      {component}
    </Router>,
  );
  return { ...resources, history };
};

export default renderWithRouter;
