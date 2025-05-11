import { useState } from 'react'
import './App.scss'
import MainRouter from './routes'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
     <MainRouter/>
     <ToastContainer />
    </>
  )
}
 
export default App
