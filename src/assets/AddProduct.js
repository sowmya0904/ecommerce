import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { createFilterOptions } from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonUI from "../common/ButtonUI";
import NavBar from "../common/NavBar";
import CreatableSelect from "react-select/creatable";
import SearchAppBar from "../common/SearchComponent";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

// const options = [
//   { value: "FootWear", label: "Foot Wear" },
//   { value: "Apparel", label: "Apparel" },
//   { value: "PersonalCare", label: "Personal Care" },
//   { value: "Electronics", label: "Electronics" },
// ];
const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [imageURL, setimageURL] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [availableItems, setAvailableItems] = useState(0);
  const [change, setchange] = useState(false);
  const [options, setoptions] = useState([]);
  const token = window.sessionStorage.getItem("access-token");

  useEffect(() => {
    const categories = JSON.parse(localStorage.getItem("categories"));
    const formattedcat = categories.map((cat) => {
      return {
        label: cat.toUpperCase(),
        value: cat,
      };
    });

    setoptions(formattedcat);
  }, []);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.title,
  });
  const setCategoryHandler = (e) => {
    setCategory(e.value);
    setchange(true);
  };
  const setNameHandler = (e) => {
    setName(e.target.value);
    setchange(true);
  };
  const setManufacturerHandler = (e) => {
    setManufacturer(e.target.value);
    setchange(true);
  };
  const setImageURLHandler = (e) => {
    setimageURL(e.target.value);
    setchange(true);
  };
  const setProductDesHandler = (e) => {
    setProductDescription(e.target.value);
    setchange(true);
  };
  const setPriceHandler = (e) => {
    const dprice = +e.target.value;
    setPrice(dprice);
    setchange(true);
  };
  const setavailableItemsHandler = (e) => {
    const ditems = +e.target.value;
    setAvailableItems(ditems);
    setchange(true);
  };

  let id = "8";
  const productsRequest = async () => {
    try {
      const rawRespose = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: id,
          name: name,
          category: category,
          price: price,
          description: productDescription,
          manufacturer: manufacturer,
          availableItems: availableItems,
          imageUrl: imageURL,
        }),
      });

      if (rawRespose.ok) {
        toast.success("Product " + name + " added successfully");
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      }
    } catch (e) {
      alert(`Error: ${e.message}`);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();

    productsRequest();
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
        <h3 className="text-center text-3xl font-semibold">Add New Product</h3>
        <br></br>
        <form
          onSubmit={submitHandler}
          className="w-[40%] mx-auto flex flex-col items-center gap-3"
        >
          <TextField
            className="w-full"
            name="name"
            required
            id="outlined-required"
            label="Name"
            placeholder="Name"
            value={name}
            onChange={setNameHandler}
          />

          <CreatableSelect
            isClearable
            options={options}
            // styles={colourStyles}
            className="w-full"
            onChange={setCategoryHandler}
          />

          <TextField
            name="manufacturer"
            required
            id="outlined-required"
            label="Manufacturer"
            className="w-full"
            placeholder="Manufacturer"
            value={manufacturer}
            onChange={setManufacturerHandler}
          />
          <TextField
            name="availableItems"
            type="number"
            className="w-full"
            required
            id="outlined-required"
            label="Available Items"
            placeholder="Price"
            onChange={setavailableItemsHandler}
          />
          <TextField
            name="price"
            type="number"
            required
            id="outlined-required"
            label="Price"
            placeholder="Price"
            className="w-full"
            onChange={setPriceHandler}
          />
          <TextField
            name="imageURL"
            required
            id="outlined-required"
            label="Image URL"
            placeholder="Image URL"
            className="w-full"
            value={imageURL}
            onChange={setImageURLHandler}
          />
          <TextField
            name="productDescription"
            required
            id="outlined-required"
            label="Product Description"
            className="w-full"
            placeholder="Product Description"
            value={productDescription}
            onChange={setProductDesHandler}
          />

          <div
            style={{
              display: "flex",
              justifyItems: "center",
              justifyContent: "space-around",
            }}
          >
            {" "}
            <Button
              variant="contained"
              type="submit"
              onClick={submitHandler}
              disabled={
                !change ||
                !name ||
                !manufacturer ||
                !price ||
                !availableItems ||
                !productDescription ||
                !imageURL ||
                !category
                  ? true
                  : false
              }
            >
              ADD PRODUCT{" "}
            </Button>
          </div>
        </form>
      </div>
      // <ToastContainer />
    </>
  );
};

export default AddProduct;
