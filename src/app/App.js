import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from '../layout/Layout';
import { About } from '../components/About';
import { Catalog } from '../components/Catalog';
import { Cart } from '../components/Cart';
import { Login } from '../components/Login';
import { SignUp } from '../components/SignUp';
import { Client } from '../components/Client';
import { ApplicationPaths } from '../routes/RoutePath';
import '../assets/styles/App.css'
export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Catalog} />
        <Route path={ApplicationPaths.CatalogPath} component={Catalog} />
        <Route path={ApplicationPaths.AdminPath} component={Catalog} />
        <Route path={ApplicationPaths.ClientPath} component={Client} />
        <Route path={ApplicationPaths.CartPath} component={Cart} />
        <Route path={ApplicationPaths.AboutPath} component={About} />
        <Route path={ApplicationPaths.SignUpPath} component={SignUp} />
        <Route path={ApplicationPaths.LoginPath} component={Login} />
      </Layout >
    );
  }
}
