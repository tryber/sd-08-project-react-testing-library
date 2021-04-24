import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);

  const text = getByRole('heading', {
    level: 2,
    name: 'Encountered pokémons',
  });

  expect(text).toBeInTheDocument();
});

describe('Ao clicar no botão "Proximo pokemon"', () => {
  const btnName = 'Próximo pokémon';
  it('O botão deve conter o texto Próximo pokémon".', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnNext = getByText(btnName);
    expect(btnNext).toBeInTheDocument();
  });
  it('Os Pokémons devem ser mostrados, ao clicar sucessivamente no botão.', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnNext = getByText(btnName);
    expect(getByText(/pikachu/i)).toBeInTheDocument();
    userEvent.click(btnNext);
    expect(getByText(/charmander/i)).toBeInTheDocument();
  });
  it('O primeiro Pokémon deve ser mostrado após o último Pokémon da lista.', () => {
    const { getByText } = renderWithRouter(<App />);
    const totalPokemons = 8;
    const btnNext = getByText('Próximo pokémon');
    for (let i = 1; i <= totalPokemons; i += 1) {
      userEvent.click(btnNext);
    }
    expect(getByText(/Dragonair/i)).toBeInTheDocument();
    userEvent.click(btnNext);
    expect(getByText(/pikachu/i)).toBeInTheDocument();
  });
  it('Os botões de filtro devem estar presentes', () => {
    const { getAllByTestId, getByRole } = renderWithRouter(<App />);
    const buttons = getAllByTestId('pokemon-type-button');
    const types = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    expect(buttons.length).toBe(types.length);
    types.forEach((type) => {
      expect(getByRole('button', { name: type })).toBeInTheDocument();
    });
  });
  test('O botão limpar filtro deve estar presente', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const clearFilter = getByRole('button', { name: /all/i });
    expect(clearFilter).toBeInTheDocument();
    expect(clearFilter).toHaveTextContent('All');
    userEvent.click(clearFilter);
    expect(getByText(/pikachu/i)).toBeInTheDocument();
  });
});
