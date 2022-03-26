import axios from 'axios';

const createNewUser = async (user) => {
 try {
  let response = await axios.post('http://localhost:4200/users', user);
  return response.data;
 } catch (e) {
  console.log(e);
 }
};

const findAllUser = async () => {
 try {
  let response = await axios.get('http://localhost:4200/users');
  return response.data;
 } catch (e) {
  console.log(e);
 }
};

export { createNewUser, findAllUser };