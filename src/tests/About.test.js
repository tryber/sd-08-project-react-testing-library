import React from 'react';
import About from '../components/About';
import renderWithRouter from '../helpers/renderWithRouter';

const paragraph01 = /This application simulates a Pokédex/i;
const paragraph02 = /One can filter Pokémons by type/i;
const imageUrl = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('requirement 02', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText(paragraph01)).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    expect(getByRole('heading', { name: 'About Pokédex', level: 2 })).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText(paragraph01)).toBeInTheDocument();
    expect(getByText(paragraph02)).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const image = getByAltText('Pokédex');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(imageUrl);
  });
});
