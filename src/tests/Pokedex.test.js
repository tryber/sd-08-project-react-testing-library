import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: true,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Tests the "Pokedex" component.', () => {
  it('Tests whether the page contains an h2 with the text Encountered Pokémon.', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const encountredPokemonsText = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(encountredPokemonsText).toBeInTheDocument();
  });

  it('Tests whether the next Pokémon is displayed when the button is clicked', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const buttonNext = getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(buttonNext).toBeInTheDocument();
  });

  it('Tests if the Pokédex has the filter buttons.', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const buttonType = getByRole('button', {
      name: 'Electric',
    });
    expect(buttonType).toBeInTheDocument();
  });

  it('Tests if the Pokédex contains a button to reset the filter.', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const buttonAll = getByRole('button', {
      name: 'All',
    });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
  });

  it('Tests whether a filter button is created for each type of Pokémon.', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const totalTypes = 7;
    const buttons = getAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(totalTypes);
  });
});
