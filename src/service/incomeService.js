import {number} from "prop-types";

const getIncomeTransactions = (transactions, type) => {
 if (!isTransactionValid(transactions)) {
  return 0.0;
 }

 let transactionFiltered = 0.0;
 for (const transaction of transactions) {
  if (transaction.type === type) {
   transactionFiltered += parseFloat(transaction.amount);
  }
 }
 return transactionFiltered.toFixed(2);
};

const getBalanceMonthly = (transactions) => {
 if (!isTransactionValid(transactions)) {
  return 0.0;
 }

 let balance = 0.0;
 for (const transaction of transactions) {
  if (transaction.type === 'deposit') {
   balance += parseFloat(transaction.amount);
  } else if (transaction.type === 'withdraw') {
   balance -= parseFloat(transaction.amount);
  }
 }
 return balance.toFixed(2);
};

function getTransactionGraphData(type, monthlyIncomeArray) {
 if (type === 'deposit') {
  return {
   income: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: {label: 'Income', data: monthlyIncomeArray}
   }
  };
 } else {
  return {
   cashOut: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: {label: 'Cash out', data: monthlyIncomeArray}
   }
  };
 }
}

const getMonthIncomeArray = (transactions, type) => {
 const monthlyIncomeArray = [];
 if (!isTransactionValid(transactions)) {
  return getTransactionGraphData(type, monthlyIncomeArray);
 }

 const monthArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
 for (const month of monthArray) {
  let amount = 0.0;
  for (const transaction of transactions) {
   const transactionMonth = transaction.date.split('-')[1];
   if (month === transactionMonth && transaction.type === type) {
    amount += parseFloat(transaction.amount);
   }
  }
  monthlyIncomeArray.push(amount);
 }

 return getTransactionGraphData(type, monthlyIncomeArray);
};

const getIncomeValues = (transactions) => {
 let income = 0;
 if (!isTransactionValid(transactions)) {
  return income;
 }

 for (const transaction of transactions) {
  if (transaction.type === 'deposit') {
   income += parseFloat(transaction.amount)
  }
 }
 return income;
}

const getCashOutValues = (transactions) => {
 let cashOut = 0;
 if (!isTransactionValid(transactions)) {
  return cashOut;
 }

 for (const transaction of transactions) {
  if (transaction.type === 'withdraw') {
   cashOut += parseFloat(transaction.amount)
  }
 }
 return cashOut;
}

const isTransactionValid = (transactions) => {
 return !(transactions === null || transactions === undefined);
};

export { getIncomeTransactions, getIncomeValues, getCashOutValues, getBalanceMonthly, getMonthIncomeArray };