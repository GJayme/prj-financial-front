import {createContext, useContext, useState} from 'react';

const TransactionContext = createContext();

export function TransactionProvider({children}) {
 const [userId, setUserId] = useState(-1);
 const [transactions, setTransactions] = useState(null)

 return (
   <TransactionContext.Provider
     value={{
      userId,
      setUserId,
      transactions: transactions,
      setTransactions: setTransactions
     }}
   >
    {children}
   </TransactionContext.Provider>
 );
}

export function useTransaction() {
 const context = useContext(TransactionContext);
 const {userId, setUserId, transactions, setTransactions} = context;
 return {userId, setUserId, transactions, setTransactions};
}