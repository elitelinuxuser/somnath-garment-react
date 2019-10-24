import React, { Component } from "react";

class CompanyProfile extends Component {
  render() {
    const { _id } = this.props;
    return <div>Company Profile {_id}</div>;
  }
}

export default CompanyProfile;
