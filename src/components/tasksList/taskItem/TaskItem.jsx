import React, { Component } from "react";
import { MDBCheckbox, MDBListGroupItem } from "mdb-react-ui-kit";
import "./taskItem.scss";
export default class TaskItem extends Component {
  render() {
    const {
      item,
      item: { title, status },
      checkHandler,
    } = this.props;
    return (
      <MDBListGroupItem className=" d-flex align-items-center border-0 mb-2 rounded group-item">
        <MDBCheckbox id="flexCheck" className="me-3" onClick={() => checkHandler(item)} />
        {status === "complete" ? <s>{title}</s> : title}
      </MDBListGroupItem>
    );
  }
}
