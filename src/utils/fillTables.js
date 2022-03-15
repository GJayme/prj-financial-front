import MDBox from '../components/common/MDBox';
import MDTypography from '../components/common/MDTypography';
import Icon from '@mui/material/Icon';

export function transactionRows(transactions) {
 const row = [];
 if (transactions === null) {
  return;
 }
 for (const transaction of transactions) {
  const transactionElement = {
   value: transaction.value,
   date: transaction.date,
   type: transaction.type,
   category: transaction.category,
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
  };
  row.push(transactionElement);
 }
 return row;
}