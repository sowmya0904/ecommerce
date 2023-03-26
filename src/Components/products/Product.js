import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToggleButtonGroup } from "@mui/material";
import ToogleCategory from "../products/ToggleCategory";
import ButtonUI from "../../common/ButtonUI";
import NavBar from "../../common/NavBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Typography from "@mui/material/Typography";
import SearchAppBar from "../../common/SearchComponent";
import ProductCard from "./ProductCard";
import DeleteModal from "../modal/index";
import classes from "../../assets/AddProducts.module.css";
import { toast, ToastContainer } from "react-toastify";

const options = [
  { value: "new", label: "Newest" },
  { value: "none", label: "Default" },
  { value: "lh", label: "Price Low To High" },
  { value: "hl", label: "Price High To Low" },
];
const Product = (props) => {
  const navigate = useNavigate();

  const [filterCat, setFilterCat] = useState(false);
  const [Catproducts, setCatProducts] = useState([]);
  const [catcount, setCatCount] = useState(0);

  const [products, setProducts] = useState([]);

  const [filterProducts, setFilterProducts] = useState(false);
  const [Fproducts, setFProducts] = useState([]);
  const [filcount, setFilCount] = useState(0);

  const token = window.sessionStorage.getItem("access-token");
  const [product_id, setProductId] = useState(false);
  const [open, setOpen] = useState(false);

  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState([]);

  const [category, setCategory] = useState([]);
  const [cat, setCat] = useState("all");

  useEffect(() => {
    if (token === null) {
      navigate("/signin");
    }

    fetch("http://localhost:8080/api/products", {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((rawResponse) => rawResponse.json())
      .then((data) => {
        setProducts(data);
      });

    fetch("http://localhost:8080/api/products/categories", {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((rawResponse) => rawResponse.json())
      .then((data) => {
        setCategory(data);
      });

    const order = window.sessionStorage.getItem("orderplaced");

    if (order === "true") {
      toast.success("Order Placed Successfully !");
      window.sessionStorage.removeItem("orderplaced");
    }
  }, []);

  const handleFilteredProduct = (product_id) => {
    const filteredProducts = products.filter((pr) => pr.id !== product_id);
    setProducts(filteredProducts);

    const ffilterProducts = Fproducts.filter((pr) => pr.id !== product_id);
    setFProducts(ffilterProducts);

    const CatfilterProducts = Catproducts.filter((pr) => pr.id !== product_id);
    setCatProducts(CatfilterProducts);
    const searchfilterProducts = search.filter((pr) => pr.id !== product_id);
    setSearch(searchfilterProducts);
  };

  const setFilterHandler = (e) => {
    setIsSearch(false);
    setFilCount(filcount + 1);
    const filteredProducts = [...products];

    if (filterCat === true) {
      setCatCount(catcount - 1);

      if (e.value == "none") {
        setFilterProducts(false);
      }
      if (e.value == "new") {
        Catproducts.reverse();
        setFProducts(Catproducts);
      }

      if (e.value == "hl") {
        Catproducts.sort((a, b) => {
          if (a.price > b.price) {
            return -1;
          } else {
            return 1;
          }
        });
        setFProducts(Catproducts);
      }

      if (e.value == "lh") {
        Catproducts.sort((a, b) => {
          if (a.price < b.price) {
            return -1;
          } else {
            return 1;
          }
        });
        setFProducts(Catproducts);
      }
    } else {
      setFilterProducts(true);

      if (e.value == "none") {
        setFilterProducts(false);
      }
      if (e.value == "new") {
        filteredProducts.reverse();
        setFProducts(filteredProducts);
      }

      if (e.value == "hl") {
        filteredProducts.sort((a, b) => {
          if (a.price > b.price) {
            return -1;
          } else {
            return 1;
          }
        });
        setFProducts(filteredProducts);
      }

      if (e.value == "lh") {
        filteredProducts.sort((a, b) => {
          if (a.price < b.price) {
            return -1;
          } else {
            return 1;
          }
        });
        setFProducts(filteredProducts);
      }
    }
  };

  const CategoryHandler = (e, c) => {
    setCat(e.target.value);
    setIsSearch(false);
    setCatCount(catcount + 1);
    setFilterCat(true);

    if (filterProducts === true) {
      setFilCount(filcount - 1);
      if (e.target.value === "all") {
        setFilterCat(false);
      }
      const filteredProducts = Fproducts.filter(
        (prod) => prod.category.toLowerCase() === e.target.value
      );
      setCatProducts(filteredProducts);
      setFilterProducts(false);
    } else {
      if (e.target.value === "all") {
        setCatCount(0);
        setFilterCat(false);
      }
      const filteredProducts = products.filter(
        (prod) => prod.category.toLowerCase() === e.target.value
      );
      setCatProducts(filteredProducts);
    }
  };

  const SearchInputHandler = (props) => {
    setIsSearch(true);

    if (catcount > filcount) {
      const searchProducts = Catproducts.filter((pro) =>
        pro.name.toLowerCase().includes(props.toLowerCase())
      );
      setSearch(searchProducts);
    } else if (catcount < filcount) {
      const searchProducts = Fproducts.filter((pro) =>
        pro.name.toLowerCase().includes(props.toLowerCase())
      );
      setSearch(searchProducts);
    } else {
      const searchProducts = products.filter((pro) =>
        pro.name.toLowerCase().includes(props.toLowerCase())
      );
      setSearch(searchProducts);
    }
  };

  return (
    <>
      <NavBar style={{ color: "#3f51b5" }}>
        <ShoppingCartIcon style={{ color: "white" }} />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          style={{ paddingLeft: "1%" }}
        >
          upGrad E-shop
        </Typography>
        <SearchAppBar onSearchInput={SearchInputHandler} />
        <ButtonUI type="button">Home</ButtonUI>
        {props.role === "admin" && (
          <ButtonUI
            type="button"
            onClick={() => {
              navigate("/addproducts");
            }}
          >
            Add Products
          </ButtonUI>
        )}
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
      <div className="px-3 sm:px-16 md:px-32 py-16">
        <br></br>
        <div>
          <div className="flex flex-col lg:flex-row items-start justify-center lg:gap-32">
            <ToggleButtonGroup
              color="primary"
              value={cat}
              exclusive
              aria-label="Platform"
              onClick={CategoryHandler}
            >
              <ToogleCategory category={category} cat={cat} />
            </ToggleButtonGroup>
          </div>
          <br></br>
          <h4 style={{ fontSize: "20px", paddingBottom: "5px" }}>Sort By :</h4>
          <div style={{ width: "20%" }}>
            <CreatableSelect
              styles={{ color: "black", width: "20%" }}
              isClearable
              options={options}
              className={classes.select}
              onChange={setFilterHandler}
            />
          </div>
          <br></br>
          <div
            style={{
              margin: "2 rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",

              gap: "3 rem",
            }}
          >
            <Grid container spacing={4}>
              {isSearch &&
                search.map((product) => {
                  const key = product.id;
                  return (
                    <ProductCard
                      role={props.role}
                      id={key}
                      key={key}
                      product={product}
                      setOpen={setOpen}
                      setProductId={setProductId}
                    ></ProductCard>
                  );
                })}
              {!filterCat &&
                !filterProducts &&
                !isSearch &&
                products.map((product) => {
                  const key = product.id;
                  return (
                    <ProductCard
                      role={props.role}
                      id={key}
                      key={key}
                      product={product}
                      setOpen={setOpen}
                      setProductId={setProductId}
                    ></ProductCard>
                  );
                })}

              {filterCat &&
                !filterProducts &&
                !isSearch &&
                Catproducts.map((product) => {
                  const key = product.id;
                  return (
                    <ProductCard
                      role={props.role}
                      id={key}
                      key={key}
                      product={product}
                      setOpen={setOpen}
                      setProductId={setProductId}
                    ></ProductCard>
                  );
                })}
              {filterProducts &&
                !filterCat &&
                !isSearch &&
                Fproducts.map((product) => {
                  const key = product.id;
                  return (
                    <ProductCard
                      role={props.role}
                      id={key}
                      key={product.id}
                      product={product}
                      setOpen={setOpen}
                      setProductId={setProductId}
                    ></ProductCard>
                  );
                })}
              {filterProducts &&
                filterCat &&
                !isSearch &&
                catcount > filcount &&
                Catproducts.map((product) => {
                  const key = product.id;
                  return (
                    <ProductCard
                      role={props.role}
                      id={key}
                      key={key}
                      product={product}
                      setOpen={setOpen}
                      setProductId={setProductId}
                    ></ProductCard>
                  );
                })}
              {filterProducts &&
                filterCat &&
                !isSearch &&
                catcount < filcount &&
                Fproducts.map((product) => {
                  const key = product.id;
                  return (
                    <ProductCard
                      role={props.role}
                      id={key}
                      key={key}
                      product={product}
                      setOpen={setOpen}
                      setProductId={setProductId}
                    ></ProductCard>
                  );
                })}
            </Grid>
            <DeleteModal
              open={open}
              setOpen={setOpen}
              product_id={product_id}
              handleFilteredProduct={handleFilteredProduct}
              setCategory={setCategory}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default Product;
