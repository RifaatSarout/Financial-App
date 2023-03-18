import { CategoriesContext } from '../context/CategoryContext'
import { useContext } from 'react'


export const useCategoriessContext = () => {
  const context = useContext(CategoriesContext)

  if (!context) {
    throw Error("error")
  }

  return context
}