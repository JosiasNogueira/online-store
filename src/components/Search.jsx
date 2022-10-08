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
      categoryRadio: '',
      ArrayCategoria: [],
    };
  }

  async componentDidMount() {
    const newRequest = await getCategories();
    this.setState({ category: newRequest });
  }

  /* async componentDidUpdate() {
    const x = await this.handleClickSelect();
    return x;
  } */

  onInputChange = ({ target: { value, type, name, id } }) => {
    const valor = type === 'radio' ? id : value;
    this.setState({
      [name]: valor,
    }, () => this.handleClickSelect());
  };

  handleClickSelect = async () => {
    const { categoryRadio } = this.state;
    const request = await getProductsFromCategoryAndQuery(categoryRadio, null);
    // console.log(request.results);
    this.setState({
      ArrayCategoria: request.results,
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
      // console.log(request.results);
      this.setState({
        products: request.results,
        toggle: false,
        categoryRadio: '',
      });
    }
  };

  render() {
    const { category,
      query,
      products,
      toggle,
      categoryRadio,
      ArrayCategoria } = this.state;
    const queryResults = products.map((element, i) => (
      <div
        data-testid="product"
        key={ i }
      >
        <img src={ element.thumbnail } alt={ element.id } />
        <p>{element.title}</p>
        <p>{element.price}</p>
      </div>
    ));
    const categoryResults = ArrayCategoria.map((e, i) => (
      <div
        data-testid="product"
        key={ i }
      >
        <img src={ e.thumbnail } alt={ e.id } />
        <p>{e.title}</p>
        <p>{e.price}</p>
      </div>
    ));
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
                name="categoryRadio"
                onChange={ this.onInputChange }
                // checked={ this.handleClickSelect }
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
          {toggle && <p>Nenhum produto foi encontrado</p> }
          {categoryRadio.length > 0 ? categoryResults : queryResults }
        </div>
      </>
    );
  }
}

export default Search;
