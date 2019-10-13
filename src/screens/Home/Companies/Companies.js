import React, { Component } from "react";
import { Table, Button } from "antd";
import axios from "axios";

import { SERVER_URI, getConfig } from "../../../globals";

class Companies extends Component {
  state = {
    loading: true,
    companies: []
  };

  componentDidMount() {
    axios.get(`${SERVER_URI}/company/all`, getConfig).then(companies => {
      console.log(companies);
      this.setState({
        companies: companies.data,
        loading: false
      });
    });
  }

  render() {
    const { loading, companies } = this.state;
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        render: text => <a>{text}</a>
      },
      {
        title: "Contact No",
        className: "column-money",
        dataIndex: "contactNo"
      },
      {
        title: "GST No",
        dataIndex: "gstNo"
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: () => <a>View</a>
      }
    ];
    return (
      <div>
        <Button
          type="primary"
          style={{ float: "right", margin: "10px", zIndex: 100 }}
          onClick={this._addUser}
        >
          Add Company
        </Button>
        <Table
          loading={loading}
          columns={columns}
          dataSource={companies}
          bordered
          title={() => <div>Companies</div>}
          footer={() => "Footer"}
        />
      </div>
    );
  }
}

export default Companies;
