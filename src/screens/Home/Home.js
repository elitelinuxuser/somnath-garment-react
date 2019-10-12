import React, { Component } from "react";
import logo from "../../assets/logo.png";
import xlLogo from "../../assets/xlLogo.png";
import { Image } from "semantic-ui-react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Layout, Menu, Icon } from "antd";
import { logout } from "../../actions/auth";
import Employees from "./Employees/Employees";
import Orders from "./Orders/Orders";
import Users from "./Users/Users";
import "./Home.css";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class Home extends Component {
  state = {
    collapsed: false,
    selected: "1",
    redirect: false,
    redirectUrl: "",
    selectedItem: "Orders"
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  handleSelect = e => {
    console.log(e);
    this.setState({
      selected: e.key,
      selectedItem: e.item.node.innerText
    });
  };

  handleLogout = async () => {
    const { logout } = this.props;
    await logout();

    this._redirectTo("/login");
    console.log("Logged out successfully");
  };

  _redirectTo = url => {
    this.setState({
      redirect: true,
      redirectUrl: url
    });
  };

  render() {
    const { redirect, redirectUrl, selected, selectedItem } = this.state;
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{
            height: "100vh",
            overflow: "auto",
            position: "fixed",
            left: 0,
            textAlign: "left"
          }}
        >
          {redirect && <Redirect to={redirectUrl} />}
          <div className="container">
            <Image
              src={this.state.collapsed ? xlLogo : logo}
              height={this.state.collapsed ? "45px" : "100px"}
              style={{
                display: "block",
                margin: this.state.collapsed ? "10px auto" : "10px auto",
                cursor: "pointer"
              }}
              onClick={() => this._redirectTo("/")}
            />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" onClick={this.handleSelect}>
              <Icon type="form" />
              <span>Orders</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={this.handleSelect}>
              <Icon type="user" />
              <span>Employees</span>
            </Menu.Item>
            <Menu.Item key="3" onClick={this.handleSelect}>
              <Icon type="user" />
              <span>Users</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: this.state.collapsed ? 80 : 200 }}>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
              style={{
                float: "left"
              }}
            />
            <span className="trigger">{selectedItem}</span>
            <Icon
              className="trigger"
              type="logout"
              style={{ float: "right" }}
              onClick={this.handleLogout}
            />
          </Header>
          <Content
            style={{
              // margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            <div
              style={{ padding: 24, background: "#fff", textAlign: "center" }}
            >
              {selected === "1" && <Orders />}
              {selected === "2" && <Employees />}
              {selected === "3" && <Users />}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  null,
  { logout }
)(withRouter(Home));
