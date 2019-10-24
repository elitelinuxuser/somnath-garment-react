import React, { Component } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import axios from "axios";

import { SERVER_URI, getConfig, postHeaders } from "../../../globals";

class Users extends Component {
  state = {
    loading: true,
    users: [],
    addModalOpen: false,
    confirmDirty: false,
    registerButtonLoading: false
  };

  componentDidMount() {
    this._fetchUsers();
  }

  handleOk = e => {
    console.log(e);
    this.setState({
      addModalOpen: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      addModalOpen: false
    });
  };

  openAddModal = () => {
    this.setState({
      addModalOpen: true
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      registerButtonLoading: true
    });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.admin = false;
        console.log("Received values of form: ", values);
        this._addUser(values);
      } else {
        this.setState({
          registerButtonLoading: false
        });
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  _fetchUsers = () => {
    axios.get(`${SERVER_URI}/users/all`, getConfig).then(users => {
      console.log(users);
      this.setState({
        users: users.data.map((user, index) => ({ ...user, key: index })),
        loading: false
      });
    });
  };

  _addUser = userDetails => {
    const config = {
      headers: {
        ...postHeaders
      },
      ...userDetails
    };
    axios.post(`${SERVER_URI}/users`, config).then(({ err, data }) => {
      if (err) {
        this.setState({
          registerButtonLoading: false
        });
      } else {
        this.setState({
          registerButtonLoading: false,
          addModalOpen: false
        });
        this._fetchUsers();
      }
    });
  };

  _deleteUser = email => {
    const { users } = this.state;
    console.log(email);
    this.setState({
      users: users.filter(user => user.email !== email)
    });
  };

  render() {
    const { loading, users, addModalOpen, registerButtonLoading } = this.state;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

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
        dataIndex: "email",
        key: "x",
        render: email => (
          <>
            <a href="#delete" onClick={() => this._deleteUser(email)}>
              Delete
            </a>
            {/* <a>Edit</a> */}
          </>
        )
      }
    ];
    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={addModalOpen}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="Name">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Please input your name!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="E-mail">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password!"
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "Please confirm your password!"
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                loading={registerButtonLoading}
                type="primary"
                htmlType="submit"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Button
          type="primary"
          style={{ float: "right", margin: "10px", zIndex: 100 }}
          onClick={this.openAddModal}
        >
          Add User
        </Button>
        <Table
          loading={loading}
          columns={columns}
          dataSource={users}
          bordered
          title={() => <div>Users</div>}
          footer={() => "Footer"}
        />
      </div>
    );
  }
}

const WrappedUserForm = Form.create({ name: "register" })(Users);

export default WrappedUserForm;
