import React, { Component } from "react";
import UserContext from "../../contexts/userContext";
import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBListGroup, MDBRow } from "mdb-react-ui-kit";
import "./taskList.scss";
import TaskItem from "./taskItem/TaskItem";
import TaskForm from "./taskForm/TaskForm";
import TaskTabs from "./taskTabs/TaskTabs";
import TaskBtns from "./taskBtns/TaskBtns";

export default class TaskList extends Component {
  static contextType = UserContext;
  constructor() {
    super();
    this.chosedTasks = [];
    this.state = { currentTab: "active", displayBtn: "none", store: { active: [] } };
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
    this.context.state.changeStatus(store);
    this.deleteTasks();
  };
  deleteTasks = () => {
    const { store, currentTab } = this.state;
    this.chosedTasks.map((task) => {
      const index = store[currentTab].indexOf(task);
      store[currentTab].splice(index, 1);
    });
    this.chosedTasks = [];
    this.displayBtnHandler();
    this.context.state.deleteTasks(this.state.store);
  };
  handleTabClick = (currentTab) => {
    this.chosedTasks = [];
    this.setState({ currentTab });
    this.displayBtnHandler();
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
    const store = this.context.state.store;
    this.setState({ store });
  }
  render() {
    const { currentTab, store, displayBtn } = this.state;
    const { handleTabClick, checkboxHandler, deleteTasks } = this;
    return (
      <section className="gradient-custom vh-100">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="d-flex justify-content-center align-items-center">
            <MDBCol xl="10">
              <MDBCard>
                <MDBCardBody className="p-5">
                  <TaskForm />
                  <div className="taskHeader">
                    <TaskTabs handleClick={handleTabClick} currentTab={currentTab} />
                    <TaskBtns
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
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }
}
