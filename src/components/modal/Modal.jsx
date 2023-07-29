import React, { Component } from "react";
import "./modal.scss";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTextArea,
  MDBInput,
} from "mdb-react-ui-kit";

export default class Modal extends Component {
  constructor() {
    super();
    this.state = { title: "", body: "" };
  }
  componentDidMount() {
    const { title, body } = this.props;
    this.setState({ title, body });
  }
  setTaskTitle = (event) => {
    this.setState({ title: event.target.value });
  };
  setTaskBody = (event) => {
    this.setState({ body: event.target.value });
  };
  render() {
    const { title, body } = this.state;
    const { isModalShow, hideModal, updateTask } = this.props;
    return (
      <MDBModal
        show={isModalShow === "block" ? true : false}
        style={{ display: isModalShow }}
        onClick={hideModal}
        tabIndex="-1"
      >
        <MDBModalDialog>
          <MDBModalContent onClick={(e) => e.stopPropagation()}>
            <MDBModalHeader>
              <MDBModalTitle>Editing task</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={hideModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form>
                <div className="mb-3">
                  {isModalShow && (
                    <MDBInput value={title} onChange={this.setTaskTitle} labelClass="col-form-label" label="Title:" />
                  )}
                </div>
                <div className="mb-3">
                  {isModalShow && (
                    <MDBTextArea
                      value={body}
                      onChange={this.setTaskBody}
                      labelClass="col-form-label"
                      label="Description:"
                    />
                  )}
                </div>
              </form>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={hideModal}>
                Close
              </MDBBtn>
              <MDBBtn onClick={() => updateTask(title, body)}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    );
  }
}
