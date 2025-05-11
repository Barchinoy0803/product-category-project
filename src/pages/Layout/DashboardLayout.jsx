import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router-dom'
import "./style.scss"
import DashboardNavbar from '../../components/DashboardNavbar'
import ProductsDialog from '../../components/ProductsDialog'
import CategoryDialog from '../../components/CategoryDialog'

const DashboardLayout = () => {
    const [productsDialog, setProductsDialog] = useState({ isOpen: false, id: undefined, type: "add" })
    const [categoryDialog, setCategoryDialog] = useState({isOpen: false, id: undefined, type: "add"})
    const [reload, setReload] = useState(false)

    return (
        <div className='dashboard__layout'>
            <Sidebar />
            <div className='outlet__wrapper'>
                <DashboardNavbar setProductsDialog={setProductsDialog} setCategoryDialog={setCategoryDialog}/>
                <Outlet context={{ reload, setReload, setProductsDialog, setCategoryDialog }} />
                <ProductsDialog setReload={setReload} reload={reload} productsDialog={productsDialog} setProductsDialog={setProductsDialog} />
                <CategoryDialog setReload={setReload} categoryDialog={categoryDialog} setCategoryDialog={setCategoryDialog}/>
            </div>
        </div>
    )
}

export default DashboardLayout