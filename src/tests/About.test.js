import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Tests the "About" component.', () => {
  it('Tests if the page contains an h2 with the text "About Pokédex".', () => {
    const { getByText } = renderWithRouter(<About />);
    const titleAbout = getByText('About Pokédex');
    expect(titleAbout).toBeInTheDocument();
  });

  it('Tests whether the page contains the following image of a Pokédex.', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imageSource = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = getByRole('img');
    expect(image.src).toBe(imageSource);
  });
});
