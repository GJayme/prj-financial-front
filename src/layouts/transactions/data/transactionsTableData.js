import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Icon from '@mui/material/Icon';

export function transactionsTableData() {
 const Transaction = ({name}) => (
   <MDBox lineHeight={1} textAlign="left">
    <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
     {name}
    </MDTypography>
   </MDBox>
 );

 return {
  columns: [
   {Header: 'value', accessor: 'value', align: 'left'},
   {Header: 'date', accessor: 'date', align: 'center'},
   {Header: 'type', accessor: 'type', align: 'center'},
   {Header: 'category', accessor: 'category', align: 'center'},
   {Header: 'actions', accessor: 'actions', align: 'center'}
  ],

  rows: [
   {
    value: 'R$ 2000.60',
    date: '20/02/222',
    type: 'Deposit',
    category: <Transaction name="Salário"/>,
    actions: (
      <MDBox lineHeight={1} textAlign="left" display="flex">
       <MDTypography component="a" href="#edit" variant="caption" color="text" fontWeight="medium">
        <Icon fontSize="small">edit_icon</Icon>
       </MDTypography>
       <MDBox>
        <MDTypography component="a" href="#remove" variant="caption" color="text" fontWeight="medium">
         <Icon fontSize="small">delete</Icon>
        </MDTypography>
       </MDBox>
      </MDBox>
    )
   },
   {
    value: 'R$ 500.60',
    date: '20/02/222',
    type: 'Withdraw',
    category: <Transaction name="Aluguel"/>,
    actions: (
      <MDBox lineHeight={1} textAlign="left" display="flex">
       <MDTypography component="a" href="#edit" variant="caption" color="text" fontWeight="medium">
        <Icon fontSize="small">edit_icon</Icon>
       </MDTypography>
       <MDBox>
        <MDTypography component="a" href="#remove" variant="caption" color="text" fontWeight="medium">
         <Icon fontSize="small">delete</Icon>
        </MDTypography>
       </MDBox>
      </MDBox>
    )
   }
  ]
 };
}
