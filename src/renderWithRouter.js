//encontrado no site: https://app.betrybe.com/course/front-end/react/tests/rtl-react-router/conteudos/testando-react-router?use_case=side_bar
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{ component }</Router>), history,
  });
};

export default renderWithRouter;