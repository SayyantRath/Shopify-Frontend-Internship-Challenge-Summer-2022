import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from './components/header';
import './App.css';
import Feed from './components/searchFeed';
import ExpandedPost from './components/expandedPost';
import NavBar from './components/navbar';
import LikedFeed from './components/likedFeed';

const theme = createTheme({
  typography: {
    fontFamily: '"Dongle", sans-serif'
  },
  palette: {
    primary: {
      main: "#fafafa",
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      contrastText: "#ffcc00",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

function App() {
  const [searchURL, setSearchURL] = useState<string>("https://images-api.nasa.gov/search?q=rocket&year_start=2014")
  const [interest, setInterest] = useState<any>({});
  const [likedPosts, setLikedPosts] = useState<any[]>([]);
  const [renderLiked, setRenderLiked] = useState<boolean>(false);

  useEffect(() => {
    
    if(!localStorage.hasOwnProperty("spacestagramLiked")){
      localStorage.setItem("spacestagramLiked", JSON.stringify(likedPosts));
    } else {
        //@ts-ignore
        setLikedPosts(JSON.parse(localStorage.getItem("spacestagramLiked")));
    }
  }, [])

  const onSearch = (API_URL: string) => {
    setInterest({});
    setSearchURL(API_URL);
    setRenderLiked(false);
  }

  const onInterestClick = (resultObj: any) => {

    var hasLike = false;
    for(let i = 0; i < likedPosts.length; i++){
      if (likedPosts[i].href === resultObj.href){
        hasLike = true;
      }
    }

    if (hasLike){
      resultObj["postLike"] = true;
    } else {
      resultObj["postLike"] = false;
    }

    setInterest(resultObj);
  }

  const onLikedToggle = () => {
    setInterest({});
    setRenderLiked(true);
  }

  const onHomeToggle = () => {
    setRenderLiked(false);
  }

  const updateLiked = (isLiked: boolean) => {
    if (isLiked === true) {
      let toStorage = [...likedPosts, interest];
      localStorage.setItem("spacestagramLiked", JSON.stringify(toStorage));
      setLikedPosts((prevState) => [...prevState, interest]);
    } else {
      let toStorage = likedPosts.filter((post: any) => {
        return post.links[0].href !== interest.links[0].href;
      });
      if (renderLiked){
        setInterest({});
      }
      localStorage.setItem("spacestagramLiked", JSON.stringify(toStorage));
      setLikedPosts(toStorage);
    };
  }

  return (
    <ThemeProvider theme={theme}>
    <div
      className="background"
      style={{
        paddingTop: "5vh",
        paddingBottom: "5vh",
        paddingRight: "5vw",
        paddingLeft: "5vw",
        backgroundColor: "#1e1e2f",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="App">
        <NavBar onLikedToggle={onLikedToggle} onHomeToggle={onHomeToggle} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "43%",
            marginRight: "1%",
            marginLeft: "1%",
          }}
        >
          <Header onSearch={onSearch} />
          {!renderLiked ? (
            <Feed
              onInterestClick={onInterestClick}
              searchURL={searchURL}
            />
          ) : (
            <LikedFeed
              onInterestClick={onInterestClick}
              likedPosts={likedPosts}
            />
          )}
        </div>
        <ExpandedPost interest={interest} updateLiked={updateLiked} />
      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
