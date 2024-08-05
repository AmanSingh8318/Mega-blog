import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import service from "./appwrite/auth"
import { Footer, Header } from './component/index'
import { login, logout } from "./store/authSlice"


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    service.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-blue-200'>
      <div className='w-full block'>
        <Header />
        {/* <main> */}
        {/* TODO:  <Outlet /> */}
        {/* </main> */}
        <Footer />
      </div>
    </div>
  ) : null
}

export default App