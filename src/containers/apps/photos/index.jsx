import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";

import { Icon, Image, LazyComponent } from "components/utils";
import { dispatchAction, dispatchAct } from "store/actions";
import { Button } from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import media from "./media.json";
import "./photos.scss";
import { PhoneInTalkRounded, ShareOutlined } from "@mui/icons-material";
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
  const [photoMenu, setphotoMenu] = useState(true); // estado para el menú de la foto, que se activa al clickar en una foto
  const [photoIndex, setphotoIndex] = useState(0); // estado para guardar el índice de la foto que se ha cargado en la vista de álbum, para mostrar su fecha y otros metadatos

  // ordenar fotos por fecha: 
  // por atributo dateIndex
  let orderedPhotos = media.photos.sort((a, b) => {
    if (a.dateIndex < b.dateIndex) {
      return -1;
    }
    if (a.dateIndex > b.dateIndex) {
      return 1;
    }
    return 0;
  });
  console.log(orderedPhotos, " ordered photos");


  // *******ALL ALBUMS ********
  // All albums array
  const albums = [];
  // push al array "albums" los álbums de las fotos de media.json
  media.photos.forEach((photo) => {
    if (!albums.includes(photo.album)) {
      albums.push(photo.album);
    }
  });

  // ******CUSTOM ALBUMS ONLY*******
  // Custom albums array
  let customAlbums = [];
  // push al array "customAlbums" los álbums que son custom
  albums.map((album, i) => {
    if (!["camera", "screenshots", "all"].includes(album)) {
      customAlbums.push(album);
    }
  });

  

  //*******MINIATURA DE ÁLBUMES, CREACIÓN DINÁMICA A PARTIR
  // DE ÁLBUMES DE FOTOS ********//

  let customAlbumsProps = [];

  customAlbums.forEach((customAlbum, i) => {
    let album = [];
    media.photos.forEach((photo) =>
      photo.album === customAlbum ? album.push(photo) : ""
    );

    // añadir al objeto de album custom propiedades.
    customAlbumsProps[i] = {
      name: customAlbum,
      length: album.length,
      src: album[0].src,
    };
  });

  // arrays de fotos de albumes predefinidos (camera, favourites y screenshots)
  let cameraPhotos = orderedPhotos.filter(
    (photo) => photo.album === "camera");
  let favouritePhotos = orderedPhotos.filter(
    (photo) => photo.favourite === "true");
  let screenShots = orderedPhotos.filter(
    (photo) => photo.album === "screenshots");
  // array de fotos del album de la página activa
  let albumPhotos = orderedPhotos.filter(
    (photo) => photo.album === activePage
  );

  // consolas
  // console.log(customAlbums);
  // console.log(customAlbumsProps, " aqui");
  // console.log(customAlbumsProps[0].name + " now here");
  // customAlbumsProps.map((customAlbum) => {
  //   return console.log(customAlbum + " olaaa");
  // });
  // console.log(customAlbums + " custom albumes aqui");
  // console.log(albums + " albumes aqui")

  const TextButton = styled(Button)(({ theme }) => ({
    padding: "6px 16px",
    "&:active": {
      backgroundColor: red,
    },
  }));

  // ORDEN POR FECHA:
  // Añadir a todas las fotos del array de fotos general
  // la propiedad dateIndex para ordenar las fechas
  media.photos.forEach((photo) => {
    Object.defineProperty(photo, "dateIndex", {
      value: 0,
      writable: true,
    });
    if (photo.date === "today") {
      photo.dateIndex = 0;      
    } else if (photo.date === "yesterday") {
      photo.dateIndex = 1;
    } else if (photo.date === "thisMonth") {
      photo.dateIndex = 2;
    } else if (photo.date === "longAgo") {
      photo.dateIndex = 3;        
    }
  }
)

    
  // console.log(media.photos[5], "funcionara el dateindex?") // si funciona ole

  // // console.log(screenShots + " screenshots album")
  // //por tiempo
  // let todaysPhotos = media.photos.filter((photo) => photo.date === "today");
  // let yesterdaysPhotos = media.photos.filter(
  //   (photo) => photo.date === "yesterday"
  // );
  // let thisMonthPhotos = media.photos.filter(
  //   (photo) => photo.date === "thisMonth"
  // );
  // let longAgoPhotos = media.photos.filter((photo) => photo.date === "longAgo");

  // 2.
  const renderContent = () => {
    {
      console.log(activePage, " activePage");
      // switch (activePage) {
      //   case "albums":
      //     return <Albums />;
      //   case "photos" || "all":
      //     return <Photos />;
      //   case "camera":
      //   case "favourites":
      //   case "screenshots":
      //   case "albumCustom":
      //     return <Album activePage={activePage} />;

      //   default:
      //     return <Photos />;
      // }
      if (activePage === "albums") {
        return <Albums />;
      } else if (activePage === "all" || activePage === "photos") {
        return <Photos />;
      } else {
        return <Album activePage={activePage} />;
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
                <React.Fragment key={photo.date + "today"}>
                  {i === photoIndex && <SinglePhoto />}
                  {photo.date === "today" && (
                    <object
                      className="photo"
                      data={photo.src}
                      type="image/jpeg"
                      onClick={() => (
                        setsingleView(true), setphotoIndex(i)
                      )}
                      key={`photo-${i}`}
                    ></object>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <h6> Yesterday</h6>
          <div className="containerGridPhotos">
            {media.photos.map((photo, i) => {
              return (
                <React.Fragment key={photo.date + "yesterday"}>
                  {i === photoIndex && <SinglePhoto />}
                  {photo.date === "yesterday" && (
                    <object
                      className="photo"
                      data={photo.src}
                      type="image/jpeg"
                      onClick={() => (
                        setsingleView(true), setphotoIndex(i)
                      )}
                      key={`photo-${i}`}
                    ></object>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <h6> This month</h6>
          <div className="containerGridPhotos">
            {media.photos.map((photo, i) => {
              return (
                <React.Fragment key={photo.date + "photo"}>
                  {i === photoIndex && <SinglePhoto />}
                  {photo.date === "thisMonth" && (
                    <object
                      className="photo"
                      data={photo.src}
                      type="image/jpeg"
                      onClick={() => (
                        setsingleView(true),  setphotoIndex(i)
                      )}
                      key={`photo-${i}`}
                    ></object>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <h6> Long ago</h6>
          <div className="containerGridPhotos">
            {media.photos.map((photo, i) => {
              // por este mapeo se pasan TODAS LAS FOTOS, NO
              // SÓLO LAS QUE TIENEN LA FECHA "longAgo".
              // Esto es para que se coja bien el "i" (index), y
              // al cambiar el estado del photoIndex, coja la foto
              // adecuada. En el array de filtrado cambiaban los índices.Album
              // Se pasan por el mapeo todas las fotos, pero sólo se pintan
              // las que tienen la fecha "longAgo".
              return (
                <React.Fragment key={"photo-LongAgo-" + i}>
                  {i === photoIndex && <SinglePhoto />}
                  {photo.date === "longAgo" && (
                    <object
                      className="photo"
                      data={photo.src}
                      type="image/jpeg"
                      onClick={() => (
                        setsingleView(true), setphotoIndex(i)
                      )}
                      key={`photo-${i}`}
                    ></object>
                  )}
                </React.Fragment>
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
          {/* DEFAULT ALBUMS */}
          <div className="albumsContainer">
            <button className="album" onClick={() => setactivePage("photos")}>
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
              <h5>Screenshots</h5>
              <p className="numberPhotos">{screenShots.length}</p>
            </button>
          </div>

          <div className="divider"></div>

          {/* CUSTOM ALBUMS */}
          <div className="albumsContainer">
            {customAlbumsProps.map((album, i) => {
              // console.log(album.name, "nombre de album");
              return (
                <button
                  className="album"
                  onClick={() => setactivePage(album.name)}
                  key={`photo-avatar-${i}`}
                >
                  <object
                    className="photo photoAlbum "
                    data={album.src}
                    type="image/jpeg"
                  ></object>
                  <h5 className="albumName">{album.name}</h5>
                  <p className="numberPhotos"> {album.length} </p>
                </button>
              );
            })}
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
            {/* Al igual que en la vista de fotos por fecha, se mapean
            TODAS las fotos, para coger bien el index, aunque sólo se muestren las 
             filtradas por álbum */}
            {albumPhotos.map((photo, i) => {
                            return (
                <React.Fragment key={"Album" + photo.album + "-" + i}>
                  {/* Sólo se renderiza el componente SinglePhoto si el index de la foto es igual al que se ha guardado al hacer click en la foto */}
                  {/* {photo.album === activePage ? startIndexVar++ : " "} */}
                  {/* {console.log(startIndexVar, " startIndexVar aqui")} */}
                  {i === photoIndex && <SinglePhoto />}
                 

                  {photo.album === activePage && (
                    <object
                      className="photo"
                      data={photo.src}
                      type="image/jpeg"
                      onClick={() => {
                        setsingleView(true);
                        setphotoIndex(i);
                      }}
                      key={`Album-${i}`}
                   
                    ></object>
                  )}
                </React.Fragment>
              );
            })}
            {activePage === "favourites" &&
              favouritePhotos.map((photo, i) => {
                  
                return (
                  <React.Fragment key={"FavouritesAlbum-" + i}>
                    {i === photoIndex && <SinglePhoto />}
                    {photo.favourite === "true" && (
                      <object
                        className="photo"
                        data={photo.src}
                        type="image/jpeg"
                        onClick={() => {
                          setsingleView(true);
                          setphotoIndex(i);
                        }}
                        key={`photo-${i}`}
                      ></object>
                    )}
                  </React.Fragment>
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
            sx={{ fontSize: 30 }}
          />
        </div>
        <h6>{activePage}</h6>
        <div>
          <MoreVertOutlinedIcon />
        </div>
      </div>
    );
  };

  // componente de página SINGLE de FOTO de álbum
  const SinglePhoto = () => {

    // FORMATEAR DATE STRING PARA TITULO
    const formatDate = (date) => {
      let dateArray = date.split(/(?=[A-Z])/);
      let dateString = dateArray.join(" ").toLowerCase();
      return dateString;
    };
    
    // console.log(photoIndex, " photoindex aquiss");
    return (
      <div
        className={singleView === true ? "singlePhotoView" : "display-none"}
        onClick={() => {
          setphotoMenu(!photoMenu);
        
        }}
      >
        <div className={photoMenu === true ? "photoMenu" : "photoMenuHidden"}>
          <div className="backIconSingle">
            <ArrowBackIcon
              sx={{ fontSize: 30 }}
              onClick={() => setsingleView(false)}
            />
          </div>
             {/* METADATOS FOTOS */}
          <div className="titlePhotoSingle">
         
           
            {/* Dependiendo de en qué álbum estemos, las imágenes
            tendrán un index u otro. 
            En el swiper no queda otra que meter el filtro antes del mapeo, 
            sino se quedan slides vacías.
            Para que la fecha y el lugar encajen con la foto, se hace 
            una comprobación del album activo, y se filtra según el álbum/
            o si es favorito o no. */}

            <p className="date">
              
              {/* // ACTIVEPAGE == PHOTOS */}
              {activePage === "photos" && formatDate(orderedPhotos[photoIndex].date)}

              {/* // ACTIVEPAGE == FAVOURITES */}
              {activePage === "favourites" &&
                formatDate(favouritePhotos[photoIndex].date)}

              {/* // ACTIVEPAGE == some ALBUM */}
              {albums.includes(activePage) && formatDate(albumPhotos[photoIndex].date)}
            
            </p>
            <p className="location">
              {/* // ACTIVEPAGE == PHOTOS */}
              {activePage === "photos" && orderedPhotos[photoIndex].location}

              {/* // ACTIVEPAGE == FAVOURITES */}
              {activePage === "favourites" &&
                favouritePhotos[photoIndex].location}

              {/* // ACTIVEPAGE == some ALBUM */}
              {albums.includes(activePage) && albumPhotos[photoIndex].location}
            </p>
          </div>
        </div>
        <Swiper
          // foto con la que comienza el slider
          initialSlide={photoIndex}
          spaceBetween={50}
          slidesPerView={1}
          // con setPhotoIndex(swiper.realIndex)
          onSlideChange={(swiper) => {
            // console.log(swiper.activeIndex,  " swiper realIndex aquis");
            setphotoIndex(swiper.activeIndex)
            ;
          }}

          onSwiper={(swiper) => console.log(swiper)}
        >
          {/* MAPEO ÁLBUMES CON LA COMPROBACIÓN DE: SI LA PÁGINA ACTIVA COINCIDE 
          CON EL ÁLBUM, SE MUESTRA EL SIGUIENTE DE FOTOS DE ESE ÁLBUM */}
          
          {/* PÁGINA DE FOTOS */}
          {activePage === "photos" &&
            orderedPhotos.map((photo, i) => {
              return (
                <React.Fragment key={"singleAll-" + i}>
                  <SwiperSlide>
                    {/* {console.log(photoIndex, " photoIndex", i)} */}
                    <object
                      key={`photo-${i}`}
                      className="photoSingle"
                      data={photo.src}
                      type="image/jpeg"
                    
                    ></object>
                  </SwiperSlide>
                </React.Fragment>
              );
            })}
          {/* PÁGINA DE ÁLBUMES */}

          {
            orderedPhotos
              .filter((photo) => photo.album === activePage)
              .map((photo, i) => {
                return (
                  <React.Fragment key={"singleInAlbum-" + i}>
                    <SwiperSlide>
                      <object
                        key={`photo-${i}`}
                        className="photoSingle"
                        data={photo.src}
                        type="image/jpeg"
                      ></object>
                    </SwiperSlide>
                  </React.Fragment>
                );
              })

            // })
          }
          {/* MAPEO FAVORITOS */}
          {activePage === "favourites" &&
            favouritePhotos.map((photo, i) => {
              return (
                <React.Fragment key={"singleInFav" + photo[i]}>
                  <SwiperSlide>
                    <object
                      key={`photo-${i}`}
                      className="photoSingle"
                      data={photo.src}
                      type="image/jpeg"
                    ></object>
                
                  </SwiperSlide>
                </React.Fragment>
              );
            })}
        </Swiper>
        <div
          className={
            photoMenu === true
              ? "btnGroupSinglePhoto"
              : "btnGroupSinglePhotoHidden"
          }
        >
          <div className="btn-icon-single-photo">
            <ShareOutlined sx={{ fontSize: 36 }} />
          </div>
          <div className="btn-icon-single-photo">
            <EditOutlinedIcon sx={{ fontSize: 36 }} />
          </div>
          <div className="btn-icon-single-photo">
            <FavoriteBorderOutlinedIcon sx={{ fontSize: 36 }} />
          </div>
          <div className="btn-icon-single-photo">
            <DeleteOutlinedIcon sx={{ fontSize: 36 }} />
          </div>
          <div className="btn-icon-single-photo">
            <MoreHorizOutlinedIcon sx={{ fontSize: 36 }} />
          </div>
        </div>
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

// prueba:
// mapear media.json, y ver si las fotos conservan su lugar en media.photos.?
