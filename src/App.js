import "./App.css";
import { BrowserRouter as Router, json, Route, Routes } from "react-router-dom";
import Home from "./Components/home/Home";
import NormalUser from "./Components/users/NormalUser";
import SignUp from "./Components/home/SignUp";
import Signin from "./Components/home/Signin";
import AdminUser from "./Components/users/AdminUser";
import ErrorPage from "./common/ErrorPage";
import ProductDetail from "./Components/products/ProductDetail";
import AddProduct from "./assets/AddProduct";
import ModifyProduct from "./assets/ModifyProduct";
import PlaceOrder from "./Components/placeOrder/PlaceOrder";
import Logout from "../src/common/Logout";
import getCategories from "./utils/GetCategories";
import { useEffect } from "react";
function App() {

useEffect(()=>{

  async function fetchCategories() {
    const categories = await getCategories();
    console.log(categories);
    localStorage.setItem("categories",JSON.stringify(categories));

    
  }
  fetchCategories();
},[])


  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/user" element={<NormalUser />} />
        <Route path="/admin" element={<AdminUser />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />
        <Route path="/addproducts" element={<AddProduct />} />
        <Route path="/modifyproduct/:id" element={<ModifyProduct />} />
        <Route path="/orders" element={<PlaceOrder />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
