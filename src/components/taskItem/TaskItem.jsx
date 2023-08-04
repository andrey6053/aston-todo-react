import React, { Component } from "react";
import { MDBCheckbox, MDBListGroupItem, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import Modal from "../modal/Modal";
import "./taskItem.scss";
import userContext from "../../contexts/userContext";
import Card from "../card/Card";
import { toast } from "react-toastify";

export default class TaskItem extends Component {
  static contextType = userContext;
  constructor() {
    super();
    this.state = { isModalShow: "none", isCardShow: "none" };
  }
  showCard = () => {
    this.setState({ isCardShow: "block" });
  };
  showModal = () => {
    this.setState({ isModalShow: "block" });
  };
  hideCard = () => {
    this.setState({ isCardShow: "none" });
  };
  hideModal = () => {
    this.setState({ isModalShow: "none" });
  };
  updateTask = (title, body) => {
    if (title.length < 2) return toast.warning("Must be at least 2 symbols");
    const store = this.context.state.store;
    const currentTab = this.props.item.status;
    store[currentTab].map((task) => {
      if (task === this.props.item) {
        task.title = title;
        task.body = body;
      }
    });
    this.context.state.updateStore(store);
    this.hideModal();
    toast.success("Task edited");
  };
  render() {
    const {
      item,
      item: { title, status, body },
      checkHandler,
    } = this.props;
    const { isModalShow, isCardShow } = this.state;
    return (
      <MDBListGroupItem className=" d-flex align-items-center border-0 mb-2 rounded group-item task">
        <Modal
          title={title}
          body={body}
          hideModal={this.hideModal}
          isModalShow={isModalShow}
          updateTask={this.updateTask}
        />
        <Card title={title} body={body} hideCard={this.hideCard} isCardShow={isCardShow} />
        <MDBCheckbox id="flexCheck" className="me-3" onClick={() => checkHandler(item)} />
        <div className="task__title" onClick={this.showCard}>
          <div className="fw-bold">{status === "complete" ? <s>{title}</s> : title}</div>
        </div>
        <MDBBtn color="danger" tag="a" className="task__edit" floating onClick={this.showModal}>
          <MDBIcon fas icon="magic" />
        </MDBBtn>
      </MDBListGroupItem>
    );
  }
}
