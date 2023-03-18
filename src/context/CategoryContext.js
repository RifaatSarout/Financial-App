import { createContext, useReducer } from 'react'

export const CategoriesContext = createContext()

export const CategoriesReducer = (state, action) => {

  switch (action.type) {
    case 'SET_CATEGORIES': 
      return {
         categories: action.payload
      }
    case 'CREATE_CATEGORY':
      return {
        categories: [action.payload, ...state.categories]
      }
    case 'UPDATE_CATEGORY':
        return {
          categories: state.categories.map((r) => r._id === action.payload._id ? action.payload : r)
        }
    default:
      return state
  }
}


export const CategoriesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CategoriesReducer, {
    categories: []
  })

  return (
    <CategoriesContext.Provider value={{...state, dispatch}}>
      { children }
    </CategoriesContext.Provider>
  )
}