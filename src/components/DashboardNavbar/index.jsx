import React from "react";
import "./style.scss";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { RiAddLargeFill } from "react-icons/ri";

const DashboardNavbar = ({ setProductsDialog, setCategoryDialog }) => {
  const page = useLocation().pathname.split("/")[2];

  const handleAddProduct = () => {
    if (page === "manage-product") {
      setProductsDialog({ isOpen: true, type: "add" });
    } else {
      setCategoryDialog({ isOpen: true, type: "add" });
    }
  };



  return (
    <div className="dashboard__navbar">
      <h2>
        {page == "manage-product" ? "Manage products" : "Manage Categories"}
      </h2>
      <button onClick={() => handleAddProduct()}>
        <RiAddLargeFill className="icon" />
        {page == "manage-product" ? "Add product" : "Add Category"}
      </button>
    </div>
  );
};

export default DashboardNavbar;
