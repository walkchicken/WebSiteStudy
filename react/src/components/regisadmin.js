import React, { Component } from 'react'
import UserFunctions from './UserFunctions'
import { Link } from 'react-router-dom'
import { isEmail } from "validator";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};



class regisadmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            successful: false,
            message: ""
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()

        this.setState({
            message: "",
            successful: false
        });

        // const newUser = {
        //   first_name: this.state.first_name,
        //   last_name: this.state.last_name,
        //   email: this.state.email,
        //   password: this.state.password
        // }
        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            UserFunctions.register(
                this.state.first_name,
                this.state.last_name,
                this.state.email,
                this.state.password
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }

    render() {
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
                            <h1 >Register
                            </h1>
                            {!this.state.successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="name">First name</label>
                                        <Input
                                            type="text"
                                            name="first_name"
                                            placeholder="Enter your first name"
                                            value={this.state.first_name}
                                            onChange={this.onChange}
                                            validations={[required, vusername]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Last name</label>
                                        <Input
                                            type="text"
                                            name="last_name"
                                            placeholder="Enter your lastname name"
                                            value={this.state.last_name}
                                            onChange={this.onChange}
                                            validations={[required, vusername]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email address</label>
                                        <Input
                                            type="email"
                                            name="email"
                                            placeholder="Enter email"
                                            value={this.state.email}
                                            onChange={this.onChange}
                                            validations={[required, email]}
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
                                            validations={[required, vpassword]}
                                        />
                                    </div>
                                    <input
                                        type="submit"
                                        value="Register"
                                    />
                                </div>
                            )}
                            {this.state.message && (
                                <div className="form-group">
                                    <div
                                        className={
                                            this.state.successful
                                                ? "alert alert-success"
                                                : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {this.state.message}
                                    </div>
                                </div>
                            )}
                            <div className="if">
                                <Link to="/login" >
                                    I have account ?
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
            </div>
        )
    }
}

export default regisadmin