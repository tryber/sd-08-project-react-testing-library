import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

test('primeiraleva de teste', () => {
  const history = createMemoryHistory();
  const pokemon = pokemons[0];
  render(
    <Router history={ history }>
      <Pokemon pokemon={ pokemon } isFavorite />
    </Router>,
  );
  const pikachutext = screen.getByText('Pikachu');
  expect(pikachutext).toBeInTheDocument();
  const type = screen.getByText('Electric');
  expect(type).toBeInTheDocument();

  const pokemonType = screen.getByTestId('pokemonType');
  expect(pokemonType).toHaveTextContent('Electric');

  const pesoPoke = screen.getByTestId('pokemon-weight');
  expect(pesoPoke).toHaveTextContent('Average weight: 6.0 kg');

  const pokemonImage = screen.getByAltText('Pikachu sprite');
  expect(pokemonImage.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});
test('testedeLinks', () => {
  const history = createMemoryHistory();
  const pokemon = pokemons[0];
  render(
    <Router history={ history }>
      <Pokemon pokemon={ pokemon } isFavorite />
    </Router>,
  );
  const linkText = screen.getByRole('link', {
    name: 'More details',
  });
  expect(linkText).toBeInTheDocument();
  userEvent.click(linkText);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});
test('Testa se existe um ícone de estrela no pokemon favoritado', () => {
  const history = createMemoryHistory();
  const pokemon = pokemons[0];
  render(
    <Router history={ history }>
      <Pokemon pokemon={ pokemon } isFavorite />
    </Router>,
  );

  const star = screen.getByAltText('Pikachu is marked as favorite');
  expect(star).toBeInTheDocument();
  expect(star.src).toContain('star');
});
