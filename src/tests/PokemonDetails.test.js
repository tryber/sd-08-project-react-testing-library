import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';

describe('Testando o componente <PokemonDetails />', () => {
  it('Testando informações detalhadas do pokemon selecionado', () => {
    const history = createMemoryHistory();
    const { getByText, getByLabelText, getByAltText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    fireEvent.click(getByText(/More details/i));
    expect(getByText('Pikachu Details')).toBeInTheDocument();

    const textSummary = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    const description = screen.getByText(/berries with electricity/i);
    expect(description).toBeInTheDocument();
    expect(textSummary).toBeInTheDocument();

    const textGameLocations = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    expect(textGameLocations).toBeInTheDocument();

    const img = screen.getAllByRole('img');
    const location = img[1];
    const srcImg = 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const altImg = 'Pikachu location';

    expect(location.src).toBe(srcImg);
    expect(location.alt).toBe(altImg);
    expect(location).toBeDefined();

    fireEvent.click(getByLabelText(/Pokémon favoritado/i));
    const image = getByAltText('Pikachu is marked as favorite');
    expect(image.src).toContain('/star-icon.svg');
  });
});
