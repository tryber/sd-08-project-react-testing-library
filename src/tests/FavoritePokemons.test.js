import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test('shows the Favorite Pokemons when the route is `/favorites`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/favorites'] }>
      <FavoritePokemons />
    </MemoryRouter>,
  );

  const text = getByText('No favorite pokemon found');

  expect(text).toBeInTheDocument();
});

test('testing checkbox favorite', () => {
  const { getByText, getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  userEvent.click(getByRole('link', { name: /More details/i }));

  const text = getByText('Pokémon favoritado?');
  expect(text).toBeInTheDocument();

  const checkbox = getByRole('checkbox');
  userEvent.click(checkbox);
  expect(checkbox.checked).toEqual(true);

  const favoriteLink = getByRole('link', { name: /favorite pokémons/i });
  userEvent.click(favoriteLink);
  const containText = getByText(/Average weight/i);
  expect(containText).toBeInTheDocument();
});
