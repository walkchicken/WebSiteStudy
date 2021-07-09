import React from 'react';
import { BrowserRouter, Router, Route } from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import Desktop from './components/Desktop/Desktop';

import Members from './components/Dashboard/Members';

import Dashboard from './components/Dashboard/Dashboard';
// import regisadmin from './components/regisadmin';

import { Component } from 'react';
import { getAPI } from './components/UserFunctions';
import Perfumes from './components/Dashboard/Perfumes';
import Types from './components/Dashboard/Types';
import Moneys from './components/Dashboard/Moneys';
import All from './components/Dashboard/All';






class App extends Component {
  state = {
  }
  componentDidMount = () => {
    getAPI(`/admin`).then(res => {
      this.setUser(res.data)
    },
      err => {
        console.log(err)
      }
    )
  };
  setUser = user => {
    this.setState({
      user: user
    })
  }
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Desktop} />
        {/* <Route exact path="/regisadmin" component={regisadmin} /> */}
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={() => <Login setUser={this.setUser} />} />
        <Route exact path="/members" component={Members} />
        <Route exact path="/all" component={All} />
        <Route exact path="/perfumes" component={Perfumes} />
        <Route exact path="/types" component={Types} />
        <Route exact path="/moneys" component={Moneys} />
        <Route exact path="/dashboard" component={() => <Dashboard user={this.state.user} setUser={this.setUser} />} />
        {/* <Route exact path="/dashboard" component={() => <Dashboardtest user={this.state.user} />} /> */}
      </BrowserRouter >
    );
  }
}

export default App;
