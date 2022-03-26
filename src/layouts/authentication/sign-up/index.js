import { Link, Navigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import MDBox from 'components/common/MDBox';
import MDTypography from 'components/common/MDTypography';
import MDInput from 'components/common/MDInput';
import MDButton from 'components/common/MDButton';
import CoverLayout from 'layouts/authentication/components/CoverLayout';
import bgImage from 'assets/images/bg-sign-up-cover.jpeg';
import { useState } from 'react';
import { createNewUser } from '../../../service/userService';

function Cover() {
 const [newUser, setNewUser] = useState(null);
 const [isCreated, setIsCreated] = useState(false);

 async function handleAddNewUser() {
  if (newUser === null || newUser.name === '' || newUser.email === '' || newUser.password === '') {
   console.log('Error: Name, email or user invalid, try with valid values.');
   return;
  }

  let response = await createNewUser(newUser);
  if (response.id !== undefined) {
   setIsCreated(true);
  }
 }

 return (
   isCreated ? <Navigate to="/"/>
     : <CoverLayout image={bgImage}>
      <Card>
       <MDBox
         variant="gradient"
         bgColor="info"
         borderRadius="lg"
         coloredShadow="success"
         mx={2}
         mt={-3}
         p={3}
         mb={1}
         textAlign="center"
       >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
         Join us today
        </MDTypography>
        <MDTypography display="block" variant="button" color="white" my={1}>
         Enter your email and password to register
        </MDTypography>
       </MDBox>
       <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form">
         <MDBox mb={2}>
          <MDInput
            type="text"
            label="Name"
            variant="standard"
            fullWidth
            onChange={e => setNewUser({...newUser, name: e.target.value})}
          />
         </MDBox>
         <MDBox mb={2}>
          <MDInput
            type="email"
            label="Email"
            variant="standard"
            fullWidth
            onChange={e => setNewUser({...newUser, email: e.target.value})}
          />
         </MDBox>
         <MDBox mb={2}>
          <MDInput
            type="password"
            label="Password"
            variant="standard"
            fullWidth
            onChange={e => setNewUser({...newUser, password: e.target.value})}
          />
         </MDBox>
         <MDBox display="flex" alignItems="center" ml={-1}>
          <Checkbox/>
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            sx={{cursor: 'pointer', userSelect: 'none', ml: -1}}
          >
           &nbsp;&nbsp;I agree the&nbsp;
          </MDTypography>
          <MDTypography
            component="a"
            href="#"
            variant="button"
            fontWeight="bold"
            color="info"
            textGradient
          >
           Terms and Conditions
          </MDTypography>
         </MDBox>
         <MDBox mt={4} mb={1}>
          <MDButton
            variant="gradient"
            color="info"
            fullWidth
            onClick={() => handleAddNewUser()}
          >
           sign in
          </MDButton>
         </MDBox>
         <MDBox mt={3} mb={1} textAlign="center">
          <MDTypography variant="button" color="text">
           Already have an account?{' '}
           <MDTypography
             component={Link}
             to="/"
             variant="button"
             color="info"
             fontWeight="medium"
             textGradient
           >
            Sign In
           </MDTypography>
          </MDTypography>
         </MDBox>
        </MDBox>
       </MDBox>
      </Card>
     </CoverLayout>
 );
}

export default Cover;
