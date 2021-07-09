import React, { Component } from 'react'
import { postAPI } from '../services/api';
import axios from 'axios';
import { Link, Redirect, } from 'react-router-dom'
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import './Login/login.css'

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Logintest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loading: false,
      message: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit = e => {
    e.preventDefault()

    const data = {
      email: this.state.email,
      password: this.state.password
    }

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      postAPI(`users/login`, data)
        .then(res => {
          localStorage.setItem('token', res.data.token);
          this.setState({
            loggedIn: true
          });
          this.props.setUser(res.data.user)
        },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            this.setState({
              loading: false,
              message: resMessage
            });
          }
        );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to={'/dashboard'} />
    }
    return (
      <div className="App">
        <Form
          onSubmit={this.onSubmit}
          ref={c => {
            this.form = c;
          }}
        >
          <form noValidate>
            <div className="form-inner">
              <h1 >Please SigIn
              </h1>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                  validations={[required]}
                />
              </div>
              <button disabled={this.state.loading} >
                <input type="submit" value="SignIn" />
              </button>
              {this.state.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {this.state.message}
                  </div>
                </div>
              )}
              <div className="if">
                You don't have account ?
                <Link to="/register" id="register">
                  <input type="submit" value="Register" />
                </Link>
              </div>
              <div className="if">
                <Link to="/" >
                  I don't buy now ?
                </Link>
              </div>
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c;
                }}
              />
            </div>
          </form>
        </Form>
      </div >
    )
  }
}

export default Logintest