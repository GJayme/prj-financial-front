import Grid from '@mui/material/Grid';
import MDBox from 'components/common/MDBox';
import DashboardLayout from 'components/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/Navbars/DashboardNavbar';
import ReportsLineChart from 'components/Charts/LineCharts/ReportsLineChart';
import ComplexStatisticsCard from 'components/Cards/StatisticsCards/ComplexStatisticsCard';
import Footer from '../../components/Footer';
import { TransactionTable } from '../../components/TransactionTable';
import { useTransaction } from '../../context/transaction';
import { getBalanceMonthly, getIncomeTransactions, getMonthIncomeArray } from '../../service/incomeService';


function Dashboard() {
 const {transactions} = useTransaction();

 const {income} = getMonthIncomeArray(transactions, 'deposit');
 const {cashOut} = getMonthIncomeArray(transactions, 'withdraw');
 const incomeTransaction = getIncomeTransactions(transactions, 'deposit');
 const withdrawTransaction = getIncomeTransactions(transactions, 'withdraw');
 const balanceTransaction = getBalanceMonthly(transactions);

 return (
   <DashboardLayout>
    <DashboardNavbar/>
    <MDBox py={3}>
     <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4}>
       <MDBox mb={1.5}>
        <ComplexStatisticsCard
          color="success"
          icon="arrow_downward"
          title="Income"
          count={`R$ ${incomeTransaction}`}
          percentage={{
           color: 'success',
           amount: '+55%',
           label: 'month'
          }}
        />
       </MDBox>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
       <MDBox mb={1.5}>
        <ComplexStatisticsCard
          color="error"
          icon="arrow_upward"
          title="Cash out"
          count={`R$ ${withdrawTransaction}`}
          percentage={{
           color: 'success',
           amount: '+3%',
           label: 'month'
          }}
        />
       </MDBox>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
       <MDBox mb={1.5}>
        <ComplexStatisticsCard
          icon="balance"
          title="Balance"
          count={`R$ ${balanceTransaction}`}
          percentage={{
           color: 'success',
           amount: '+1%',
           label: 'month'
          }}
        />
       </MDBox>
      </Grid>
      {/*<Grid item xs={12} md={6} lg={3}>*/}
      {/* <MDBox mb={1.5}>*/}
      {/*  <ComplexStatisticsCard*/}
      {/*    color="primary"*/}
      {/*    icon="person_add"*/}
      {/*    title="Followers"*/}
      {/*    count="+91"*/}
      {/*    percentage={{*/}
      {/*     color: 'success',*/}
      {/*     amount: '',*/}
      {/*     label: 'Just updated'*/}
      {/*    }}*/}
      {/*  />*/}
      {/* </MDBox>*/}
      {/*</Grid>*/}
     </Grid>
     <MDBox mt={4.5}>
      <Grid container spacing={3}>
       {/*<Grid item xs={12} md={6} lg={4}>*/}
       {/* <MDBox mb={3}>*/}
       {/*  <ReportsBarChart*/}
       {/*    color="info"*/}
       {/*    title="website views"*/}
       {/*    description="Last Campaign Performance"*/}
       {/*    date="campaign sent 2 days ago"*/}
       {/*    chart={reportsBarChartData}*/}
       {/*  />*/}
       {/* </MDBox>*/}
       {/*</Grid>*/}
       <Grid item xs={12} md={6} lg={6}>
        <MDBox mb={3}>
         <ReportsLineChart
           color="success"
           title="month income"
           description={
            <>
             (<strong>+15%</strong>) increase in today sales.
            </>
           }
           date="updated 4 min ago"
           chart={income}
         />
        </MDBox>
       </Grid>
       <Grid item xs={12} md={6} lg={6}>
        <MDBox mb={3}>
         <ReportsLineChart
           color="error"
           title="month cash out"
           description="Last Campaign Performance"
           date="just updated"
           chart={cashOut}
         />
        </MDBox>
       </Grid>
      </Grid>
     </MDBox>
     <TransactionTable/>
    </MDBox>
    <Footer/>
   </DashboardLayout>
 );
}

export default Dashboard;
