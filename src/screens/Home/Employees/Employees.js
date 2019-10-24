import React, { Component } from "react";
import { Table } from "antd";
import axios from "axios";

import { SERVER_URI, getConfig } from "../../../globals";

class Employees extends Component {
  state = {
    loading: true,
    employees: []
  };

  componentDidMount() {
    const { employees } = this.state;
    axios.get(`${SERVER_URI}/employees/all`, getConfig).then(employee => {
      this.setState({
        loading: false,
        employees: [...employees, employee]
      });
    });
  }

  render() {
    const { loading, employees } = this.state;
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        render: text => <a>{text}</a>
      },
      {
        title: "Employee ID",
        className: "column-money",
        dataIndex: "employeeId"
      },
      {
        title: "Address",
        dataIndex: "address"
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: () => <a>Delete</a>
      }
    ];
    return (
      <div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={employees}
          bordered
          title={() => "Header"}
          footer={() => "Footer"}
        />
      </div>
    );
  }
}

export default Employees;
