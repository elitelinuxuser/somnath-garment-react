import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "40px",
          margin: 0,
          paddingTop: "10px",
          backgroundColor: "#e81050",
          color: "white"
        }}
      >
        <p>
          Copyright &copy; 2019 All rights reserved by{" "}
          <strong>Somnath Garments</strong>
        </p>
      </footer>
    );
  }
}

export default Footer;
