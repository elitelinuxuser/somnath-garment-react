import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { Button, Form, Grid, Icon } from "semantic-ui-react";
import Footer from "../components/Footer";
import { loginAsAdmin } from "../actions/auth";

class Login extends Component {
  state = {
    email: "",
    password: "",
    buttonLoading: false,
    redirect: false,
    redirectUrl: "/"
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  componentDidMount() {
    const routerState = this.props.location.state;
    if (routerState) {
      this.setState({
        redirectUrl: routerState.from.pathname
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { loginAsAdmin } = this.props;
    console.log(email, password);
    this.setState({
      buttonLoading: true
    });
    loginAsAdmin(email, password).then(() => {
      this.setState({
        buttonLoading: false,
        redirect: true
      });
    });
  };

  render() {
    const {
      email,
      password,
      buttonLoading,
      redirect,
      redirectUrl
    } = this.state;
    return (
      <Fragment>
        {redirect && <Redirect to={redirectUrl} />}
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450, textAlign: "center" }}>
            <div
              style={{
                backgroundColor: "#e81050",
                borderRadius: "50%",
                height: "80px",
                width: "80px",
                padding: "10px",
                textAlign: "center",
                margin: "0 auto"
              }}
            >
              <Icon size="huge" name="stripe s" style={{ color: "white" }} />
            </div>
            <Form>
              <Form.Field>
                <label style={{ textAlign: "left" }}>Email</label>
                <Form.Input
                  placeholder="Username/Email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label style={{ textAlign: "left" }}>Password</label>
                <Form.Input
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Button
                type="submit"
                color="red"
                loading={buttonLoading}
                style={{
                  backgroundColor: "#E81050",
                  paddingLeft: "15%",
                  paddingRight: "15%"
                }}
                onClick={this.handleSubmit}
              >
                Login
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loginAsAdmin }
)(withRouter(Login));
