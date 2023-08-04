import React, { Component } from "react";
import UserContext from "../../contexts/userContext";
import { MDBCardBody, MDBListGroup } from "mdb-react-ui-kit";
import "./taskList.scss";
import TaskItem from "../taskItem/TaskItem";
import TaskForm from "../taskForm/TaskForm";
import TaskTabs from "../taskTabs/TaskTabs";
import ButtonsGroupActions from "../buttonsGroupActions/ButtonsGroupActions";
import { toast } from "react-toastify";

export default class TaskList extends Component {
  static contextType = UserContext;
  constructor() {
    super();
    this.chosedTasks = [];
    this.state = { displayBtn: "none", store: { active: [] } };
  }
  displayBtnHandler = () => {
    if (this.chosedTasks.length >= 1) {
      this.setState({ displayBtn: "flex" });
    } else {
      this.setState({ displayBtn: "none" });
    }
  };
  changeStatus = (e) => {
    const { store } = this.state;
    const to = e.target.dataset.action;
    this.chosedTasks.map((task) => {
      task.status = to;
      store[to].push(task);
    });
    this.context.state.updateStore(store);
    this.deleteTasks();
    toast.success(`Task remove to ${to}`);
  };
  deleteTasks = () => {
    const {
      state: { store },
      currentTab,
    } = this;
    this.chosedTasks.map((task) => {
      const index = store[currentTab].indexOf(task);
      store[currentTab].splice(index, 1);
    });
    this.chosedTasks = [];
    this.displayBtnHandler();
    this.context.state.updateStore(this.state.store);
  };
  checkboxHandler = (task) => {
    const { chosedTasks } = this;
    const index = chosedTasks.indexOf(task);
    if (index !== -1) {
      chosedTasks.splice(index, 1);
    } else {
      chosedTasks.push(task);
    }
    this.displayBtnHandler();
  };
  componentDidMount() {
    const {
      state: { store },
    } = this.context;
    this.setState({ store: store });
  }
  handleTabClick = (currentTab) => {
    this.chosedTasks = [];
    this.context.state.setCurrentTab({ currentTab });
    this.displayBtnHandler();
  };
  componentDidUpdate() {
    this.currentTab = this.context.state.currentTab;
  }
  render() {
    const { displayBtn } = this.state;
    const { handleTabClick, checkboxHandler, deleteTasks } = this;
    const { currentTab, store } = this.context.state;
    return (
      <MDBCardBody className="p-5">
        <TaskForm />
        <div className="taskHeader">
          <TaskTabs handleClick={handleTabClick} currentTab={currentTab} displayBtnHandler={this.displayBtnHandler} />
          <ButtonsGroupActions
            display={displayBtn}
            changeStatus={this.changeStatus}
            deleteTasks={deleteTasks}
            currentTab={currentTab}
          />
        </div>
        <MDBListGroup className="mb-0">
          {store[currentTab].map((item) => (
            <TaskItem item={item} key={item.id} checkHandler={checkboxHandler} />
          ))}
        </MDBListGroup>
      </MDBCardBody>
    );
  }
}
