import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import MDInput from '../../components/common/MDInput';

import './style.css';
import Icon from '@mui/material/Icon';
import MDTypography from '../common/MDTypography';
import MDButton from '../common/MDButton';
import { useMaterialUIController } from '../../context';
import { useTransaction } from '../../context/transaction';

import { addNewTransaction } from '../../service/transactionService';

const Modal = props => {
 const {transactions, setTransactions} = useTransaction();
 const [transactionToAdd, setTransaction] = useState({});
 const [controller] = useMaterialUIController();
 const {sidenavColor} = controller;
 const closeOnEscapeKeyDown = e => {
  if ((e.charCode || e.keyCode) === 27) {
   props.onClose();
  }
 };

 useEffect(() => {
  document.body.addEventListener('keydown', closeOnEscapeKeyDown);
  return function cleanup() {
   document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
  };
 }, []);

 async function handleAddNewTransaction() {
  let response = await addNewTransaction(transactionToAdd);
  setTransactions([...transactions, response]);
  setTransaction({});
  props.onClose();
 }

 return ReactDOM.createPortal(
   <CSSTransition
     in={props.show}
     unmountOnExit
     timeout={{enter: 0, exit: 300}}
   >
    <div className="modal" onClick={props.onClose}>
     <div className="modal-content" onClick={e => e.stopPropagation()}>
      <div className="modal-header">
       <MDTypography className="modal-title" variant="h5" color="dark">
        {props.title}
       </MDTypography>
       <Icon
         onClick={props.onClose}
       >
        close
       </Icon>
      </div>
      <div className="modal-body">
       <MDInput
         className="input"
         type="number"
         label="Value"
         style={{width: '300px'}}
         onChange={e => setTransaction({...transactionToAdd, value: e.target.value})}
       />
       <MDInput
         className="input"
         type="date"
         style={{width: '300px'}}
         onChange={e => setTransaction({...transactionToAdd, date: e.target.value})}
       />
       <MDInput
         className="input"
         label="Type"
         style={{width: '300px'}}
         onChange={e => setTransaction({...transactionToAdd, type: e.target.value})}/>
       <MDInput
         className="input"
         label="Category"
         style={{width: '300px'}}
         onChange={e => setTransaction({...transactionToAdd, category: e.target.value})}/>

       <MDButton
         className="buttonAdd"
         component="a"
         onClick={() => handleAddNewTransaction()}
         rel="noreferrer"
         variant="gradient"
         color={sidenavColor}
         size="medium"
       >
        Add
       </MDButton>
      </div>
     </div>
    </div>
   </CSSTransition>,
   document.getElementById('root')
 );
};

export default Modal;
