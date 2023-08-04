import React, { Component } from "react";
import "./App.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import UserContext from "../contexts/userContext";
import TaskList from "../components/tasksList/TaskList";
import Toast from "../components/toast/Toast";
import { Container } from "react-bootstrap";
import Header from "../components/header/Header";

export default class App extends Component {
  constructor() {
    super();
    this.deleteTasks = (store) => this.setState({ store: { ...store } });
    this.changeStatus = (store) => this.setState({ store: { ...store } });
    this.addTask = (store) => this.setState({ store: { ...store } });
    this.updateTask = (store) => this.setState({ store: { ...store } });
    this.setCurrentTab = (currentTab) => this.setState(currentTab);
    this.updateStore = (store) => this.setState({ store: { ...store } });
    this.state = {
      theme: localStorage.getItem("theme") || "light",
      currentTab: "active",
      store: JSON.parse(localStorage.getItem("store")) || {
        active: [],
        complete: [],
        archive: [],
      },
      setCurrentTab: this.setCurrentTab,
      addTask: this.addTask,
      deleteTasks: this.deleteTasks,
      changeStatus: this.changeStatus,
      updateTask: this.updateTask,
      updateStore: this.updateStore,
    };
  }
  componentDidMount() {
    window.onbeforeunload = () => {
      localStorage.setItem("store", JSON.stringify(this.state.store));
    };
  }
  render() {
    return (
      <UserContext.Provider value={{ state: this.state }}>
        <div className="App">
          <Container>
            <Header />
            <Toast />
            <TaskList />
          </Container>
        </div>
      </UserContext.Provider>
    );
  }
}
