import React, { Component } from "react";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import userContext from "../../contexts/userContext";
import { toast } from "react-toastify";

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
    if (inputTask.length < 2) return toast.warning("Must be at least 2 symbols");
    store.active.push({ title: inputTask, body: "", id: Date.now(), status: "active" });
    addTask(store);
    this.setState({ inputTask: "" });
    toast.success("Task success added");
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.inputTask === nextState.inputTask ? false : true;
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
