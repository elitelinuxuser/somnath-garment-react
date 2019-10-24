import React, { Component } from "react";
import { Table, Button } from "antd";
import axios from "axios";

import { SERVER_URI, getConfig } from "../../../globals";
import { CompanyProfile } from "../..";

class Companies extends Component {
  state = {
    loading: true,
    companies: [],
    companyDetails: false,
    _id: ""
  };

  componentDidMount() {
    axios.get(`${SERVER_URI}/company/all`, getConfig).then(companies => {
      console.log(companies);
      this.setState({
        companies: companies.data.map((company, index) => ({
          ...company,
          key: index
        })),
        loading: false
      });
    });
  }

  render() {
    const { loading, companies, companyDetails, _id } = this.state;
    let content;
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
        dataIndex: "_id",
        key: "x",
        render: _id => (
          <a
            onClick={() =>
              this.setState({
                companyDetails: true,
                _id
              })
            }
          >
            View
          </a>
        )
      }
    ];
    if (companyDetails) {
      content = (
        <div>
          <CompanyProfile _id={_id} />
        </div>
      );
    } else {
      content = (
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
    return content;
  }
}

export default Companies;
