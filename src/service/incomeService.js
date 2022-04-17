const getIncomeTransactions = (transactions, type) => {
 let transactionFiltered = 0.0;
 if (transactions === null || transactions === undefined) {
  return 0.0;
 }

 for (const transaction of transactions) {
  if (transaction.type === type) {
   transactionFiltered += parseFloat(transaction.amount);
  }
 }
 return transactionFiltered.toFixed(2);
};

const getBalanceMonthly = (transactions) => {
 let balance = 0.0;
 if (transactions === null || transactions === undefined) {
  return 0.0;
 }
  for (const transaction of transactions) {
   if (transaction.type === 'deposit') {
    balance += parseFloat(transaction.amount);
   } else if (transaction.type === 'withdraw') {
    balance -= parseFloat(transaction.amount);
   }
  }
 return balance.toFixed(2);
};

export { getIncomeTransactions, getBalanceMonthly };