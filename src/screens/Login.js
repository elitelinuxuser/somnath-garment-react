import React, { Component } from "react";
import { Button } from "semantic-ui-react";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return <Button primary>Primary</Button>;
  }
}

export default Login;
