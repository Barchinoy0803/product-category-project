import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  getProductsDialogButtonTitle,
  getProductsDialogTitle,
} from "./helpers";
import useGet from "../../hooks/useGet";
import "./style.scss";
import usePost from "../../hooks/usePost";
import useDelete from "../../hooks/useDelete";
import usePatch from "../../hooks/usePatch";

export default function ProductsDialog({
  productsDialog: { isOpen, type, id },
  setProductsDialog,
  setReload 
}) {

  const [nameValue, setNameValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [imageValue, setImageValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  const { data: categories } = useGet("/categories");
  const { data: product } = useGet(`/products/${id}`, false, id === undefined)

  const { post } = usePost();
  const { deleteData, loading } = useDelete()
  const { patchData, loading: patchLoading } = usePatch()

  useEffect(() => {
    if (type === "edit") {
      const { name, price, description, img, categoryId } = product
      setNameValue(name)
      setPriceValue(price)
      setDescriptionValue(description)
      setImageValue(img)
      setCategoryValue(categoryId)
    }
  }, [product, id])

  const handleClose = () => {
    setNameValue("");
    setPriceValue("");
    setDescriptionValue("");
    setImageValue("");
    setProductsDialog({ isOpen: false, type: "add", id: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const products = {
      name: nameValue,
      price: +priceValue,
      description: descriptionValue,
      img: imageValue ? imageValue : "https://th.bing.com/th/id/OIP.osXi8MqxJlmTWNGQqapeawHaFj?cb=iwc2&rs=1&pid=ImgDetMain",
      categoryId: +categoryValue,
    };

    if (type === "add") {
      await post("products", products);
    }
    if (type === "delete") {
      await deleteData(`/products/${id}`)
    }
    if (type === "edit") {
      await patchData(`products/${id}`, products)
    }
    
    setReload((p) => !p)
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="alert-dialog-title" id="alert-dialog-title">
        {getProductsDialogTitle(type)}
      </DialogTitle>
      <DialogContent>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="dialog__content"
          action=""
        >
          {type == "add" || type == "edit" ? (
            <>
              <input
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                type="text"
                placeholder="Name..."
              />
              <input
                value={priceValue}
                onChange={(e) => setPriceValue(e.target.value)}
                type="number"
                placeholder="Price..."
              />
              <input
                value={descriptionValue}
                onChange={(e) => setDescriptionValue(e.target.value)}
                type="text"
                placeholder="Description..."
              /> 
              <input
                value={imageValue}
                onChange={(e) => setImageValue(e.target.value)}
                type="text"
                placeholder="Image url..."
              />
              <select
                name=""
                id=""
                onChange={(e) => setCategoryValue(e.target.value)}
              >
                {categories?.data?.map((category) => (
                  <option selected={categoryValue == category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </>
          ) : (
            <p>Are you sure?</p>
          )}
          <DialogActions>
            <Button onClick={handleClose} disabled={loading || patchLoading}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={loading || patchLoading}>
              {getProductsDialogButtonTitle(type)}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
