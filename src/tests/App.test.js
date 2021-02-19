import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { history } = renderWithRouter(<App />);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const linkHome = getByText('Home');
  const linkAbout = getByText('About');
  const linkFavorite = getByRole('link', {
    name: /favorite pokémons/i,
  });
  expect(linkHome).toBeInTheDocument();
  expect(linkAbout).toBeInTheDocument();
  expect(linkFavorite).toBeInTheDocument();
});

test('a aplicação é direcionada para a página inicial', () => {
  const { history, getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText('Home'));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('a aplicação é direcionada para a página de About', () => {
  const { history, getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText('About'));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
  const { getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText('Favorite Pokémons'));
  expect(getByText('Favorite Pokémons')).toBeInTheDocument();
});

test('a aplicação é redirecionada para a página Not Found', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/rota-desconhecida');
  expect(getByText('Page requested not found')).toBeInTheDocument();
});
