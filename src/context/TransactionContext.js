import { createContext, useReducer } from 'react'

export const TransactionsContext = createContext()

export const transactionsReducer = (state, action) => {

  switch (action.type) {
    case 'SET_TRANSACTIONS': 
      return {
         transactions: action.payload
      }
    case 'CREATE_TRANSACTION':
      return {
        transactions: [action.payload, ...state.transactions]
      }
    case 'DELETE_TRANSACTION':
      return {
        transactions: state.transactions.filter((w) => w._id !== action.payload._id)
      }
      case 'UPDATE_TRANSACTION':
        return {
          ...state,
          transactions: state.transactions.map((transaction) => {
            if (transaction._id === action.payload._id) {
              return {
                ...transaction,
                ...action.payload.updatedTransaction
              }
            } else {
              return transaction
            }
          })
        }
    default:
      return state
  }
}


export const TransactionsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionsReducer, {
    transactions: []
  })

  return (
    <TransactionsContext.Provider value={{...state, dispatch}}>
      { children }
    </TransactionsContext.Provider>
  )
}