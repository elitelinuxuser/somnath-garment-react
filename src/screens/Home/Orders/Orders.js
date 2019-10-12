import React, { Component } from "react";
import axios from "axios";

import { SERVER_URI, getConfig } from "../../../globals";
import {
  Card,
  CardGroup,
  Button,
  Modal,
  Header,
  Icon
} from "semantic-ui-react";
import { Icon as IconAntd } from "antd";

class Orders extends Component {
  state = {
    loading: true,
    orders: [],
    modalOpen: false
  };

  componentDidMount() {
    this._getOrders();
  }

  _getOrders = () => {
    axios.get(`${SERVER_URI}/orders/all`, getConfig).then(orders => {
      this.setState({
        loading: false,
        orders: orders.data
      });
    });
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    const { orders } = this.state;
    return (
      <div>
        <CardGroup>
          {orders.map(
            (order, index) =>
              order.status !== "completed" && (
                <Card key={index}>
                  <Card.Content>
                    <Card.Header>{order.company.name}</Card.Header>
                    <Card.Meta>Order No: {order.orderNo}</Card.Meta>
                    <Card.Description>
                      <p>
                        <strong>
                          Status:{" "}
                          <span
                            style={{
                              color:
                                order.status === "taken"
                                  ? "blue"
                                  : order.status === "doing"
                                  ? "red"
                                  : "green"
                            }}
                          >
                            {order.status}
                          </span>
                        </strong>
                      </p>
                      <p>
                        <strong>Roll/Lump: {order.rollOrLump}</strong>
                      </p>
                      <strong>Total Metres: {order.totalMeters}</strong>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div className="ui two buttons">
                      <Modal
                        trigger={
                          <Button basic color="red" onClick={this.handleOpen}>
                            More Details
                          </Button>
                        }
                        closeIcon
                        open={this.state.modalOpen}
                        onClose={this.handleClose}
                      >
                        <Modal.Header style={{ textAlign: "center" }}>
                          Order No: {order.orderNo}
                        </Modal.Header>
                        <Modal.Content image scrolling>
                          <Modal.Description>
                            <Header style={{ textAlign: "center" }}>
                              {order.company.name}
                              <IconAntd
                                type="edit"
                                style={{ float: "right" }}
                              />
                            </Header>
                            <h3>Order Details:</h3>
                            <p>
                              <strong>Quantity: </strong> {order.quantity}
                            </p>
                            <p>
                              <strong>Total Metres: </strong>{" "}
                              {order.totalMeters}
                            </p>
                            <p>
                              <strong>Receiver Name: </strong>{" "}
                              {order.receiverName}
                            </p>
                            <p>
                              <strong>Amount to be received: </strong>{" "}
                              {order.amountToBeReceived}
                            </p>

                            <p>
                              <strong>Order Description: </strong>
                              {order.description}
                            </p>
                          </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button primary onClick={this.handleClose}>
                            <Icon name="chevron left" /> Go Back
                          </Button>
                        </Modal.Actions>
                      </Modal>
                    </div>
                  </Card.Content>
                </Card>
              )
          )}
        </CardGroup>
      </div>
    );
  }
}

export default Orders;
