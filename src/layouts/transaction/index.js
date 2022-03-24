// @mui material components
// Material Dashboard 2 React components

import DashboardLayout from 'components/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/Navbars/DashboardNavbar';
import Footer from 'components/Footer';
import { useTransaction } from '../../context/transaction';
import { useCallback, useEffect } from 'react';
import { findAllTransaction } from '../../service/transactionService';
import { TransactionTable } from '../../components/TransactionTable';

function Transactions() {
 const {transactions, setTransactions} = useTransaction();

 const allTransactionArray = useCallback(async () => {
  const response = await findAllTransaction();
  setTransactions(response);
 }, [setTransactions]);

 useEffect(() => {
  allTransactionArray().then();
 }, [allTransactionArray]);

 return (transactions !== null &&
   (<DashboardLayout>
    <DashboardNavbar/>
    <TransactionTable/>
    <Footer/>
   </DashboardLayout>)
 );
}

export { Transactions };
