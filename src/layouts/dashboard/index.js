// @mui material components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

// Material Dashboard 2 React components
import MDBox from 'components/common/MDBox';

// Material Dashboard 2 React example components
import DashboardLayout from 'components/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/Navbars/DashboardNavbar';
import Footer from 'components/Footer';
import ReportsBarChart from 'components/Charts/BarCharts/ReportsBarChart';
import ReportsLineChart from 'components/Charts/LineCharts/ReportsLineChart';
import ComplexStatisticsCard from 'components/Cards/StatisticsCards/ComplexStatisticsCard';

// Data
import reportsBarChartData from 'layouts/dashboard/data/reportsBarChartData';
import reportsLineChartData from 'layouts/dashboard/data/reportsLineChartData';

// Dashboard components
import MDTypography from '../../components/common/MDTypography';
import DataTable from '../../components/Tables/DataTable';
import { useTransaction } from '../../context/transaction';
import { useCallback, useEffect } from 'react';
import { findAllTransaction } from '../../service/transactionService';
import { transactionRows } from '../../utils/fillTables';

function Dashboard() {
 const {sales, tasks} = reportsLineChartData;
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

 return (
   <DashboardLayout>
    <DashboardNavbar/>
    <MDBox py={3}>
     <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
       <MDBox mb={1.5}>
        <ComplexStatisticsCard
          color="dark"
          icon="weekend"
          title="Bookings"
          count={281}
          percentage={{
           color: 'success',
           amount: '+55%',
           label: 'than lask week'
          }}
        />
       </MDBox>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
       <MDBox mb={1.5}>
        <ComplexStatisticsCard
          icon="leaderboard"
          title="Today's Users"
          count="2,300"
          percentage={{
           color: 'success',
           amount: '+3%',
           label: 'than last month'
          }}
        />
       </MDBox>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
       <MDBox mb={1.5}>
        <ComplexStatisticsCard
          color="success"
          icon="store"
          title="Revenue"
          count="34k"
          percentage={{
           color: 'success',
           amount: '+1%',
           label: 'than yesterday'
          }}
        />
       </MDBox>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
       <MDBox mb={1.5}>
        <ComplexStatisticsCard
          color="primary"
          icon="person_add"
          title="Followers"
          count="+91"
          percentage={{
           color: 'success',
           amount: '',
           label: 'Just updated'
          }}
        />
       </MDBox>
      </Grid>
     </Grid>
     <MDBox mt={4.5}>
      <Grid container spacing={3}>
       <Grid item xs={12} md={6} lg={4}>
        <MDBox mb={3}>
         <ReportsBarChart
           color="info"
           title="website views"
           description="Last Campaign Performance"
           date="campaign sent 2 days ago"
           chart={reportsBarChartData}
         />
        </MDBox>
       </Grid>
       <Grid item xs={12} md={6} lg={4}>
        <MDBox mb={3}>
         <ReportsLineChart
           color="success"
           title="daily sales"
           description={
            <>
             (<strong>+15%</strong>) increase in today sales.
            </>
           }
           date="updated 4 min ago"
           chart={sales}
         />
        </MDBox>
       </Grid>
       <Grid item xs={12} md={6} lg={4}>
        <MDBox mb={3}>
         <ReportsLineChart
           color="dark"
           title="completed tasks"
           description="Last Campaign Performance"
           date="just updated"
           chart={tasks}
         />
        </MDBox>
       </Grid>
      </Grid>
     </MDBox>
     {/*<MDBox>*/}
     {/*  <Grid container spacing={3}>*/}
     {/*    <Grid item xs={12} md={6} lg={8}>*/}
     {/*      <Projects />*/}
     {/*    </Grid>*/}
     {/*    <Grid item xs={12} md={6} lg={4}>*/}
     {/*      <OrdersOverview />*/}
     {/*    </Grid>*/}
     {/*  </Grid>*/}
     {/*</MDBox>*/}
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

    </MDBox>
    <Footer/>
   </DashboardLayout>
 );
}

export default Dashboard;
