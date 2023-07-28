import React, { Component } from "react";
import "./App.scss";
import UserContext from "../contexts/userContext";
import TaskList from "./tasksList/TaskList";

export default class App extends Component {
  constructor() {
    super();
    this.setUser = (username) => this.setState({ username });
    this.setTheme = (theme) => this.setState({ theme });
    this.deleteTasks = (store) => this.setState({ store: { ...store } });
    this.changeStatus = (store) => this.setState({ store: { ...store } });
    this.addTask = (store) => this.setState({ store: { ...store } });
    this.state = {
      theme: localStorage.getItem("theme") || "light",
      store: localStorage.getItem("store") || {
        active: [{ title: "test", body: "test", id: 1, status: "active" }],
        complete: [{ title: "testtest", body: "test", id: 2, status: "complete" }],
        archive: [{ title: "testtest", body: "test", id: 3, status: "archive" }],
      },
      setUser: this.setUser,
      setTheme: this.setTheme,
      addTask: this.addTask,
      deleteTasks: this.deleteTasks,
      changeStatus: this.changeStatus,
    };
  }
  render() {
    return (
      <UserContext.Provider value={{ state: this.state }}>
        <div className="App">
          <TaskList />
        </div>
      </UserContext.Provider>
    );
  }
}
