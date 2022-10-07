import React from 'react';
import { NavLink } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      category: [],
      query: '',
      products: [],
      toggle: false,
    };
  }

  async componentDidMount() {
    const newRequest = await getCategories();
    this.setState({ category: newRequest });
  }

  onInputChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { query } = this.state;
    const request = await getProductsFromCategoryAndQuery(null, query);
    if (request.results.length === 0) {
      this.setState({
        toggle: true,
      });
    } else {
      console.log(request.results);
      this.setState({
        products: request.results,
        toggle: false,
      });
    }
  };

  render() {
    const { category, query, products, toggle } = this.state;
    return (
      <>
        <nav>
          <NavLink to="/cart" data-testid="shopping-cart-button">Pesquisar</NavLink>
        </nav>
        <div>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>

        <div>
          { category.map((element, index) => (
            <label htmlFor={ element.id } data-testid="category" key={ index }>
              <input
                type="radio"
                value={ element.name }
                id={ element.id }
              />
              { element.name }
            </label>
          )) }
        </div>
        <div>
          <label htmlFor="query">
            <input
              type="text"
              name="query"
              id="query"
              value={ query }
              onChange={ this.onInputChange }
              data-testid="query-input"
            />
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
            data-testid="query-button"
          >
            pesquisar
          </button>
          { toggle && <p>Nenhum produto foi encontrado</p> }
          {products.map((element, i) => (
            <div
              data-testid="product"
              key={ i }
            >
              <img src={ element.thumbnail } alt={ element.id } />
              <p>{element.title}</p>
              <p>{element.price}</p>
            </div>
          ))}
        </div>
      </>

    );
  }
}

export default Search;
