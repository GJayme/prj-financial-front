import MDBox from '../common/MDBox';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import { navbarIconButton } from '../Navbars/DashboardNavbar/styles';
import { findAllTransaction, removeTransaction } from '../../service/transactionService';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import MDTypography from '../common/MDTypography';
import DataTable from '../Tables/DataTable';
import Modal from '../TransactionModal';
import { useCallback, useEffect, useState } from 'react';
import { useTransaction } from '../../context/transaction';
import transition from 'react-transition-group/Transition';

function TransactionTable() {
 const [openAddTransactionMenu, setOpenAddTransactionMenu] = useState(false);
 const {transactions, setTransactions} = useTransaction();

 const allTransactionArray = useCallback(async () => {
  const response = await findAllTransaction();
  setTransactions(response);
 }, [setTransactions]);

 useEffect(() => {
  allTransactionArray().then();
 }, [allTransactionArray]);

 function handleEditTransaction(transaction) {
  console.log(transaction);
 }

 async function handleDeleteTransaction(transactionToRemove) {
  let newTransaction = transactions.filter(t => t !== transactionToRemove)
  setTransactions(newTransaction);
  await removeTransaction(transactionToRemove.id);
 }

 function getRows() {
  const row = [];
  if (transactions === null) {
   return;
  }

  if (transactions.length === 0) {
   return row;
  }

  for (const transaction of transactions) {
   const transactionElement = {
    value: transaction.value,
    date: transaction.date,
    type: transaction.type,
    category: transaction.category,
    actions: (
      <MDBox lineHeight={1} textAlign="left" display="flex">
       <IconButton
         size="small"
         disableRipple
         color="secondary"
         sx={navbarIconButton}
         onClick={() => handleEditTransaction(transaction)}
       >
        <Icon>edit_icon</Icon>
       </IconButton>
       <IconButton
         size="small"
         disableRipple
         color="secondary"
         sx={navbarIconButton}
         onClick={() => handleDeleteTransaction(transaction)}
       >
        <Icon>delete</Icon>
       </IconButton>
      </MDBox>
    )
   };
   row.push(transactionElement);
  }
  return row;
 }

 const columns = [
  {Header: 'value', accessor: 'value', align: 'left'},
  {Header: 'date', accessor: 'date', align: 'center'},
  {Header: 'type', accessor: 'type', align: 'center'},
  {Header: 'category', accessor: 'category', align: 'center'},
  {Header: 'actions', accessor: 'actions', align: 'center'}
 ];

 const rows = getRows(transactions);

 return (
   <MDBox pt={3}>
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
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
         <MDTypography variant="h6" color="white">
          Transactions
         </MDTypography>
         <div style={{
          width: '25px',
          height: '25px',
          borderRadius: '100%',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center'
         }}>
          <IconButton
            size="small"
            disableRipple
            color="secondary"
            sx={navbarIconButton}
            onClick={() => setOpenAddTransactionMenu(true)}
          >
           <Icon>add_icon</Icon>
          </IconButton>
         </div>
        </div>
       </MDBox>
       {transactions !== null &&
         <MDBox pt={3}>
          <DataTable
            table={{columns, rows}}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
          />
         </MDBox>}
      </Card>
     </Grid>
    </Grid>

    <Modal title="Add new transaction" onClose={() => setOpenAddTransactionMenu(false)} show={openAddTransactionMenu}/>
   </MDBox>);
}

export { TransactionTable };