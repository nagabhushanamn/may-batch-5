import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Product from './Product';
import ViewCart from './ViewCart'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartOpen: false,
      cart: {},
      products: [
        {
          id: '111',
          name: 'Laptop',
          price: 198000.00,
          description: 'New Mac pro',
          canBuy: true,
          image: 'images/Laptop.png'
        },
        {
          id: '222',
          name: 'Mobile',
          price: 18000.00,
          description: 'New  pro',
          canBuy: true,
          image: 'images/Mobile.png'
        }
      ]
    };
  }
  toggleCart() {
    let { isCartOpen } = this.state;
    this.setState({ isCartOpen: !isCartOpen });
  }
  addToCart(item, qty) {
    let { cart } = this.state;
    let id = item.id;
    let line = cart[id];
    if (line) {
      line = Object.assign({}, line, { qty })
    } else {
      line = { item, qty }
    }
    cart = Object.assign({}, cart, { [id]: line });
    this.setState({ cart });
  }
  renderProducts() {
    let { products, isCartOpen, cart } = this.state;
    if (!isCartOpen) {
      return products.map((product, idx) => {
        return (
          <Product product={product} key={idx} onBuy={(item, qty) => { this.addToCart(item, qty) }} />
        );
      });
    } else {
      return <ViewCart cart={cart} />
    }
  }
  render() {
    let { title } = this.props;
    let { cart, isCartOpen } = this.state;
    let count = Object.keys(cart).length
    return (
      <div className="container">
        <nav className="navbar navbar-light bg-primary">
          <span className="navbar-brand mb-0 h1">{title}</span>
        </nav>
        <hr />
        <i className="fa fa-shopping-cart"></i>
        {count} item(s) in cart
        |
        <a href="#/" className="pull-right" onClick={() => { this.toggleCart() }}>{isCartOpen ? 'View products' : 'View cart'}</a>
        <hr />
        <div className="list-group">
          {this.renderProducts()}
        </div>
      </div>
    );
  }
}

export default App;
