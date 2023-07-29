import React, { Component } from "react";
import { MDBTabs, MDBTabsItem, MDBTabsLink } from "mdb-react-ui-kit";

export default class TaskTabs extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.currentTab === this.props.currentTab ? false : true;
  }
  render() {
    const { currentTab, handleClick } = this.props;
    return (
      <MDBTabs className="mb-4">
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleClick("active")} active={currentTab === "active"}>
            Active
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleClick("complete")} active={currentTab === "complete"}>
            Complete
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleClick("archive")} active={currentTab === "archive"}>
            Archive
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
    );
  }
}
