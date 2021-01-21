/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import '../styles/styles.css';
import ModalGrid from '../Components/ModalGrid';
import {
  setShowState,
  setDeleteShowState,
  setMarkAsUpdateState,
  setData,
} from '../store/actions';
import DeleteModal from '../Components/DeleteModal';
import MarkUpdateModal from '../Components/MarkUpdateModal';
import axiosInstance from '../Axios/axiosInstance';
import { connect } from 'react-redux';

const tableData = [
  {
    id: 1,
    updated_at: '2019-06-12T12:11:39.127842Z',
    created_at: '2019-06-12T12:11:39.127901Z',
    first_name: 'Nilesh',
    last_name: 'Agarwal',
    mobile: '9871028111',
    email: 'abc@gmail.com',
    location_type: 'City',
    location_string: 'India',
    status: 'Created',
    communication: null,
    tags: null,
  },
];
const MainHomePage = ({formRes,setData,setMarkAsUpdateState,dispDeleteModalShowState,dispModalShowState}) => {
  const handleMarksAsUpdate = (id) => {
    setMarkAsUpdateState(true, id);
  };

  const handleDeleteClick = (id) => {
    dispDeleteModalShowState(true, id);
  };
  useEffect(() => {
    //'userInfo.json'
    /*  */
    axiosInstance.get('/api/leads/?location_string=India')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [formRes]);
  return (
    <div className="homepage">
      <Button
        className="add_lead_modal_btn"
        variant="dark"
        onClick={() => dispModalShowState(true)}
      >
        Add lead
      </Button>
      <Table responsive="xl striped bordered hover" className="leads_table">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Mobile Num</th>
            <th>Email</th>
            <th>Loaction Type</th>
            <th>Loaction String</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((obj) => (
            <tr key={obj}>
              <td key={obj.first_name}>{obj.first_name}</td>
              <td key={obj.last_name}>{obj.last_name}</td>
              <td key={obj.mobile}>{obj.mobile}</td>
              <td key={obj.email}>{obj.email}</td>
              <td key={obj.location_type}>{obj.location_type}</td>
              <td key={obj.location_string}>{obj.location_string}</td>
              <td>
                <Button
                  className="update_lead_modal_btn"
                  variant="dark"
                  onClick={() => handleMarksAsUpdate(obj.id)}
                >
                  Mark Update
                </Button>
                <Button
                  className="delete_lead_modal_btn"
                  variant="dark"
                  onClick={() => handleDeleteClick(obj.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <MarkUpdateModal />
      <ModalGrid />
      <DeleteModal />
    </div>
  );
};
function mapStateToProps(state) {
  return {
    tableData: state.tableData,
    showDeleteModal: state.showDeleteModal,
    showMarkAsUpdateModal: state.showMarkAsUpdateModal,
    formRes: state.formRes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispModalShowState: (showState) => dispatch(setShowState(showState)),
    dispDeleteModalShowState: (showState, id) => dispatch(setDeleteShowState(showState, id)),
    setMarkAsUpdateState: (state, id) => dispatch(setMarkAsUpdateState(state, id)),
    setData: (data)=> dispatch(setData(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainHomePage);
