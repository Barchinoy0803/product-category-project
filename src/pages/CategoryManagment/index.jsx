import React from 'react'
import useGet from '../../hooks/useGet'
import TableT from '../../components/Table'
import { useOutletContext } from 'react-router-dom'
import "./style.scss"

const CategoryManagment = () => {
  const { reload, setReload, setCategoryDialog } = useOutletContext()

  const { loading, error, data: categories } = useGet("/categories", reload)

  const handleDelete = (id) => {
    setCategoryDialog({ isOpen: true, id, type: "delete" })

  }

  const handleUpdate = (id) => {
    setCategoryDialog({ isOpen: true, id, type: "edit" })

  }
  return (
    <div className='table__wrapper'>
      <TableT loading={loading} handleDelete={handleDelete} handleUpdate={handleUpdate} data={categories?.data || []} tableType="category" />
    </div>
  )
}

export default CategoryManagment