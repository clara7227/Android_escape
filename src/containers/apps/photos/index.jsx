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

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import media from "./media.json";
import "./photos.scss";
import { PhoneInTalkRounded } from "@mui/icons-material";
import { timelineClasses } from "@mui/lab";

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
  const [startIndex, setstartIndex] = useState(0); // estado para guardar el índice de la foto que se clickó en la vista de álbum, para mostrarla la primera en las slides

  // array de álbumes
  const albums = []


  // crear un array que coja los álbums de media.json
  media.photos.forEach((photo) => {
    if (!albums.includes(photo.album)) {
      albums.push(photo.album);
    } 
  })

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
          {media.photos.map((photo, i) => {
              return (
                <>
                 {i === startIndex && <SinglePhoto />}
                 { photo.date === "today" &&
                <object
                  className="photo"
                  data={photo.src}
                  type="image/jpeg"
                  onClick={() => (setsingleView(true), setstartIndex(i))}
                  key={i}
                ></object> }
                   </>
              );
            })}
          </div>
          <h6> Yesterday</h6>
          <div className="containerGridPhotos">
            {media.photos.map((photo, i) => {
              return (
                <>
                {i === startIndex && <SinglePhoto />}
                { photo.date === "yesterday" &&
               <object
                 className="photo"
                 data={photo.src}
                 type="image/jpeg"
                 onClick={() => (setsingleView(true), setstartIndex(i))}
                 key={i}
               ></object>}
                  </>
              );
            })}
          </div>
          <h6> This month</h6>
          <div className="containerGridPhotos">
            {media.photos.map((photo, i) => {
              return (
                <>
                 {i === startIndex && <SinglePhoto />}
                { photo.date === "thisMonth" &&
               <object
                 className="photo"
                 data={photo.src}
                 type="image/jpeg"
                 onClick={() => (setsingleView(true), setstartIndex(i))}
                 key={i}
               ></object>}
                 
                  
                   </>
              );
            })}
          </div>
          <h6> Long ago</h6>
          <div className="containerGridPhotos">
            {media.photos.map((photo, i) => {
              // por este mapeo se pasan TODAS LAS FOTOS, NO 
              // SÓLO LAS QUE TIENEN LA FECHA "longAgo". 
              // Esto es para que se coja bien el "i" (index), y
              // al cambiar el estado del startIndex, coja la foto 
              // adecuada. En el array de filtrado cambiaban los índices.Album
              // Se pasan por el mapeo todas las fotos, pero sólo se pintan
              // las que tienen la fecha "longAgo".
              return (
    
                <>
                {i === startIndex && <SinglePhoto />}
                {  photo.date === "longAgo" &&
               <object
                 className="photo"
                 data={photo.src}
                 type="image/jpeg"
                 onClick={() => (setsingleView(true), setstartIndex(i))}
                 key={i}
               ></object>}
                  </>
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

  const Album = ({ activePage }) => {
    return (
      <>
        <MenuAlbum activePage={activePage} />
        <div className="container-page">
          <div className="containerGridPhotos">
            {/* mapeo de fotos por album */}
            {media.photos
              .filter((photo) => photo.album === activePage)
              .map((photo, i) => {
                return (<>
                  {/* Sólo se renderiza el componente SinglePhoto si el index de la foto es igual al que se ha guardado al hacer click en la foto */}
                  {i === startIndex && <SinglePhoto />}
                  <object
                    className="photo"
                    data={photo.src}
                    type="image/jpeg"
                    onClick={() => (setsingleView(true), setstartIndex(i))}
                    key={i}
                  ></object>
                </>
                );
              })}
            {activePage === "favourites" &&
              favouritePhotos.map((photo, i) => {
                return (
                  <>
                    {i === startIndex && <SinglePhoto />}
                    <object
                      className="photo"
                      data={photo.src}
                      type="image/jpeg"
                      onClick={() => (setsingleView(true), setstartIndex(i))}
                      key={i}
                    ></object>
                  </>
                );
              })}
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
  const MenuAlbum = ({ activePage }) => {
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

  // componente de página SINGLE de FOTO de álbum
  const SinglePhoto = () => {
    return (
      <div className={singleView === true ? "singlePhotoView" : "display-none"}>


        {console.log(startIndex + " startIndex")}
        <ArrowBackIcon className="backIconSingle "
          onClick={() => setsingleView(false)}
        />
        <Swiper

          initialSlide={startIndex}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
        
          {console.log(activePage + " pagina activa")}


          {/* MAPEO ÁLBUMES CON LA COMPROBACIÓN DE: SI LA PÁGINA ACTIVA COINCIDE 
          CON EL ÁLBUM, SE MUESTRA EL SIGUIENTE MAPEO DE FOTOS DE ESE ÁLBUM */}
         {
          activePage === "photos" &&    
          media.photos.map((photo, i) => {
            return (<>
              <SwiperSlide >
                <object
                  key={i}
                  className="photoSingle"
                  data={photo.src}
                  type="image/jpeg"
                ></object>
              </SwiperSlide>
            </>
            );
          })
         }
          {media.photos
              .filter((photo) => photo.album === activePage)
              .map((photo, i) => {

                return (<>
                  <SwiperSlide >
                    <object
                      key={i}
                      className="photoSingle"
                      data={photo.src}
                      type="image/jpeg"
                    ></object>
                  </SwiperSlide>
                </>
                );
              })
                
          // })
        }
          {/* MAPEO FAVORITOS */}
          {activePage === "favourites" &&
            favouritePhotos.map((photo, i) => {
              return (
                <>
                  <SwiperSlide >
                    <object
                      key={i}
                      className="photoSingle"
                      data={photo.src}
                      type="image/jpeg"
                    ></object>
                  </SwiperSlide>
                </>
              );
            })}
        </Swiper>
      </div>
    );
  };

  // renderizado de la app
  return (
    <div className={"app-wrapper " + clstring} id={clstring} data-open={show}>
      <div className="app-inner-wrapper photo-page">{renderContent()}</div>
    </div>
  );
};
