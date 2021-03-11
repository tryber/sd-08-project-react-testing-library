import React from 'react';
import { Router } from 'react-router-dom';

import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('the page contains a heading with the text Encountered pokémons', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const pokedexHeading = screen.getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(pokedexHeading).toBeInTheDocument();
});

test('the next pokemon is shown when clicking Próximo pokémon', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const pokemonId = 'pokemon-name';
  const initialPokemon = screen.getByTestId(pokemonId).textContent;
  expect(initialPokemon).toBe('Pikachu');

  const nextButton = screen.getByRole('button', {
    name: /Próximo pokémon/i,
  });
  userEvent.click(nextButton);

  const nextPokemon = screen.getByTestId(pokemonId).textContent;
  expect(nextPokemon).toBe('Charmander');

  const pokemonCards = screen.getAllByTestId(pokemonId).length;
  expect(pokemonCards).toBe(1);

  const pokedexHeading = screen.getByText(/Encountered pokémons/i);
  expect(pokedexHeading).toBeInTheDocument();
});
