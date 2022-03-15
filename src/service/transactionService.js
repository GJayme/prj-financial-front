import axios from 'axios';

const findAllTransaction = async () => {
 try {
  const response = await axios.get('http://localhost:4200/transactions');
  if (response.data.length !== 0) {
   console.log(response.data);
   return response.data;
  } else {
   console.log('Error to find all transactions.');
  }
 } catch (e) {
  console.log(e);
 }
};


export { findAllTransaction };