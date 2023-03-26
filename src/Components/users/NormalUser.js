import { useNavigate } from "react-router-dom";
import { createFilterOptions } from "@mui/material/Autocomplete";
import Product from "../products/Product";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";

const NormalUser = () => {
  const role = "user";
  const navigate = useNavigate();
  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.title,
  });

  useEffect(() => {
    const order = window.sessionStorage.getItem("orderplaced");

    if (order === "true") {
      toast.success("order success !!!!");
      window.sessionStorage.removeItem("orderplaced");
    }
  }, []);

  return (
    <>
      <Product role={role}></Product>
      <ToastContainer />
    </>
  );
};

export default NormalUser;
