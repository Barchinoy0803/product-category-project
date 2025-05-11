import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getCategoriesDialogTitle, getCategoriesDialogButtonTitle } from "./helpers.js"
import usePost from '../../hooks/usePost.js';
import useDelete from '../../hooks/useDelete.js';
import usePatch from '../../hooks/usePatch.js';
import "./style.scss"
import useGet from '../../hooks/useGet.js';

export default function CategoryDialog({ categoryDialog: { isOpen, type, id }, setCategoryDialog, setReload }) {
  const [title, setTitle] = useState("");

  const { data: category } = useGet(`/categories/${id}`, false, id === undefined)


  const { post } = usePost();
  const { deleteData, loading } = useDelete()
  const { patchData, loading: patchLoading } = usePatch()

    useEffect(() => {
      if (type === "edit") {
        const { name } = category
        setTitle(name)
      }
    }, [category, id])


  const handleClose = () => {
    setTitle("")
    setCategoryDialog({ isOpen: false, type: "add", id: undefined })
  };  

  const handleSubmit = async (e) => {
    e.preventDefault()
    const category = { name: title }

    if (type === "add") {
      await post("categories", category)
    }
    if (type === "edit") {
      await patchData(`categories/${id}`, category)
    }
    if(type === "delete"){
      await deleteData(`/categories/${id}`)
    }

    setReload((p) => !p)
    handleClose();
  }
  

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {getCategoriesDialogTitle(type)}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => handleSubmit(e)} action=""  className="dialog__content">
          {
            type === "add" || type === "edit" ?
              <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Name..." />
              : <p>Are you sure?</p>
          }
          <DialogActions>
            <Button onClick={handleClose} disabled={loading || patchLoading}>Cancel</Button>
            <Button type='submit' variant='contained' disabled={loading || patchLoading}>
              {getCategoriesDialogButtonTitle(type)}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
