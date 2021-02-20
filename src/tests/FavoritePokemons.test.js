import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Testando arquivo de Pokemons favoritos', () => {
  it('Teste msg `No favorite pokemon found`, caso não existam pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const notFound = screen.getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  it('Teste se são exibidos os cards de pokémons favoritados', () => {
    const favoritePokemons = [pokemons[0], pokemons[2]];
    renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );
    favoritePokemons.forEach((favorite) => {
      expect(screen.getByText(favorite.name)).toBeInTheDocument();
    });
  });

  it('Teste se nenhum card de pokémon é exibido, se nenhum estiver favoritado', () => {
    const favoritePokemons = [pokemons[0], pokemons[2]];
    const notFavoritePokemons = [pokemons[1], pokemons[3]];
    renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );
    notFavoritePokemons.forEach((notFavorite) => {
      expect(screen.queryByText(notFavorite.name)).not.toBeInTheDocument();
    });
  });
});
