import React from 'react';
import { getProductById } from '../services/api';

class Details extends React.Component {

  state = {title: '', thumbnail: '', price: ''};

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const dados = await getProductById(id);
    this.setState({title: dados.title, thumbnail: dados.thumbnail, price: dados.price});
  }

  render() {

    const {title, thumbnail, price} = this.state;

    return (
      <>
        <p data-testid="product-detail-name">{title}</p>
        <img data-testid="product-detail-image" src={thumbnail}/>
        <p data-testid="product-detail-price">{price}</p>

        <button data-testid="shopping-cart-button" onClick={(e) => {
          const {history}= this.props
          history.push('/cart');
        }}>
          Carrinho
        </button>
      </>
    );
  }
}

export default Details;