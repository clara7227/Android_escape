import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";

import { Icon, Image, LazyComponent } from "components/utils";
import { dispatchAction, dispatchAct } from "store/actions";
import { Button } from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import media from "./media.json";
import "./photos.scss";

export const PhotosApp = () => {
  const app = useSelector((state) => state.home.apps.photos || {});
  const home = useSelector((state) => state.home);
  const show = home.ishome == false && home.stack.at(-1) == app.payload;

  return <AppContainer app={app} show={show} />;
};

// indice:
// 1. filtro de fotos
// 2. funcion renderizado de bloques de filtrado de fotos según el "state" de activePage
// 3. funciones de los distintos bloques de fotos filtradas, por dia, album
// 4. renderizado de la app, con botones de cambio de estado
// 5. componente menu - albums/ fotos

const AppContainer = ({ app, show }) => {
  const clstring = `${app.payload}-wrapper`;
  const [activePage, setactivePage] = useState("photos"); // "photos" es el estado inicial
  const [singleView, setsingleView] = useState(false); // estado para vista de una sola foto

  const TextButton = styled(Button)(({ theme }) => ({
    padding: "6px 16px",
    "&:active": {
      backgroundColor: red,
    },
  }));
  //1. fotos filtradas
  //por album
  let cameraPhotos = media.photos.filter((photo) => photo.album === "camera");
  let favouritePhotos = media.photos.filter(
    (photo) => photo.favourite === "true"
  );
  let screenShots = media.photos.filter(
    (photo) => photo.album === "screenshots"
  );
  let customAlbum = media.photos.filter(
    (photo) => photo.album === "customAlbum1"
  );

  //por tiempo
  let todaysPhotos = media.photos.filter((photo) => photo.date === "today");
  let yesterdaysPhotos = media.photos.filter(
    (photo) => photo.date === "yesterday"
  );
  let thisMonthPhotos = media.photos.filter(
    (photo) => photo.date === "thisMonth"
  );
  let longAgoPhotos = media.photos.filter((photo) => photo.date === "longAgo");

  // 2.
  const renderContent = () => {
    {
      console.log(activePage);
      switch (activePage) {
        case "albums":
          return <Albums />;
        case "photos" || "all":
          return <Photos />;
        case "camera":
        case "favourites":
        case "screenshots":
        case "albumCustom":
          return <Album activePage={activePage} />;

        default:
          return <Photos />;
      }
    }
  };

  const Photos = () => {
    return (
  <>
        <MenuMain />
      
      <div className="containerDaysPhotos container-page">
        <h6> Today</h6>
        <div className="containerGridPhotos">
          {todaysPhotos.map((photo, i) => {
            return (
              <object
                className="photo"
                data={photo.src}
                type="image/jpeg"
              ></object>
            );
          })}
        </div>
        <h6> Yesterday</h6>
        <div className="containerGridPhotos">
          {yesterdaysPhotos.map((photo, i) => {
            return (
              <object
                className="photo"
                data={photo.src}
                type="image/jpeg"
              ></object>
            );
          })}
        </div>
        <h6> This month</h6>
        <div className="containerGridPhotos">
          {thisMonthPhotos.map((photo, i) => {
            return (
              <object
                className="photo"
                data={photo.src}
                type="image/jpeg"
              ></object>
            );
          })}
        </div>
        <h6> Long ago</h6>
        <div className="containerGridPhotos">
          {longAgoPhotos.map((photo, i) => {
            return (
              <object
                className="photo"
                data={photo.src}
                type="image/jpeg"
              ></object>
            );
          })}
        </div>
      </div>
     
      </>
    );
  };
  const Albums = () => {
    return (
      <>
      <MenuMain />

      <div className="mainAlbumsContainer container-page">
        <div className="albumsContainer">
          <button className="album" onClick={() => setactivePage("all")}>
            <object
              className="photo photoAlbum "
              data={media.photos[0].src}
              type="image/jpeg"
            ></object>
            <h5>All</h5>
            <p className="numberPhotos"> {media.photos.length} </p>
          </button>
          <button className="album" onClick={() => setactivePage("camera")}>
            <object
              className="photo photoAlbum "
              data={cameraPhotos[0].src}
              type="image/jpeg"
            ></object>
            <h5>Camera</h5>
            <p className="numberPhotos"> {cameraPhotos.length} </p>
          </button>
          <button
            className="album "
            onClick={() => setactivePage("favourites")}
          >
            <object
              className="photo photoAlbum "
              data={favouritePhotos[0].src}
              type="image/jpeg"
            ></object>
            <h5>Favourites</h5>
            <p className="numberPhotos">{favouritePhotos.length} </p>
          </button>
          <button
            className="album"
            onClick={() => setactivePage("screenshots")}
          >
            <object
              className="photo photoAlbum "
              data={screenShots[0].src}
              type="image/jpeg"
            ></object>
            <h5>ScreenShots</h5>
            <p className="numberPhotos">{screenShots.length}</p>
          </button>
        </div>

        <div className="divider"></div>
        <div className="albumsContainer">
          <button
            className="album"
            onClick={() => setactivePage("albumCustom")}
          >
            <object
              className="photo photoAlbum "
              data={customAlbum[0].src}
              type="image/jpeg"
            ></object>
            <h5>Custom album</h5>
            <p className="numberPhotos"> {customAlbum.length} </p>
          </button>
        </div>
      </div>
      </>
    );
  };

  const Album = ({activePage}) => {
    console.log(activePage);
    return (
      <>
       <MenuAlbum activePage={activePage} /> 
      <div>
        <h5 className="albumTitle"> {activePage}</h5>
        <div className="containerGridPhotos container-page">
          {/* mapeo de fotos por album */}
          {media.photos
            .filter((photo) => photo.album === activePage)
            .map((photo, i) => {
              return (
                <object
                  className="photo"
                  data={photo.src}
                  type="image/jpeg"
                  onClick={() => setsingleView(true)}
                  key={i}
                ></object>
              );
            })}
          {activePage === "favourites" &&
            favouritePhotos.map((photo, i) => {
              return (
                <object
                  className="photo"
                  data={photo.src}
                  type="image/jpeg"
                ></object>
              );
            })}
        </div>
        <div className={singleView == true ? "singlePhotoView" : ""}>
          singlePhoto
          <button>Back</button>
        </div>
      </div>
      </>
    );
  };
  // 5.componente menu - albums/ fotos
  const MenuMain = () => {
    return (
      <div className="navBar">
        <div>
          <SearchOutlinedIcon />
        </div>
        <div className="tabsContainer">
          <>
            <TextButton
              variant={activePage === "photos" ? "contained" : "text"}
              onClick={() => setactivePage("photos")}
            >
              Photos
            </TextButton>
            <TextButton
              variant={activePage === "albums" ? "contained" : "text"}
              onClick={() => setactivePage("albums")}
            >
              Albums
            </TextButton>
          </>
        </div>
        <div>
          <MoreVertOutlinedIcon />
        </div>
      </div>
    );
    
  };
  // 5.componente menu - albums/ fotos
  const MenuAlbum = ({activePage}) => {
    return (
      <div className="navBar">
        <div className="backIcon">
          <ArrowBackIcon          
          onClick={() => setactivePage("albums")}
          />
        </div>
        <h6>

          {activePage}
        </h6>
        <div>
          <MoreVertOutlinedIcon />
        </div>
      </div>
    );
  };

  return (
    <div className={"app-wrapper " + clstring} id={clstring} data-open={show}>
      <div className="app-inner-wrapper photo-page">{renderContent()}</div>
    </div>
  );
};
