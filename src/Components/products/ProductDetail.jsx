import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import ButtonUI from "../../common/ButtonUI";
import NavBar from "../../common/NavBar";
import SearchAppBar from "../../common/SearchComponent";
const ProductDetail = () => {
  const { state } = useLocation();
  const { id, role } = state;
  window.sessionStorage.setItem("id", id);
  window.sessionStorage.setItem("role", role);
  const navigate = useNavigate();
  const [quantity, setquantity] = useState("");
  const [product, setProduct] = useState([]);
  const token = window.sessionStorage.getItem("access-token");
  useEffect(() => {
    if (token === null) {
      navigate("signin");
    }

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

  const submitHandler = () => {};
  const setQuantityHandler = (e) => {
    setquantity(e.target.value);
  };

  const homeButtonHandler = () => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };
  return (
    <>
      <NavBar>
        <ShoppingCartIcon style={{ color: "white" }} />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          style={{ paddingLeft: "1%" }}
        >
          upGrad E-shop
        </Typography>
        <SearchAppBar style={{ paddingRight: "30px" }} />
        <br></br>
        <ButtonUI type="button" onClick={homeButtonHandler}>
          Home
        </ButtonUI>

        {role === "admin" && (
          <ButtonUI
            type="button"
            onClick={() => {
              navigate("/addproducts");
            }}
          >
            Add Products
          </ButtonUI>
        )}

        <ButtonUI type="button" logout="true">
          LogOut
        </ButtonUI>
      </NavBar>
      <div className="py-16 px-6 sm:px-16 lg:px-32">
        <div className="w-[98%] md:w-[90%] lg:w-[75%] flex flex-col lg:flex-row items-start justify-center mx-auto my-32  lg:gap-32">
          <div className="product-image w-[400px] h-[400px] md:w-[500px] md:h-[500px]  col-span-1">
            <img
              src={product.imageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-3xl">{product.name}</h3>
              <p className="px-2 py-1 bg-blue-700 rounded-full text-white text-sm">
                Available Items : {product.availableItems}
              </p>
            </div>
            <p className="mb-2">
              Category: <strong>{product.category}</strong>
            </p>
            <i className="mb-2">{product.description}</i>
            <h1
              className="text-4xl font-semibold mb-2"
              style={{ color: "red" }}
            >
              ₹ {product.price}
            </h1>
            <div className="flex flex-col items-start gap-3 mt-2">
              <TextField
                required
                type="number"
                min="1"
                step="1"
                id="quantity"
                label="Enter Quantity"
                placeholder="1"
                style={{ width: "90%" }}
                value={quantity}
                onChange={setQuantityHandler}
              />
              <Button
                variant="contained"
                style={{ backgroundColor: "#3f51b5" }}
                onClick={() => {
                  navigate("/orders", {
                    state: { id: id, role: role, quantity: quantity },
                  });
                }}
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
