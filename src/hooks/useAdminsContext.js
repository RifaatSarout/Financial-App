import { AdminsContext } from '../context/AdminContext'
import { useContext } from 'react'


export const useAdminsContext = () => {
  const context = useContext(AdminsContext)

  if (!context) {
    throw Error("error")
  }

  return context
}