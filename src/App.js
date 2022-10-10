import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cart from './components/Cart';
import Details from './components/Details';
import Search from './components/Search';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Search } />
          <Route exact path="/cart" component={ Cart } />
          <Route exact path="/:id" component={ Details } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
