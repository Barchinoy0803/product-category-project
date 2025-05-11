import React, { useState } from 'react'
import useGet from '../../hooks/useGet'
import TableT from '../../components/Table';
import "./style.scss"
import { useOutletContext } from 'react-router-dom';

const ProductManagment = () => {
  const { reload, setReload, setProductsDialog } = useOutletContext()

  const { loading, error, data } = useGet("/products", reload)

  const handleDelete = (id) => {
    setProductsDialog({ isOpen: true, id, type: "delete" })
  }

  const handleUpdate = (id) => {
    setProductsDialog({ isOpen: true, id, type: "edit" })
  }

  return (
    <div className='table__wrapper'>
      <TableT loading={loading} handleUpdate={handleUpdate} handleDelete={handleDelete} data={data?.data || []} tableType="product"/>
    </div>
  )
}

export default ProductManagment