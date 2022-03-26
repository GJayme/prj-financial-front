import {createContext, useContext, useState} from 'react';

const TransactionContext = createContext();

export function TransactionProvider({children}) {
 const [userLogged, setUserLogged] = useState(null);
 const [transactions, setTransactions] = useState(null)

 return (
   <TransactionContext.Provider
     value={{
      userLogged,
      setUserLogged,
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
 const {userLogged, setUserLogged, transactions, setTransactions} = context;
 return {userLogged, setUserLogged, transactions, setTransactions};
}