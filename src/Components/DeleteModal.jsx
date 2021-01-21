import React from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import {setDeleteShowState} from './../store/actions'
import {deleteApi} from '../api-calls/api-call'
import axiosInstance from '../Axios/axiosInstance'

const DeleteModal = ({showDeleteModal,dispDeleteModalShowState,id}) => {
 const deleteApi = () => {
   console.log(`api/mark_lead/${id}`);
   debugger
   axiosInstance
      .delete(`api/mark_lead/${id}`)
      .then((
        dispDeleteModalShowState(false,id)
      ))
      .catch(()=> dispDeleteModalShowState(false,id));
};

  return (
    <Modal show={showDeleteModal} onHide={() => {
      dispDeleteModalShowState(false,undefined);
    }}>
      <Modal.Header closeButton>
          <Modal.Title>Do you wish to delete this lead</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            className={"delete_lead_btn"}
            onClick={() => deleteApi()}
            variant="danger"
          >
            Delete
          </Button>
          <Button
            variant="dark"
            onClick={(id) => dispDeleteModalShowState(false, id)}
          >
            Close
          </Button>
        </Modal.Footer>
     </Modal>
  );
};
function mapStateToProps(state) {
    return {
      tableData: state.tableData,
      showDeleteModal: state.showDeleteModal,
      id:state.id
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return { 
      dispDeleteModalShowState: (showState)=> dispatch(setDeleteShowState(showState))
      };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(DeleteModal);  
