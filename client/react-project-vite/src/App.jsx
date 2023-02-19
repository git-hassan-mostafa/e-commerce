import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const baseUrl = 'http://localhost:8000/api/v1'

  const createUser = async () => {
    const info = {
      email: "hassan2@gmail.com",
      username: "hassanmostafa2",
      password: "@88AAnn88oouunnii",
      firstname: "hassan",
      lastname: "mostafa",
      isAdmin: true,
      supplier: false
    }
    const response =await fetch(`${baseUrl}/auth/signup`,{
      method:'POST',
      credentials:'include',
      mode:'cors',
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify(info)
    })
    const data=await response.json()
    console.log(data)
  }
  const fetchData = async () => {
    const res = await fetch(`${baseUrl}/products`)
    const fetchdata = await res.json()
    console.log(fetchdata)
    setData(fetchdata)
  }
  useEffect(() => {
    
  }, [])


  return (
    <div className="App">
      <button onClick={createUser}> create user</button>
      <button onClick={fetchData}>get products</button>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </div>
  )
}

export default App
