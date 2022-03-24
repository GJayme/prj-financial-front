import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import MDBox from 'components/common/MDBox';

import typography from 'assets/theme/base/typography';

function Footer({light}) {
 const {size} = typography;

 return (
   <MDBox position="absolute" width="100%" bottom={0} py={4}>
    <Container>
     <MDBox
       display="flex"
       justifyContent="center"
       alignItems="center"
       flexWrap="wrap"
       color={light ? 'white' : 'text'}
       fontSize={size.sm}
     >
      &copy; Financial Team - {new Date().getFullYear()}
     </MDBox>
    </Container>
   </MDBox>
 );
}

Footer.defaultProps = {
 light: false
};

Footer.propTypes = {
 light: PropTypes.bool
};

export default Footer;
