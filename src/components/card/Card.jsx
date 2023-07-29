import React, { Component } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
export default class Card extends Component {
  render() {
    const { title, body } = this.props;
    const { hideCard, isCardShow } = this.props;
    return (
      <MDBModal
        show={isCardShow === "block" ? true : false}
        style={{ display: isCardShow }}
        onClick={hideCard}
        tabIndex="-1"
      >
        <MDBModalDialog>
          <MDBModalContent onClick={(e) => e.stopPropagation()}>
            <MDBModalHeader>
              <MDBModalTitle>{title}</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={hideCard}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>{body}</MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={hideCard}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    );
  }
}
