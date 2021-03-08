import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('Test', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText('Home');
  const about = getByText('About');
  const favorite = getByText('Favorite Pokémons');
  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favorite).toBeInTheDocument();
});
