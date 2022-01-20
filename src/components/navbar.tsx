import { IconButton } from "@mui/material";
import { FavoriteBorder, Home  } from "@mui/icons-material";
import logo from "../img/logo.png";
import "./css/navbar.css";

interface NavBarProps {
    onLikedToggle: () => void;
    onHomeToggle: () => void;
}

const NavBar = (props: NavBarProps) => {
    return (
      <div className="navbar">
        <img src={logo} style={{marginTop: "10%", width: "80%"}} alt="logo"/>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <div className="navOptions">
            <IconButton
                size="large"
                onClick={props.onHomeToggle}
                color="primary"
            >
                <Home />
            </IconButton>
            <IconButton size="large" onClick={props.onLikedToggle} color="primary">
                <FavoriteBorder />
            </IconButton>
            </div>
        </div>
      </div>
    );
}

export default NavBar;