import { Box, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { Search } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import spacestagram from "../img/spacestagram.png";
import "./css/header.css";

const SearchField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& label.Mui-root": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiInput-underline:hover": {
    borderBottomColor: "white",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "white",
  },
  "& .MuiInput-root": {
    "& fieldset": {
      borderColor: "white"
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});



interface headerProps {
    onSearch: (API_URL: string) => void;
}

const Header = (props: headerProps) => {

    const urlConstructor = (lookup: string) => {
        const baseURL = "https://images-api.nasa.gov/search?q=";
        const URLtoFetch = baseURL + encodeURIComponent(lookup);
        return URLtoFetch;
    }

    const search = (lookup: string) => {
        const URLtoFetch = urlConstructor(lookup);
        props.onSearch(URLtoFetch);
      };

    return (
      <div className="header">
        <img src={spacestagram} style={{ height: "80%", marginLeft: "3%" }} alt="spacestagram"/>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: "5%",
            backgroundColor: grey[700],
            borderRadius: "5px"
          }}
        >
          <Search color="primary" sx={{ marginRight: "1%", padding: "2%" }} />
          <SearchField
            InputProps={{
              disableUnderline: true
            }}
            variant="standard"
            size="medium"
            placeholder="Search"
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                //@ts-ignore
                search(ev.target.value);
                ev.preventDefault();
              }
            }}
            sx={{ width: "15vw", input: { color: "white", fontSize: 30 } }}
          />
        </Box>
      </div>
    );
};

export default Header;