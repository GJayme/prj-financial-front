import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
import MDBox from 'components/common/MDBox';
import MDTypography from 'components/common/MDTypography';
import MDInput from 'components/common/MDInput';
import MDButton from 'components/common/MDButton';
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import bgImage from 'assets/images/bg-sign-in-basic.jpeg';
import { useTransaction } from '../../../context/transaction';
import { findAllUser } from '../../../service/userService';

function Basic() {
 const [rememberMe, setRememberMe] = useState(false);
 const [user, setUser] = useState(null);
 const {userLogged, setUserLogged} = useTransaction();

 const handleSetRememberMe = () => setRememberMe(!rememberMe);

 async function handleLoginUser() {
  if (user === null || user.email === '' || user.password === '') {
   console.log('Error: please try with valid user info to doing login.');
   return;
  }

  let users = await findAllUser();
  for (const userDB of users) {
   if (userDB.email === user.email && userDB.password === user.password) {
    setUserLogged(userDB);
    break;
   }
  }
 }

 return (userLogged !== null ? <Navigate to="/dashboard"/> :
     <BasicLayout image={bgImage}>
      <Card>
       <MDBox
         variant="gradient"
         bgColor="info"
         borderRadius="lg"
         coloredShadow="info"
         mx={2}
         mt={-3}
         p={2}
         mb={1}
         textAlign="center"
       >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
         Financial
        </MDTypography>
       </MDBox>
       <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form">
         <MDBox mb={2}>
          <MDInput
            type="email"
            label="Email"
            fullWidth
            onChange={e => setUser({...user, email: e.target.value})}
          />
         </MDBox>
         <MDBox mb={2}>
          <MDInput
            type="password"
            label="Password"
            fullWidth
            onChange={e => setUser({...user, password: e.target.value})}
          />
         </MDBox>
         <MDBox display="flex" alignItems="center" ml={-1}>
          <Switch checked={rememberMe} onChange={handleSetRememberMe}/>
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            onClick={handleSetRememberMe}
            sx={{cursor: 'pointer', userSelect: 'none', ml: -1}}
          >
           &nbsp;&nbsp;Remember me
          </MDTypography>
         </MDBox>
         <MDBox mt={4} mb={1}>
          <MDButton
            variant="gradient"
            color="info"
            fullWidth
            onClick={() => handleLoginUser()}
          >
           sign in
          </MDButton>
         </MDBox>
         <MDBox mt={3} mb={1} textAlign="center">
          <MDTypography variant="button" color="text">
           Don&apos;t have an account?{' '}
           <MDTypography
             component={Link}
             to="/sign-up"
             variant="button"
             color="info"
             fontWeight="medium"
             textGradient
           >
            Sign up
           </MDTypography>
          </MDTypography>
         </MDBox>
        </MDBox>
       </MDBox>
      </Card>
     </BasicLayout>
 );
}

export default Basic;
