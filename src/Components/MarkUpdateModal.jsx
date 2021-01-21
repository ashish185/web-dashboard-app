import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { setMarkAsUpdateState } from "../store/actions";
import axiosInstance from "../Axios/axiosInstance";
const MarkUpdateModal = ({showMarkAsUpdateModal,setMarkAsUpdateState,id}) => {
  const [txt, setTxtArea] = useState();
  const handleApiRequest = () =>{
    const communication={
      "communication": txt
    }
    console.log(`api/mark_lead/${id}`);
    axiosInstance.put(`api/mark_lead/${id}`,communication).then(()=>{
      setMarkAsUpdateState(false,id);
      setTxtArea('');
    }
    ).catch(()=>{
      setTxtArea('');
      setMarkAsUpdateState(false,null)
    });
  }
 const handleHide =()=>{
  setMarkAsUpdateState(false,id);
  setTxtArea('');
 }
  return (
    <Modal show={showMarkAsUpdateModal} onHide={()=>handleHide()} className={"update_lead_form"}>
      <Modal.Header closeButton>
          <Modal.Title>Mark Communication</Modal.Title>
        </Modal.Header>
        <Modal.Body className={"communication"}>
          <textarea
            style={{width:'100%'}}
            value={txt}
            onChange={(e) => {
              setTxtArea(e.target.value);
            }}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={()=>setMarkAsUpdateState(false)}>Close</Button>
          <Button className={"update_lead_btn"} variant="dark" onClick={()=>handleApiRequest()}>
            Save
          </Button>
        </Modal.Footer>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    showMarkAsUpdateModal: state.showMarkAsUpdateModal,
    id:state.id
  };
}
function mapDispatchToProps(dispatch) {
  return { 
    setMarkAsUpdateState:(showState)=> dispatch(setMarkAsUpdateState(showState)),
    dispFetchedData:(showState)=> dispatch(setMarkAsUpdateState(showState))
}
}
export default connect(mapStateToProps, mapDispatchToProps)(MarkUpdateModal);
