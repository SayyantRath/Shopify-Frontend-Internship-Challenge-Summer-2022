import { useEffect, useState } from "react";
import { Typography, Divider } from "@mui/material";
import { grey } from "@mui/material/colors";
import blackHole from "../img/blackHole.png";
import "./css/likedFeed.css";

interface likedFeedProps {
    likedPosts: any[];
    onInterestClick: (resultObj: any) => void;
}

const LikedFeed = (props: likedFeedProps) => {
    const [ results, setResults ] = useState<any>([]);

    useEffect(() => {
        setResults([]);
        setResults([...props.likedPosts]);
    }, [props.likedPosts])

    return (
      <div className="feed-liked">
        <Typography
          variant="h3"
          color="primary"
          sx={{ marginTop: "1vh", marginLeft: "3%" }}
        >
          Liked Posts
        </Typography>
        <Divider color={grey[50]} sx={{ width: "94%", marginLeft: "3%" }} />
        {results.length !== 0 ? (
        <div className="grid-liked">
          {results.map((result: any, index: any) => {
            if (
              result.data[0].media_type === "image" ||
              result.data[0].media_type === "video"
            ) {
              if (results.length === index + 1) {
                return (
                  //@ts-ignore
                  <div
                    className="imgContainer-liked"
                    key={result.data[0].nasa_id}
                  >
                    <img
                      className="img-liked"
                      src={result.links[0].href}
                      alt={"img"}
                      onClick={() => props.onInterestClick(result)}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                );
              } else {
                return (
                  //@ts-ignore
                  <div
                    className="imgContainer-liked"
                    key={result.data[0].nasa_id}
                  >
                    {/*
                                    // @ts-ignore */}
                    <img
                      className="img-liked"
                      src={result.links[0].href}
                      alt={"img"}
                      onClick={() => props.onInterestClick(result)}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                );
              }
            }
          })}
        </div>
        ):(
          <div className="noneLiked">
            <img src={blackHole} style={{ width: "50%" }} alt="blackHole"/>
            <Typography
              align="center"
              style={{ width: "70%", marginTop: "6%", color: grey[50] }}
              variant="h6"
            >
              Like some images to see them here!
            </Typography>
          </div>
        )}
      </div>
    );
}

export default LikedFeed;