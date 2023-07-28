import React, { Component } from "react";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import userContext from "../../../contexts/userContext";
export default class TaskForm extends Component {
  static contextType = userContext;
  constructor() {
    super();
    this.state = { inputTask: "" };
  }
  inputChange(e) {
    const target = e.target;
    this.setState({ inputTask: target.value });
  }
  taskBtnHandler() {
    const { inputTask } = this.state;
    const { store, addTask } = this.context.state;
    if (inputTask === "" || inputTask.length < 2) {
      return; // Добавить предупреждение Toast
    }
    store.active.push({ title: inputTask, body: "", id: Date.now(), status: "active", checkbox: false });
    addTask(store);
    this.setState({ inputTask: "" });
  }
  render() {
    return (
      <div className="d-flex justify-content-center align-items-center mb-4">
        <MDBInput
          type="text"
          id="form1"
          label="New task..."
          value={this.state.inputTask}
          onChange={(event) => this.inputChange(event)}
        />
        <MDBBtn type="button" color="info" className="ms-2" onClick={() => this.taskBtnHandler()}>
          Add
        </MDBBtn>
      </div>
    );
  }
}
