import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <div>
        <h1>EXPENCE MANAGEMENT SYSTEM</h1>
        <hr />
        <div class='flex justify-center gap-3 mt-4 border-2 p-5'>

          <input class='h-[10vh] border-2 p-3 rounded-3xl w-2xl' type="text" placeholder='Enter A Amount' name="" id="" />
          <select class='border-2 rounded-2xl ' name="" id="">
            <option value="Income">Income</option>
            <option  value="Expence">Expence</option>
          </select>
          <button class='border-2'>Add</button>
        </div>
      </div>
    </>
  )
}

export default App
