import React, { Component } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import "./header.scss";
import UserContext from "../../contexts/userContext";
import { debounce } from "lodash";
import ThemeButton from "../themeButton/ThemeButton";

export default class Header extends Component {
  static contextType = UserContext;
  constructor() {
    super();
    this.state = { searchValue: "" };
    this.searchTasks = debounce(this.searchTasks.bind(this), 500);
  }
  setSearchValue = (event) => {
    const { value } = event.target;
    this.setState({ searchValue: value });
    this.searchTasks(value);
  };
  searchTasks = (value) => {
    const { storeLocal } = this.state;
    const {
      state,
      state: { currentTab },
    } = this.context;
    if (value === "") return state.updateStore(storeLocal);
    const newStore = storeLocal[currentTab].filter((task) => task.title.includes(value));
    state.updateStore({ ...storeLocal, [currentTab]: newStore });
  };
  getSnapshotBeforeUpdate() {
    return this.currentTab;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.currentTab = this.context.state.currentTab;
    if (this.currentTab !== snapshot) {
      this.setState({ searchValue: "" });
      this.context.state.updateStore({ ...this.state.storeLocal });
    }
  }
  componentDidMount() {
    const { store, currentTab } = this.context.state;
    this.currentTab = currentTab;
    this.setState({ storeLocal: store });
  }
  render() {
    return (
      <div className="header">
        <MDBInput
          value={this.state.searchValue}
          onChange={this.setSearchValue}
          className="header__search"
          label="Search"
          id="search"
          type="text"
        />
        <ThemeButton />
      </div>
    );
  }
}
