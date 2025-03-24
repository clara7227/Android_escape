import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";

import { Icon, Image, LazyComponent } from 'components/utils';
import { dispatchAction, dispatchAct } from 'store/actions';
import { Button } from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import media from "./media.json";
import "./photos.scss";

export const PhotosApp = () => {
  const app = useSelector(state => state.home.apps.photos || {});
  const home = useSelector(state => state.home);
  const show = home.ishome == false && home.stack.at(-1) == app.payload;

  return <AppContainer app={app} show={show} />
}

const AppContainer = ({ app, show }) => {
  const clstring = `${app.payload}-wrapper`;
  const [activeButton, setActiveButton] = useState("photos"); // "photos" es el estado inicial

  const TextButton = styled(Button)(({ theme }) => ({
    padding: "6px 16px",
    "&:active": {
      backgroundColor: red,
    },
  }));

  let cameraPhotos = media.photos.filter(photo => photo.album === "camera")
  let todaysPhotos = media.photos.filter(photo => photo.date === "today")

  let cameraPhotosRender = () => {
    console.log(cameraPhotos);
  }

  const renderAlbums = () => {
    return <Albums />
  }
  const renderPhotosDays = () => {
    return <PhotosDays />;
  }
  const renderContent = () => {
    {
      console.log(activeButton)
      switch (activeButton) {
        case "albums":
          renderAlbums();
          break;
        case "photos":
          renderPhotosDays();
          break;
        case "albumCustom":
          <Albums />;
          break;
        case "albums":
          <Albums />;
          break;
      }
    }

  }

  const PhotosDays = () => {
    // console.log(media.photos[1].favourite + " aquis1");
    // console.log(media.photos[1].date + " aquis");
    // console.log(media.photos[1].src + " aquis");

    // filtro por dia
    // filtro por album 

    return (
      <div className="containerDaysPhotos">

        <h6> Today</h6>
        <div className="containerGridPhotos">
          {todaysPhotos.map((photo, i) => {

            return (
              <object className="photo" data={photo.src} type="image/jpeg"></object>
            )
          })
          }
        </div>
        <h6> Yesterday</h6>
        <div className="containerGridPhotos">
          {media.photos.map((photo, i) => {
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
          <button className="album" onClick="">
            <div className="photo photoAlbum"></div>
            <h5>Album title</h5>
            <p className="numberPhotos"> 3499 </p>
          </button>
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
      {renderContent()}
      {/* {activeButton === "albums" ? <Albums /> : <PhotosDays />} */}

{renderPhotosDays()}
    </div>
  );
}
