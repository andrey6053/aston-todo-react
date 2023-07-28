import React, { Component } from "react";
import { MDBBtn } from "mdb-react-ui-kit";

export default class TaskBtns extends Component {
  render() {
    const { currentTab, changeStatus, deleteTasks } = this.props;
    return (
      <div className="taskHeader__btns" style={{ display: `${this.props.display}` }}>
        <MDBBtn
          type="button"
          data-action={currentTab === "active" ? "complete" : "active"}
          onClick={changeStatus}
          color="success"
          className="ms-2"
        >
          {currentTab === "active" ? "Complete" : "Active"}
        </MDBBtn>
        <MDBBtn
          type="button"
          data-action={currentTab === "archive" ? "complete" : "archive"}
          onClick={changeStatus}
          color="secondary"
          className="ms-2"
        >
          {currentTab === "archive" ? "Complete" : "Archive"}
        </MDBBtn>
        <MDBBtn type="button" onClick={deleteTasks} color="danger" className="ms-2">
          Delete
        </MDBBtn>
      </div>
    );
  }
}
