// @mui material components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

// Material Dashboard 2 React components
import MDBox from 'components/common/MDBox';
import MDTypography from 'components/common/MDTypography';

import DashboardLayout from 'components/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/Navbars/DashboardNavbar';
import Footer from 'components/Footer';
import DataTable from 'components/Tables/DataTable';
import { useTransaction } from '../../context/transaction';
import { useCallback, useEffect } from 'react';
import { findAllTransaction } from '../../service/transactionService';

import { transactionRows } from '../../utils/fillTables';

function Transactions() {
 const {transactions, setTransactions} = useTransaction();

 const allTransactionArray = useCallback(async () => {
  const response = await findAllTransaction();
  setTransactions(response);
 }, [setTransactions]);

 useEffect(() => {
  allTransactionArray().then();
 }, [allTransactionArray]);

 const columns = [
  {Header: 'value', accessor: 'value', align: 'left'},
  {Header: 'date', accessor: 'date', align: 'center'},
  {Header: 'type', accessor: 'type', align: 'center'},
  {Header: 'category', accessor: 'category', align: 'center'},
  {Header: 'actions', accessor: 'actions', align: 'center'}
 ];

 const rows = transactionRows(transactions);

 return (transactions !== null &&
   (<DashboardLayout>
    <DashboardNavbar/>
    <MDBox pt={6} pb={3}>
     <Grid container spacing={6}>
      <Grid item xs={12}>
       <Card>
        <MDBox
          mx={2}
          mt={-3}
          py={3}
          px={2}
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
        >
         <MDTypography variant="h6" color="white">
          Transactions
         </MDTypography>
        </MDBox>
        <MDBox pt={3}>
         <DataTable
           table={{columns, rows}}
           isSorted={false}
           entriesPerPage={false}
           showTotalEntries={false}
           noEndBorder
         />
        </MDBox>
       </Card>
      </Grid>
     </Grid>
    </MDBox>
    <Footer/>
   </DashboardLayout>)
 );
}

export { Transactions };
