import { createFilterOptions } from "@mui/material/Autocomplete";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import RemoveItem from "../../assets/deleteProduct";
import Product from "../products/Product";
import ErrorModal from "../../common/ErrorModal";

const AdminUser = (props) => {
  // const { state } = useLocation();
  // const { id } = state;
  const [filterOption, setFilter] = useState("");
  const role = "admin";
  const token = window.sessionStorage.getItem("access-token");
  const navigate = useNavigate();

  const [deleteproduct, setDeleteproduct] = useState(false);
  const handleRemoveItem = async (product_id) => {
    const isDeleted = await RemoveItem(product_id);
  };

  const deleteHandler = (product_id) => {
    handleRemoveItem(product_id);
    setDeleteproduct(true);
  };

  return (
    <>
      <Product
        role={role}
        onDelete={deleteHandler}
        filterOption={filterOption}
      ></Product>
      <ToastContainer />
    </>
  );
};

export default AdminUser;
