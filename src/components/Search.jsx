import React from 'react';
import { NavLink } from 'react-router-dom';
import { getCategories } from '../services/api';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      category: [],
    };
  }

  async componentDidMount() {
    const newRequest = await getCategories();
    this.setState({ category: newRequest });
    console.log(newRequest);
  }

  render() {
    const { category } = this.state;
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
        <div>
          { category.map((element, index) => (
            <label htmlFor={ element.id } data-testid="category" key={ index }>
              { element.name }
              <input
                type="radio"
                value={ element.name }
                id={ element.id }
              />

            </label>
          )) }
        </div>
      </>

    );
  }
}

export default Search;
