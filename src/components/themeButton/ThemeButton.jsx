import React, { Component } from "react";
import "./themeButton.scss";
import UserContext from "../../contexts/userContext";

export default class ThemeButton extends Component {
  static contextType = UserContext;
  constructor() {
    super();
    this.state = {};
  }
  setTheme = () => {
    const theme = this.state.theme === "light" ? "dark" : "light";
    this.setState({ theme });
    localStorage.setItem("theme", theme);
    document.documentElement.className = theme;
  };
  componentDidMount() {
    const theme = this.context.state.theme;
    this.setState({ theme });
    document.documentElement.className = theme;
  }
  render() {
    return (
      <div>
        <label id="switch" className="switch">
          <input
            type="checkbox"
            onChange={this.setTheme}
            checked={this.state.theme === "light" ? true : false}
            id="slider"
          />
          <span className="slider round"></span>
        </label>
      </div>
    );
  }
}
