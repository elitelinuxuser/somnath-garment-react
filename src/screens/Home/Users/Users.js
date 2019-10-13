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
    axios.get(`${SERVER_URI}/users/all`, getConfig).then(users => {
      console.log(users);
      this.setState({
        companies: users.data,
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
        title: "Email",
        className: "column-money",
        dataIndex: "email"
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: () => (
          <>
            <a>Delete</a> <a>Edit</a>
          </>
        )
      }
    ];
    return (
      <div>
        <Button
          type="primary"
          style={{ float: "right", margin: "10px", zIndex: 100 }}
          onClick={this._addUser}
        >
          Add User
        </Button>
        <Table
          loading={loading}
          columns={columns}
          dataSource={companies}
          bordered
          title={() => <div>Users</div>}
          footer={() => "Footer"}
        />
      </div>
    );
  }
}

export default Companies;
