import * as React from "react";
import Box from "@mui/material/Box";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RemoveItem from "../../assets/deleteProduct";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal({
  open,
  setOpen,
  product_id,
  handleFilteredProduct,
  setCategory,
}) {
  const token = window.sessionStorage.getItem("access-token");

  const getCategory = async () => {
    try {
      const r = await axios.get(
        "http://localhost:8080/api/products/categories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategory(r.data);
    } catch (e) {}
  };

  const handleRemoveItem = async () => {
    const isDeleted = await RemoveItem(product_id);
    handleFilteredProduct(product_id);
    setOpen(false);
    getCategory();
  };

  const removeItem = () => {
    handleRemoveItem();
  };

  const cancelModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={cancelModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this item?
          </Typography>
          <div>
            <Button variant="contained" onClick={handleRemoveItem}>
              Ok
            </Button>
            <Button variant="inherit" onClick={cancelModal}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
}
