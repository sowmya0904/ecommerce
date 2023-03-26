import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Container } from "@mui/material";
import NavBar from "../../common/NavBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchAppBar from "../../common/SearchComponent";
import ButtonUI from "../../common/ButtonUI";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <NavBar>
      <ShoppingCartIcon style={{ color: "white" }} />
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{paddingLeft:"1%"}}>
        upGrad E-shop
      </Typography>
      <SearchAppBar />
      <ButtonUI
        type="button"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </ButtonUI>
      <ButtonUI
        type="button"
        onClick={() => {
          navigate("/signup");
        }}
      >
        Sign In
      </ButtonUI>
      <ButtonUI
        type="button"
        onClick={() => {
          navigate("/signin");
        }}
      >
        Log In
      </ButtonUI>
    </NavBar>
  );
};

export default Home;
