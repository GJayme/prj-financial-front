import DashboardLayout from 'components/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/Navbars/DashboardNavbar';
import Footer from 'components/Footer';
import {useTransaction} from '../../context/transaction';
import {useCallback, useEffect} from 'react';
import {findAllTransaction} from '../../service/transactionService';
import {getIncomeValues, getCashOutValues} from "../../service/incomeService";
import {Pie} from "react-chartjs-2";
import MDBox from "../../components/common/MDBox";
import MDTypography from "../../components/common/MDTypography";
import Card from "@mui/material/Card";


function Analysis() {
    const {transactions, setTransactions} = useTransaction();
    const income = getIncomeValues(transactions);
    const cashOut = getCashOutValues(transactions);

    const data = {
        datasets: [{
            label: 'Accumulated flow',
            data: [cashOut, income],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)'],
        }],
        labels: ['Cash Out', 'Income']
    }

    const allTransactionArray = useCallback(async () => {
        const response = await findAllTransaction();
        setTransactions(response);
    }, [setTransactions]);

    useEffect(() => {
        allTransactionArray().then();
    }, [allTransactionArray]);

    return (transactions !== null &&
        (
            <DashboardLayout>
                <DashboardNavbar/>
                <MDBox mb={3}>
                    <Card sx={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <MDTypography variant="h6" textTransform="capitalize">Accumulated flow</MDTypography>
                        <MDBox>
                            <Pie data={data} style={{width: '500px'}}/>
                        </MDBox>
                    </Card>
                </MDBox>
                <Footer/>
            </DashboardLayout>)
    );
}

export {Analysis};
