import { useState } from "react";
import "./App.css";

function App() {
  // ✅ State to store input amount
  const [amount, setAmount] = useState("");

  // ✅ State to store whether user selected "Income" or "Expense"
  const [type, setType] = useState("Income");

  // ✅ State to store the list of all transactions (array of objects)
  const [transactions, setTransactions] = useState([]);

  // ✅ Calculate total Income
  const totalIncome = transactions
    .filter((t) => t.type === "Income") // only take "Income" items
    .reduce((acc, curr) => acc + curr.amount, 0); // add all income amounts

  // ✅ Calculate total Expense
  const totalExpense = transactions
    .filter((t) => t.type === "Expense") // only take "Expense" items
    .reduce((acc, curr) => acc + curr.amount, 0); // add all expense amounts

  // ✅ Balance = Income - Expense
  const balance = totalIncome - totalExpense;

  // ✅ Function runs when "Add" button is clicked
  function handledone() {
    // Check if input is empty or not a number
    if (amount.trim() === "" || isNaN(amount)) {
      alert("Please enter a valid amount");
      return;
    }

    const numAmount = Number(amount);

    // ❌ If it's an Expense and amount is greater than balance, block it
    if (type === "Expense" && numAmount > balance) {
      alert("❌ Not enough balance to add this expense!");
      return;
    }

    // Create new transaction object
    const newTransaction = {
      id: Date.now(), // unique id (timestamp)
      amount: numAmount,
      type: type,
    };

    // Add new transaction to list
    setTransactions([...transactions, newTransaction]);

    // Clear input after adding
    setAmount("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col items-center p-10 text-white">
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg">
        Expense Management System
      </h1>

      {/* ✅ Cards Section (Income, Expense, Balance) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 w-full max-w-5xl">
        {/* Income Card */}
        <div className="backdrop-blur-md bg-white/10 shadow-lg p-6 rounded-2xl text-center hover:scale-105 transition-transform">
          <h2 className="text-xl font-bold text-green-400">Income</h2>
          <p className="text-3xl font-semibold text-green-300">PKR: {totalIncome}</p>
        </div>

        {/* Expense Card */}
        <div className="backdrop-blur-md bg-white/10 shadow-lg p-6 rounded-2xl text-center hover:scale-105 transition-transform">
          <h2 className="text-xl font-bold text-red-400">Expense</h2>
          <p className="text-3xl font-semibold text-red-300">PKR: {totalExpense}</p>
        </div>

        {/* Balance Card */}
        <div className="backdrop-blur-md bg-white/10 shadow-lg p-6 rounded-2xl text-center hover:scale-105 transition-transform">
          <h2 className="text-xl font-bold text-blue-400">Balance</h2>
          <p className="text-3xl font-semibold text-blue-300">PKR: {balance}</p>
        </div>
      </div>

      {/* ✅ Input Section */}
      <div className="flex flex-wrap justify-center gap-4 mt-10 backdrop-blur-md bg-white/10 p-6 rounded-2xl shadow-lg">
        {/* Input for amount */}
        <input
          className="h-[10vh] border-2 border-gray-500 bg-black/40 text-white placeholder-gray-400 p-3 rounded-2xl w-60 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)} // update state when typing
        />

        {/* Select Income or Expense */}
        <select
          className="border-2 border-gray-500 bg-black/40 text-white p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={type}
          onChange={(e) => setType(e.target.value)} // update state when changing option
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        {/* Add Button */}
        <button
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg hover:opacity-90 transition"
          onClick={handledone}
        >
          Add
        </button>
      </div>

      {/* ✅ Transactions List */}
      <ul className="mt-10 w-full max-w-3xl space-y-4">
        {transactions.map((item) => (
          <li
            key={item.id}
            className={`flex justify-between items-center p-4 rounded-xl shadow-md backdrop-blur-md bg-white/10 hover:scale-[1.02] transition ${
              item.type === "Income"
                ? "border-l-4 border-green-400 text-green-300"
                : "border-l-4 border-red-400 text-red-300"
            }`}
          >
            {/* Show type (Income / Expense) */}
            <span className="font-semibold">{item.type}</span>

            {/* Show amount */}
            <span className="text-xl">PKR: {item.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
