import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests the "Pokemon Details" component.', () => {
  it('Tests whether detailed Pokémon information is shown on the screen.', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const details = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);
    const nameDetails = getByRole('heading', {
      leval: 2,
      name: 'Pikachu Details',
    });
    const summary = getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(nameDetails).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(getByText(/roasts hard berries with electricity/i)).toBeInTheDocument();
  });

  it('Tests whether there is a section with location maps', () => {
    const { getByRole, getAllByRole } = renderWithRouter(<App />);
    const details = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);
    const gameText = getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    const image = getAllByRole('img')[1];
    expect(gameText).toBeInTheDocument();
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(image.alt).toBe('Pikachu location');
  });

  it('Tests if the user can favor a pokémon through the details page.', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const details = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);
    const favorite = getByText('Pokémon favoritado?');
    expect(favorite).toBeInTheDocument();
  });
});
