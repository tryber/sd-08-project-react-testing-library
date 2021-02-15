import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Req 4 - Not Found Test', () => {
  test('1 - Shows h2 with text', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/blablabla');

    const h2 = getByRole('heading', { level: 2 });
    expect(h2.textContent).toBe('Page requested not found 😭 ');
  });
  test('1 - Shows GIF', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    history.push('/blablabla');
    const img = getAllByRole('img')[1];
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
