import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import ProductManagment from '../pages/ProductManagment'
import CategoryManagment from '../pages/CategoryManagment'
import Sidebar from '../components/Sidebar'
import DashboardLayout from '../pages/Layout/DashboardLayout'

const MainRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/dashboard' element={<DashboardLayout/>}>
            <Route path='manage-product' element={<ProductManagment/>}/>
            <Route path='manage-category' element={<CategoryManagment/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default MainRouter