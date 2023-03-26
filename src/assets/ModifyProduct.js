import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { createFilterOptions } from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import NavBar from "../common/NavBar";
import SearchAppBar from "../common/SearchComponent";
import 'react-toastify/dist/ReactToastify.css';
import ButtonUI from "../common/ButtonUI";
import classes from "./AddProducts.module.css";
import { toast, ToastContainer } from "react-toastify";


const ModifyProduct = (props) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const { state } = useLocation();
  const { id } = state;
  const [product,setProduct]=useState([]);
  
  const token = window.sessionStorage.getItem("access-token");

  useEffect(() => {
   

    fetch(`http://localhost:8080/api/products/${id}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((rawResponse) => rawResponse.json())
      .then((data) => {
        setProduct(data);
       
      });
  }, []);
  
  const setCategoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const dataChangeHandler = (e) => {
    setProduct((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };

  const updateData=async()=>{
    try {
      const rawResponse = await fetch(`http://localhost:8080/api/products/${id}`, {
        method:"PUT",
      headers:{
        "accept": "application/json",
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({
        id: id,
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description,
        manufacturer: product.manufacturer,
        availableItems: product.availableItems,
        imageUrl: product.imageUrl
      }  )  
      })

      if (rawResponse.ok) {

        toast.success("Product "+product.name+" modified successfully ! ")
        setTimeout(()=>{ navigate("/admin")},2000)
      
       
      } else {
        const error = new Error();
        error.message = "Something went wrong.";
        throw error;
      }
    } catch (e) {
      alert(`Error: ${e.message}`);
    }
  }
  const submitHandler = (e) => {
    e.preventDefault();
    updateData();
    setProduct({
      name: "",
      category: "",
      manufacturer: "",
      availableItems: "",
      price: "",
      imageUrl: "",
      description: "",
    });
  };
  return (
    <>
      <NavBar>
        <ShoppingCartIcon style={{ color: "white" }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          upGrad E-shop
        </Typography>
        <SearchAppBar />
        <ButtonUI
          type="button"
          onClick={() => {
            navigate("/admin");
          }}
        >
          Home
        </ButtonUI>
        <ButtonUI
          type="button"
          onClick={() => {
            navigate("/");
          }}
        >
          Add Products
        </ButtonUI>
        <ButtonUI
          type="button"
          logout="true"
          onClick={() => {
            navigate("/logout");
          }}
        >
          LogOut
        </ButtonUI>
      </NavBar>
      <div className="px-3 sm:px-16 md:px-32 py-16 ">
        <h3 className="text-center text-2xl font-semibold"
          
        >
          Modify The Product Data
        </h3>
        <br></br>
        <form onSubmit={submitHandler} className="w-[40%] mx-auto flex flex-col items-center gap-3">
          <TextField
            name="name"
            className="w-full"
            required
            id="outlined-required"
            placeholder="Name"
            value={product.name}
            onChange={dataChangeHandler}
          />
          
          <TextField
            name="category"
            required
            className="w-full"
            id="outlined-required"
            placeholder="Category"
            value={product.category}
            onChange={dataChangeHandler}
          />

          <TextField
            name="manufacturer"
            className="w-full"
            required
            id="outlined-required"
            placeholder="Manufacturer"
            value={product.manufacturer}
            onChange={dataChangeHandler}
          />
          <TextField
            name="availableItems"
            required
            id="outlined-required"
            className="w-full"
            value={product.availableItems}
            placeholder="Available Items"
            onChange={dataChangeHandler}
          />
          <TextField
            name="price"
            required
            id="outlined-required"
            className="w-full"
            placeholder="Price"
            value={product.price}
            onChange={dataChangeHandler}
          />
          <TextField
            name="imageUrl"
            required
            className="w-full"
            id="outlined-required"
            placeholder="Image URL"
            value={product.imageUrl}
            onChange={dataChangeHandler}
          />
          <TextField
            name="description"
            required
            className="w-full"
            id="outlined-required"
            placeholder="Product Description"
            value={product.description}
            onChange={dataChangeHandler}
          />
      
          <div
            style={{
              display: "flex",
              justifyItems: "center",
              justifyContent: "space-around",
            }}
          >
            {" "}
            <Button variant="contained" type="submit" onClick={submitHandler}>
              MODIFY PRODUCT{" "}
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </>
  );
};

export default ModifyProduct;
