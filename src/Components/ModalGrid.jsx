import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axiosInstance from "./../Axios/axiosInstance";
import { setShowState } from "./../store/actions";

import { FORM_SUB_FAIL, FORM_SUB_SUCC } from "../store/actions-constants";
import { connect } from "react-redux";

const ModalGrid = (props) => {
  const [fn, setFN] = useState();
  const [ln, setLN] = useState();
  const [em, setEM] = useState();
  const [mob, setMob] = useState();
  const [lt, setLT] = useState();
  const [ls, setLS] = useState();
  const handleSubmit = () => {
    const userInfo = {
      first_name: fn,
      last_name: ln,
      mobile: mob,
      email: em,
      location_type: lt,
      location_string: ls,
    };
    // .post("userInfo.json", userInfo)
   
    axiosInstance
      .post("api/leads/", userInfo)
      .then((response) => {
        debugger
        props.disActFormSubmitSuccess(response);
        
        props.dispModalShowState(false);
      })
      .catch((err) =>{
        debugger
        props.disActFormSubmitFAIL(err)
      } );
      
  };
  return (
    <Modal
      backdrop="static"
      keyboard={false}
      show={props.showModal}
      onHide={() => {
        props.dispModalShowState(false);
      }}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Lead</Modal.Title>
       </Modal.Header>

      <Form noValidate validated={true} onSubmit={() => handleSubmit()}>
        <Modal.Body className="show-grid">
          <Form.Row>
            <Form.Group md="6" className={"first_name"}
             controlId="validationCustom01"
            >
              <Form.Label>First name</Form.Label>
              <Form.Control
                value={fn}
                onChange={(e) => setFN(e.target.value)}
                required
                type="text"
                placeholder="First name"
              />
            </Form.Group>
            <Form.Group md='6' className={"last_name"}
             
              controlId="validationCustom02"
            >
              <Form.Label>Last name</Form.Label>
              <Form.Control
                value={ln}
                onChange={(e) => setLN(e.target.value)}
                required
                type="text"
                placeholder="Last name"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group md="6" className={"email"}
              controlId="validationCustom03"
            >
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                value={em}
                onChange={(e) => setEM(e.target.value)}
                required
                type="text"
              />
            </Form.Group>
            <Form.Group md="6" className={"mobile"}
              controlId="validationCustom04"
            >
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                value={mob}
                onChange={(e) => setMob(e.target.value)}
                required
                type="number"
              />
            </Form.Group>
            <Form.Group md="6"  
              className={"loaction_type"}
              controlId="validationCustom05"
            >
              <Form.Label>Location Type</Form.Label>
              <Form.Control
                value={lt}
                onChange={(e) => setLT(e.target.value)}
                required
                type="select"
              />
            </Form.Group>
            <Form.Group md="6" className={"loaction_string"}
              controlId="validationCustom06"
            >
              <Form.Label>Location String</Form.Label>
              <Form.Control
                value={ls}
                onChange={(e) => setLS(e.target.value)}
                required
                type="text"
              />
            </Form.Group>
          </Form.Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => props.dispModalShowState(false)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            disabled={!(fn && ln && em && mob && lt && ls)}
            className="add_lead_btn"
            type="submit"
          >
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
function mapStateToProps(state) {
  return {
    showModal: state.showModal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    disActFormSubmitSuccess: (res) =>
      dispatch({
        type: FORM_SUB_SUCC,
        payload: res,
      }),
    disActFormSubmitFAIL: (res) =>
      dispatch({
        type: FORM_SUB_FAIL,
        payload: res,
      }),
    dispModalShowState: (showState) => dispatch(setShowState(showState)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalGrid);
//npm install eslint --save-dev
//npx eslint --init