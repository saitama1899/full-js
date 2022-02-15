import { useState } from 'react'

export const useErrorMessage = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const addErrorMessage = (error) => {
    setErrorMessage(error)
  }

  return {
    errorMessage,
    addErrorMessage
  }
}