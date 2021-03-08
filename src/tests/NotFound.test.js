import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Tests the "Not Fund" component.', () => {
  it('Tests if the page contains an h2 with the text "Page requested not found".', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const notFoundText = getByText('Page requested not found');
    expect(notFoundText).toBeInTheDocument();
  });

  it('Tests whether the page shows the image.', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const imageSource = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = getAllByRole('img')[1];
    expect(image.src).toBe(imageSource);
  });
});
