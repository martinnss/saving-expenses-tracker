import React from 'react'
import { useAddTransaction } from '../Hooks/useAddTransactions'

const Tracker = () => {
  const {addTransaction} = useAddTransaction()

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description:"description test",
      transactionAmount:99,
      transactionType: "transaction test"
    })
  }

  return (
    <div>
      <h1>Tracker</h1>
      <form onSubmit={onSubmit}>
        <input type="text" />

        <button type='submit'>Add Transaction</button>
      </form>
    </div>
  )
}

export default Tracker