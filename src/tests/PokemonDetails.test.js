import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

import App from '../App';
// import Data from '../data';

describe('PokemonDetails.js ', () => {
  test(
    'Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela;',
    () => {
      const history = createMemoryHistory();
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );
      const moreDetails = screen.getByText(/More details/);
      userEvent.click(moreDetails);
      const PokemonDetails = screen.getByRole('heading', {
        level: 2,
        name: /Pikachu Details/i,
      });
      expect(PokemonDetails).toBeInTheDocument();
      const PokemonName = screen.getByTestId('pokemon-name');
      expect(PokemonName).toHaveTextContent(
        'Pikachu',
      );
      expect(PokemonName).toBeInTheDocument();
      const PokemonType = screen.getByTestId('pokemonType');
      expect(PokemonType).toHaveTextContent(
        'Electric',
      );
      expect(PokemonType).toBeInTheDocument();
      const PokemonWeight = screen.getByTestId('pokemon-weight');
      expect(PokemonWeight).toHaveTextContent(
        'Average weight: 6.0 kg',
      );
      expect(PokemonWeight).toBeInTheDocument();
      const pokemonSummary = screen.getByRole('heading', {
        level: 2,
        name: 'Summary',
      });
      expect(pokemonSummary).toBeInTheDocument();
      const pokemonSummaryText1 = screen.getByText(
        /This intelligent Pokémon roasts hard berries/i,
      );
      expect(pokemonSummaryText1).toBeInTheDocument();
      const pokemonSummaryText2 = screen.getByText(
        /with electricity to make them tender enough to eat./i,
      );
      expect(pokemonSummaryText2).toBeInTheDocument();
    },
  );
  test(
    'Teste se existe na página uma seção com os mapas contendo as localizações;',
    () => {
      const history = createMemoryHistory();
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );
      const moreDetails = screen.getByText(/More details/);
      userEvent.click(moreDetails);
      const pokemonLocations = screen.getByRole('heading', {
        level: 2,
        name: /Game Locations of Pikachu/i,
      });
      expect(pokemonLocations).toBeInTheDocument();
      const PikachuLocation1 = screen.getByText(/Kanto Viridian Forest/);
      expect(PikachuLocation1).toBeInTheDocument();
      const PikachuLocation2 = screen.getByText(/Kanto Power Plant/);
      expect(PikachuLocation2).toBeInTheDocument();
      const PokemonImage = screen.getAllByRole('img');
      // https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
      expect(PokemonImage[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      expect(PokemonImage[1]).toHaveAttribute('alt', 'Pikachu location');
      expect(PokemonImage[1]).toBeInTheDocument();
      expect(PokemonImage[2]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
      expect(PokemonImage[2]).toHaveAttribute('alt', 'Pikachu location');
      expect(PokemonImage[2]).toBeInTheDocument();
    },
  );
  test(
    'Teste se existe na página uma seção com os mapas contendo as localizações;',
    () => {
      const history = createMemoryHistory();
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );
      const moreDetails = screen.getByText(/More details/);
      userEvent.click(moreDetails);
      const PokemonFavorite = screen.getByRole('checkbox', {
        name: /Pokémon favoritado\?/i,
      });
      expect(PokemonFavorite).toBeInTheDocument();
      userEvent.click(PokemonFavorite);
      const PokemonImage = screen.getAllByRole('img');
      expect(PokemonImage[1]).toHaveAttribute('src', '/star-icon.svg');
      expect(PokemonImage[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
      expect(PokemonImage[1]).toHaveAttribute('class', 'favorite-icon');
      expect(PokemonImage[1]).toBeInTheDocument();
      userEvent.click(PokemonFavorite);
      expect(PokemonImage[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(PokemonImage[0]).toHaveAttribute('alt', 'Pikachu sprite');
      expect(PokemonImage[0]).toBeInTheDocument();
    },
  );
});
