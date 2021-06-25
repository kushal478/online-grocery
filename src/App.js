import './App.css';
import React from "react";
import {BrowserRouter as Router ,Switch,Route} from "react-router-dom";
import NavBar from './root/components/navbar/NavBar';
import Home from './root/components/home/Home';
import ProductList from './products/list/Product-list';
import ProductAdmin from './products/admin/Product-admin';
import CreateProduct from './products/create/Create-product';
import UpdateProduct from './products/update/Update-product';

class App extends React.Component
{
 
  render()
  {
    return(
      <React.Fragment>
        <Router>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/product/list" component={ProductList}/>
            <Route exact path="/product/admin" component={ProductAdmin}/>
            <Route exact path="/product/create" component={CreateProduct}/>
            <Route exact path="/products/admin/:product_id" component={UpdateProduct}/>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
