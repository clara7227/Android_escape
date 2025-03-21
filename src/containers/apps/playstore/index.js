import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import { Icon, Image, LazyComponent } from "components/utils";
import { dispatchAction, dispatchAct } from "store/actions";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";

import "./photos.scss";
import media from "./media.json";
import { Button } from "@mui/material";

export const PlaystoreApp = () => {
  const app = useSelector((state) => state.home.apps.playstore || {});
  const home = useSelector((state) => state.home);
  const show = home.ishome == false && home.stack.at(-1) == app.payload;

  return <AppContainer app={app} show={show} />;
};

const AppContainer = ({ app, show }) => {
  const clstring = `${app.payload}-wrapper`;
  const [activeButton, setActiveButton] = useState("photos"); // "photos" es el estado inicial

  const TextButton = styled(Button)(({ theme }) => ({
    padding: "6px 16px",
    "&:active": {
      backgroundColor: red,
    },
  }));

  const PhotosDays = () => {
    return (
      <div className="containerDaysPhotos">
       
        <h6> Today</h6>
        <div className="containerGridPhotos">
        {media.photos.today.map((photo, i) => {
                          return (
                              <object className="photo" data={photo.src} type="image/jpeg"></object>
                          )
                        })}
        </div>
        <h6> Yesterday</h6>
        <div className="containerGridPhotos">
        {media.photos.yesterday.map((photo, i) => {
                          return (
                              <object className="photo" data={photo.src} type="image/jpeg"></object>
                          )
                        })}
        </div>
        <h6> This month</h6>
        <div className="containerGridPhotos">
        {media.photos.yesterday.map((photo, i) => {
                          return (
                              <object className="photo" data={photo.src} type="image/jpeg"></object>
                          )
                        })}
        </div>
      </div>
    );
  };
  const Albums = () => {
    return (
      <div className="mainAlbumsContainer">
      <div className="albumsContainer">
        <div className="album">
          <div className="photo photoAlbum"></div>
          <h5>Album title</h5>
          <p className="numberPhotos"> 3499 </p>
        </div>
        <div className="album">
          <div className="photo"></div>
          <h5>Album title</h5>
          <p className="numberPhotos">990</p>
        </div>
        <div className="album">
          <div className="photo"></div>
          <h5>Album title</h5>
          <p className="numberPhotos">889</p>
        </div>
        <div className="album">
          <div className="photo"></div>
          <h5>Album title</h5>
          <p className="numberPhotos">889</p>
        </div>
      </div>

      <div className="divider"></div>
       <div className="albumsContainer">
       <div className="album">
         <div className="photo photoAlbum"></div>
         <h5>Album title</h5>
         <p className="numberPhotos"> 3499 </p>
       </div>
       <div className="album">
         <div className="photo"></div>
         <h5>Album title</h5>
         <p className="numberPhotos">990</p>
       </div>
       <div className="album">
         <div className="photo"></div>
         <h5>Album title</h5>
         <p className="numberPhotos">889</p>
       </div>
     </div>
     </div>
    );
  };

  return (
    <div className={"app-wrapper " + clstring} id={clstring} data-open={show}>
      {/* <div className="app-icon-container">
        <Icon className="mdShad" src={"apps/" + app.icon} w={72} action="home/setHome"/>
        <span>Playstore</span>
      </div> */}
      <div className="navBar">
        <div>
          <SearchOutlinedIcon />
        </div>
        <div className="tabsContainer">
          <>
            <TextButton
              variant={activeButton === "photos" ? "contained" : "text"}
              onClick={() => setActiveButton("photos")}
            >
              Photos
            </TextButton>
            <TextButton
              variant={activeButton === "albums" ? "contained" : "text"}
              onClick={() => setActiveButton("albums")}
            >
              Albums
            </TextButton>
          </>
        </div>
        <div>
          <MoreVertOutlinedIcon />
        </div>
      </div>
      {activeButton === "albums" ? <Albums /> : <PhotosDays />}
    </div>
  );
};
