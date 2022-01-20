import { Favorite, FavoriteBorder, MoreVert } from "@mui/icons-material";
import { Checkbox, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import "./css/expandedPost.css";
import astronaut from "../img/astronaut.png";
import OrderModal from "./orderModal";

interface expandedPostProps {
    interest: any;
    updateLiked: (isLiked: boolean) => void;
}

const ExpandedPost = (props: expandedPostProps) => {
    const [liked, setLiked] = useState<boolean>(false);
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const [order, setOrder] = useState<boolean>(false);
    const [dimensions, setDimensions] = useState<any[]>([0, 0]);
    const [date, setDate] = useState<string>("");

    const getDimensions = (e: any) => {
        const dimArr = [];
        dimArr.push(e.target.clientWidth);
        dimArr.push(e.target.clientHeight);
        setDimensions([...dimArr]);
    }

    useEffect(() => {
        if ( Object.keys(props.interest).length !== 0){
            if (props.interest.postLike === true){
                setLiked(true);
            } else {
                setLiked(false);
            }
            var dateSplit = props.interest.data[0].date_created.split("T");
            setDate(dateSplit[0]);
        }
    }, [props.interest])

    const updateLiked = () => {
        if (liked === true) {
            props.updateLiked(false);
        } else {
            props.updateLiked(true);
        }
        setLiked((prevState) => !prevState);
    }

    const cancelTransaction = () => {
        setOrder(false);
    }

    const close = () => {
        setOrder(false);
    }

    const closeMenu = () => {
        setOpenMenu(false);
        setAnchorEl(null);
    }

    const downloadItem = () => {
      fetch(props.interest.links[0].href, {
        mode: "no-cors",
      })
        .then((response) => {
          response.arrayBuffer().then(function (buffer) {
            const url = window.URL.createObjectURL(new Blob([buffer]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "image.png"); 
            document.body.appendChild(link);
            link.click();
          });
        })
        .catch((err) => {
          console.log(err);
        });

      setOpenMenu(false);
      setAnchorEl(null);
    };


    return (
      <div className="expandedpost">
        {Object.keys(props.interest).length !== 0 ? (
          <div className="expandedPostBody">
            <Typography variant="h2" align="left" sx={{ color: grey[50] }}>
              {props.interest.data[0].title}
            </Typography>
            <div className="imgContainer-EP">
              <img
                style={{
                  maxWidth: "100%",
                  height: "25.2vw",
                  objectFit: "contain",
                  borderRadius: "0.75vh",
                }}
                src={props.interest.links[0].href}
                alt={props.interest.data[0].title}
                onLoad={getDimensions}
              />
            </div>
            <div
              style={{
                width: "100%",
                height: "3vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "2%",
              }}
            >
              <Checkbox
                checked={liked}
                icon={<FavoriteBorder color="primary"/>}
                checkedIcon={<Favorite color="primary"/>}
                onClick={updateLiked}
              />
              <div>
                <IconButton
                  id="basic-button"
                  size="large"
                  onClick={(event) => {
                    setOpenMenu(true);
                    setAnchorEl(event.currentTarget);
                  }}
                  color="primary"
                >
                  <MoreVert />
                </IconButton>
                <Menu open={openMenu} onClose={closeMenu} anchorEl={anchorEl}>
                  <MenuItem onClick={downloadItem}>Download</MenuItem>
                  <MenuItem
                    onClick={() => {
                      setOrder(true);
                      setOpenMenu(false);
                      setAnchorEl(null);
                    }}
                  >
                    Order Print
                  </MenuItem>
                </Menu>
              </div>
            </div>
           
            <Typography sx={{ color: grey[50], marginTop: "2%", lineHeight: "2vh" }} variant="h6" align="left">
              {props.interest.data[0].description}
            </Typography>
            <Typography
              sx={{ marginTop: "2%", color: grey[50] }}
              variant="subtitle1"
              align="left"
            >
              {date}
            </Typography>
            {order === true && (
              <OrderModal
                imghref={props.interest.links[0].href}
                dimensions={dimensions}
                cancelTransaction={cancelTransaction}
                close={close}
              />
            )}
          </div>
        ) : (
          <div className="noneSelected">
            <img src={astronaut} style={{ width: "50%" }} alt="astronaut" />
            <Typography
              style={{ width: "70%", marginTop: "4%", color: grey[50] }}
              variant="h6"
            >
              Click on an image to learn more about it!
            </Typography>
          </div>
        )}
      </div>
    );
}

export default ExpandedPost;