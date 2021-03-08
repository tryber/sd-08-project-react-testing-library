import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Tests the "Favorite Pokémons" component', () => {
  it('Tests if the person does not have favorite Pokémon.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const message = getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });
});
