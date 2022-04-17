import axios from 'axios';

const findAllTransaction = async () => {
 try {
  const response = await axios.get('http://localhost:4200/transactions');
  const resp = [];
  for (const transaction of response.data) {
   let newTrasaction = {
    amount: transaction.amount,
    date: transaction.date.split("T")[0],
    type: transaction.type,
    description: transaction.description,
    id: transaction.id
   }
   resp.push(newTrasaction);
  }
  return resp;
 } catch (e) {
  console.log(e);
 }
};

const addNewTransaction = async (transaction) => {
 try {
  let response = await axios.post('http://localhost:4200/transactions', transaction);
  return response.data;
 } catch (e) {
  console.log(e);
 }
};

const removeTransaction = async (transactionId) => {
 try {
  await axios.delete('http://localhost:4200/transactions/' + transactionId);
 } catch (e) {
 }
};

const editTransaction = async (transaction) => {
 try {
  let response = await axios.put('http://localhost:4200/transactions/' + transaction.id, transaction);
  return response.data;
 } catch (e) {
  console.log(e);
 }
};

export { findAllTransaction, addNewTransaction, removeTransaction, editTransaction };