import axios from 'axios';

const findAllTransaction = async () => {
 try {
  const response = await axios.get('http://localhost:4200/transactions');
  return response.data;
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


export { findAllTransaction, addNewTransaction, removeTransaction };