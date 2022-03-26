import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import Dashboard from 'layouts/dashboard';
import { Transactions } from 'layouts/transaction';
import Profile from 'layouts/profile';
import SignIn from 'layouts/authentication/sign-in';
import SignUp from 'layouts/authentication/sign-up';

import { useTransaction } from '../context/transaction';

function PrivateRoute() {
 const {userLogged} = useTransaction();
 return userLogged ? <Outlet/> : <Navigate to="/"/>;
}

const RoutesApp = () => (
  <Routes>
   <Route exact path="/" element={<SignIn/>}/>
   <Route path="/sign-up" element={<SignUp/>}/>
   <Route path="/profile" element={<PrivateRoute/>}>
    <Route path="/profile" element={<Profile/>}/>
   </Route>
   <Route path="/transactions" element={<PrivateRoute/>}>
    <Route path="/transactions" element={<Transactions/>}/>
   </Route>
   <Route path="/dashboard" element={<PrivateRoute/>}>
    <Route path="/dashboard" element={<Dashboard/>}/>
   </Route>
  </Routes>
);

export { RoutesApp };
