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

import { addNewTransaction, editTransaction } from '../../service/transactionService';

const Modal = props => {
 const {transactions, setTransactions} = useTransaction();
 const [transactionToAdd, setTransactionToAdd] = useState({});
 const [oldTransaction, setOldTransaction] = useState({});
 const [controller] = useMaterialUIController();
 const {sidenavColor} = controller;
 const closeOnEscapeKeyDown = e => {
  if ((e.charCode || e.keyCode) === 27) {
   props.onClose();
  }
 };

 useEffect(() => {
  if (props.editTransaction !== null) {
   let editTransaction = {
    amount: props.editTransaction.amount,
    date: props.editTransaction.date,
    type: props.editTransaction.type,
    description: props.editTransaction.description,
    id: props.editTransaction.id
   };
   setTransactionToAdd(editTransaction);
   setOldTransaction(editTransaction);
  }
 }, [props.editTransaction])

 useEffect(() => {
  document.body.addEventListener('keydown', closeOnEscapeKeyDown);
  return function cleanup() {
   document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
  };
 }, []);

 async function handleAddNewTransaction() {
  let response = await addNewTransaction(transactionToAdd);
  setTransactions([...transactions, response]);
  setTransactionToAdd({});
  props.onClose();
 }

 async function handleEditTransaction() {

  let transactionsWithoutOldTransaction = transactions.filter(t => t.id !== oldTransaction.id);
  let response = await editTransaction(transactionToAdd);
  setTransactions([...transactionsWithoutOldTransaction, response]);
  setTransactionToAdd({});
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
       {props.editTransaction !== null ?
         <>
          <MDInput
            className="input"
            type="number"
            label="Amount"
            style={{width: '300px'}}
            defaultValue = {props.editTransaction.amount}
            onChange={e => setTransactionToAdd({...transactionToAdd, amount: e.target.value})}
          />
          <MDInput
            className="input"
            type="date"
            style={{width: '300px'}}
            defaultValue = {props.editTransaction.date}
            onChange={e => setTransactionToAdd({...transactionToAdd, date: e.target.value})}
          />
          <MDInput
            className="input"
            label="Type"
            style={{width: '300px'}}
            defaultValue = {props.editTransaction.type}
            onChange={e => setTransactionToAdd({...transactionToAdd, type: e.target.value})}/>
          <MDInput
            className="input"
            label="Description"
            style={{width: '300px'}}
            defaultValue = {props.editTransaction.description}
            onChange={e => setTransactionToAdd({...transactionToAdd, description: e.target.value})}/>

          <MDButton
            className="buttonAdd"
            component="a"
            onClick={() => handleEditTransaction()}
            rel="noreferrer"
            variant="gradient"
            color={sidenavColor}
            size="medium"
          >
           Edit
          </MDButton>
         </>
         :
         <>
          <MDInput
            className="input"
            type="number"
            label="Amount"
            style={{width: '300px'}}
            onChange={e => setTransactionToAdd({...transactionToAdd, amount: e.target.value})}
          />
          <MDInput
            className="input"
            type="date"
            style={{width: '300px'}}
            onChange={e => setTransactionToAdd({...transactionToAdd, date: e.target.value})}
          />
          <MDInput
            className="input"
            label="Type"
            style={{width: '300px'}}
            onChange={e => setTransactionToAdd({...transactionToAdd, type: e.target.value})}/>
          <MDInput
            className="input"
            label="Description"
            style={{width: '300px'}}
            onChange={e => setTransactionToAdd({...transactionToAdd, description: e.target.value})}/>

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
         </>
       }
      </div>
     </div>
    </div>
   </CSSTransition>,
   document.getElementById('root')
 );
};

export default Modal;
