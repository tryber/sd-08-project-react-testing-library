import React from 'react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import poke from '../data';

const pokemon = poke[0];

describe('Tests the "Pokemon" component.', () => {
  it('Tests whether a card with Pokémon information is rendered.', () => {
    const { getByText, getAllByRole, getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
    />);
    const pokeName = getByText('Pikachu');
    const pokeType = getByText('Electric');
    const pokeAverage = getByText('Average weight: 6.0 kg');
    const pokeImg = getAllByRole('img')[0].src;
    const imageSource = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const imageAlt = getByAltText('Pikachu sprite');
    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeAverage).toBeInTheDocument();
    expect(pokeImg).toBe(imageSource);
    expect(imageAlt).toBeInTheDocument();
  });

  it('Tests whether the Pokémon card contains a details link.', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
    />);
    const details = getByRole('link', {
      name: 'More details',
    });
    expect(details).toBeInTheDocument();
    expect(details.href).toBe('http://localhost/pokemons/25');
  });

  it('Test if there is a star icon in favorite Pokémon.', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite
    />);
    const star = getByRole('img', {
      name: 'Pikachu is marked as favorite',
    });
    expect(star).toBeInTheDocument();
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
