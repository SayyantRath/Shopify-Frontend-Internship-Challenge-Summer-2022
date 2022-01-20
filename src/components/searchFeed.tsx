import { useState, useEffect, useRef } from "react";
import { Typography, Divider, CircularProgress, Snackbar, Alert } from "@mui/material"
import { grey } from "@mui/material/colors";
import "./css/searchFeed.css";

interface feedProps {
    onInterestClick: (resultObj: any) => void;
    searchURL: string;
}

const Feed = (props: feedProps) => {
    const [ results, setResults ] = useState<any>([]);
    const [ error, setError ] = useState<boolean>(false);
    const [ page, setPage ] = useState<number>(1);
    const [ isFinal, setIsFinal ] = useState<boolean>(false);
    const [ APIBomb, setAPIBomb ] = useState<number>(3);
    const [ noResults, setNoResults ] = useState<boolean>(false);

    const loader = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver);
        if (loader.current) {
            observer.observe(loader.current);
        }
    }, []);

    useEffect(() => {

      if(APIBomb > 0){
        fetch(props.searchURL + `&page=${page}`)
          .then((response) => response)
          .then((response) => response.json())
          .then((data) => {

            if (data.collection.items.length === 0 && results.length > 0) {
              setAPIBomb((prevState) => prevState -= 1)
              setIsFinal(true);
            } else if (data.collection.metadata.total_hits === 0){
              setError(true);
              setNoResults(true);
            }
            
            const newResults = results.concat(data.collection.items);
            setResults(newResults);
          }).catch ((error) => {
            setError(true);
          })
      }        
    }, [page])

    const handleObserver = (entities: any) => {
        const target = entities[0];
        if (target.isIntersecting) {
          setTimeout(() => {
            setPage((prevState) => prevState + 1);
          }, 1000);
        }
    }

    useEffect(() => {
        setPage(1);
        setResults([]);
        setAPIBomb(3);
        setIsFinal(false);
        setError(false);
        setNoResults(false);
    }, [props.searchURL])

    return (
      <div className="feed">
        <Typography
          variant="h3"
          color="primary"
          sx={{ marginTop: "1vh", marginLeft: "3%" }}
        >
          Feed
        </Typography>
        <Divider color={grey[50]} sx={{ width: "94%", marginLeft: "3%" }} />
        <div className="grid">
          {results.map((result: any, index: any) => {
            if (
              result.data[0].media_type === "image" ||
              result.data[0].media_type === "video"
            ) {
              return (
                //@ts-ignore
                <div className="imgContainer" key={result.links[0].href}>
                  <img
                    className="img-Feed"
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
          })}
          {!noResults && !isFinal ? (
            <div
              className="loadmore"
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              ref={loader}
            >
              <CircularProgress color="primary" />
            </div>
          ) : (
            <div
              className="loadmore"
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >{!noResults &&
              <Typography color="primary" className="endNotif">
                You have reached the end!
              </Typography>
              }
            </div>
          )}
        </div>
        <Snackbar
          open={noResults || error}
        >
          <Alert
            severity="error"
          >
            {noResults 
              ? <Typography variant="h5">No Results Found</Typography>
              : <Typography variant="h5">ERROR 403: NASA is experiencing too much traffic right now. Please try again later!</Typography>
            }
          </Alert>
        </Snackbar>
      </div>
    );
}

export default Feed;