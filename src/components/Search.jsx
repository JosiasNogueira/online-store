import React from 'react';
import { NavLink } from 'react-router-dom';

class Search extends React.Component {
  render() {
    return (
      <>
        <div>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>

        <nav>
          <NavLink to="/cart" data-testid="shopping-cart-button">Pesquisar</NavLink>
        </nav>
      </>

    );
  }
}

export default Search;
