import React, { Component } from "react";
import { MDBCard, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";

export default class Container extends Component {
  render() {
    return (
      <section className="gradient-custom vh-100">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="d-flex justify-content-center align-items-center">
            <MDBCol xl="10">
              <MDBCard></MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }
}
