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
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

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
  const [startIndex, setstartIndex] = useState(0); // estado para guardar el índice de la foto que se clickó en la vista de álbum, para mostrarla la primera en las slides
  const [photoMenu, setphotoMenu] = useState(true); // estado para el menú de la foto, que se activa al clickar en una foto
  const [photoIndex, setphotoIndex] = useState(0); // estado para guardar el índice de la foto que se ha cargado en la vista de álbum, para mostrar su fecha y otros metadatos

  // *******ALL ALBUMS ********
  // All albums array
  const albums = []
  // push al array "albums" los álbums de las fotos de media.json
  media.photos.forEach((photo) => {
    if (!albums.includes(photo.album)) {
      albums.push(photo.album);
    }
  })

  // ******CUSTOM ALBUMS ONLY*******
  // Custom albums array
  let customAlbums = []
  // push al array "customAlbums" los álbums que son custom
  albums.map((album, i) => {
    if (!["camera", "screenshots", "all"].includes(album)) {
      customAlbums.push(album);
    }
  })


  //*******MINIATURA DE ÁLBUMES, CREACIÓN DINÁMICA A PARTIR
  // DE ÁLBUMES CREADOS ********//

  let customAlbumsProps = []

  customAlbums.forEach((customAlbum, i) => {
    let album = []
    media.photos.forEach((photo) => photo.album === customAlbum ?
      album.push(photo) : "")

    // añadir al objeto de album custom propiedades. 
    customAlbumsProps[i] = {
      name: customAlbum,
      length: album.length,
      src: album[0].src
    }

    return console.log(album + " aqui funciona el tema? " + customAlbum)

  })
  console.log(customAlbums)
  console.log(customAlbumsProps, " aqui")
  console.log(customAlbumsProps[0].name + " now here")
  customAlbumsProps.map((customAlbum) => { return console.log(customAlbum + " olaaa") })
  // añadir al array customAlbums algunas propiedades principales

  console.log(customAlbums + " custom albumes aqui")
  // console.log(albums + " albumes aqui")

  const TextButton = styled(Button)(({ theme }) => ({
    padding: "6px 16px",
    "&:active": {
      backgroundColor: red,
    },
  }));
  //1. fotos filtradas
  //por album
  let cameraPhotos = media.photos.filter(
    (photo) => photo.album === "camera"
  );
  let favouritePhotos = media.photos.filter(
    (photo) => photo.favourite === "true"
  );
  let screenShots = media.photos.filter(
    (photo) => photo.album === "screenshots"
  );
  let customAlbum = media.photos.filter(
    (photo) => photo.album === "customAlbum1"
  );

  // console.log(screenShots + " screenshots album")
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
      } else if
        (activePage === "all" || activePage === "photos") {
        return <Photos />;
      } else {
        return <Album activePage={activePage}
        />;
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
                  {i === startIndex && <SinglePhoto />}
                  {photo.date === "today" &&
                    <object
                      className="photo"
                      data={photo.src}
                      type="image/jpeg"
                      onClick={() => (setsingleView(true), setstartIndex(i), setphotoIndex(i))}
                      key={`photo-${i}`}
                    ></object>}
                </React.Fragment>
              );
            })}
          </div>
          <h6> Yesterday</h6>
          <div className="containerGridPhotos">
            {media.photos.map((photo, i) => {
              return (
                <React.Fragment key={photo.date + "yesterday"}>
                  {i === startIndex && <SinglePhoto />}
                  {photo.date === "yesterday" &&
                    <object
                      className="photo"
                      data={photo.src}
                      type="image/jpeg"
                      onClick={() => (setsingleView(true), setstartIndex(i), setphotoIndex(i))}
                      key={`photo-${i}`}
                    ></object>}
                </React.Fragment>
              );
            })}
          </div>
          <h6> This month</h6>
          <div className="containerGridPhotos">
            {media.photos.map((photo, i) => {
              return (
                <React.Fragment key={photo.date + "photo"}>
                  {i === startIndex && <SinglePhoto />}
                  {photo.date === "thisMonth" &&
                    <object
                      className="photo"
                      data={photo.src}
                      type="image/jpeg"
                      onClick={() => (setsingleView(true), setstartIndex(i), setphotoIndex(i))}
                      key={`photo-${i}`}
                    ></object>}
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
              // al cambiar el estado del startIndex, coja la foto 
              // adecuada. En el array de filtrado cambiaban los índices.Album
              // Se pasan por el mapeo todas las fotos, pero sólo se pintan
              // las que tienen la fecha "longAgo".
              return (
                <React.Fragment key={"photo-LongAgo-" + i}>
                  {i === startIndex && <SinglePhoto />}
                  {photo.date === "longAgo" &&
                    <object
                      className="photo"
                      data={photo.src}
                      type="image/jpeg"
                      onClick={() => (setsingleView(true), setstartIndex(i), setphotoIndex(i))}
                      key={`photo-${i}`}
                    ></object>
                    }
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
              <h5>Screenshots</h5>
              <p className="numberPhotos">{screenShots.length}</p>
            </button>
          </div>

          <div className="divider"></div>

          {/* CUSTOM ALBUMS */}
          <div className="albumsContainer">
            {customAlbumsProps.map((album, i) => {
              console.log(album.name, "nombre de album")
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
              )
            }

            )
            }
            {

              // ? media.photos.map((photo, i) => { photo.album === album
              // return ( 
              // <button
              //   className="album"
              //   onClick={() => setactivePage("albumCustom")}
              // >
              //   <object
              //     className="photo photoAlbum "
              //     data={customAlbum[0].src}
              //     type="image/jpeg"
              //   ></object>
              //   <h5>Custom album</h5>
              //   <p className="numberPhotos"> {customAlbum.length} </p>
              // </button> )}
              // : ""  )


            }

          </div>
        </div>
      </>
    );
  };

  const Album = ({ activePage }) => {
    let startIndexVar = 0;

    return (
      <>
        <MenuAlbum activePage={activePage} />
        <div className="container-page">
          <div className="containerGridPhotos">
            {/* mapeo de fotos por album */}
            {/* Al igual que en la vista de fotos por fecha, se mapean
            TODAS las fotos, para coger bien el index, aunque sólo se muestren las 
             filtradas por álbum */}
            {media.photos.map((photo, i) => {
                let localIndex;
                if (photo.album === activePage) {
                  localIndex = startIndexVar;
                  startIndexVar++;
                  console.log(i, "startIndexVar", startIndexVar);
                }
               
                return (
                  <React.Fragment key={"Album" + photo.album + "-" + i}>
                    {/* Sólo se renderiza el componente SinglePhoto si el index de la foto es igual al que se ha guardado al hacer click en la foto */}
                    {/* {photo.album === activePage ? startIndexVar++ : " "} */}
                    {/* {console.log(startIndexVar, " startIndexVar aqui")} */}
                    {i === startIndex && <SinglePhoto />}
                   
                    {photo.album === activePage && 
                    <object
                      className="photo"
                      data={photo.src}
                      type="image/jpeg"
                      onClick={() => {
                        setsingleView(true);
                        setstartIndex(localIndex);
                        setphotoIndex(i)
                      }}
                      key={`Album-${i}`}
                      // index={photo.album === activePage ? startIndexVar++ : " "}
                    >
                    </object>
                    }
                  </React.Fragment>
                );
              })}
            {activePage === "favourites" &&
              media.photos.map((photo, i) => {
                return (
                  <React.Fragment key={"FavouritesAlbum-" + i}>
                    {i === startIndex && <SinglePhoto />}
                    { photo.favourite === "true" &&
                    <object
                      className="photo"
                      data={photo.src}
                      type="image/jpeg"
                      onClick={() => (setsingleView(true), setstartIndex(i), setphotoIndex(i))}
                      key={`photo-${i}`}
                    ></object>
                }
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
            onClick={() => setactivePage("albums")} sx={{ fontSize: 30 }}
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
    // let ALongLongTimeAgo = "ALongLongTimeAgo"
    // FORMATEAR DATE STRING PARA TITULO
    const formatDate = (date) => {
      let dateArray = date.split(/(?=[A-Z])/);
      let dateString = dateArray.join(" ").toLowerCase();
      return dateString
    }
    // console.log(formatDate(veryLongLongTimeAgo), " aqui date string")
    console.log(startIndex , " startIndex aquis")
    return (
      <div
        className={singleView === true ? "singlePhotoView" : "display-none"}
        onClick={() => (setphotoMenu(!photoMenu))}
      >
        {/* {console.log(singleView, " singleView aquis")}
        {console.log(photoIndex, " photoIndex aquis")}  
        {console.log(photoIndex, " startIndex aquis")}   */}


        <div className={photoMenu === true ? "photoMenu" : "photoMenuHidden"}>
          <div className="backIconSingle">
            <ArrowBackIcon sx={{ fontSize: 30 }}
              onClick={() => setsingleView(false)}
            />
          </div>
          <div className="titlePhotoSingle">
            {/* Dependiendo de en qué álbum estemos, las imágenes
            tendrán un index u otro. 
            En el swiper no queda otra que meter el filtro antes del mapeo, 
            sino se quedan slides vacías.
            Para que la fecha y el lugar encajen con la foto, se hace 
            una comprobación del album activo, y se filtra según el álbum/
            o si es favorito o no. */}

            {/* {console.log(favouritePhotos[photoIndex].date, " favouritePhotos")} */}
            <p className="date"> 
              {/* {console.log(screenShots[photoIndex].date)} */}
            {/* { activePage === "favourites"  && 
              
            } */}
            </p>
            <p className="location">  
            { activePage === "favourites"  && 
              formatDate(media.photos[photoIndex].location)
            }

            {
              activePage === "customAlbum2" &&
              formatDate(media.photos[photoIndex].date)
            }
           
            </p>
          </div>
        </div>
        <Swiper
          // initialSlide={startIndex}
          initialSlide={singleView === true ? photoIndex : startIndex}
          spaceBetween={50}
          slidesPerView={1}
          // esta no sirve porque ya no se guarda la foto en la que estás, y si clickas, aparece la ultima foto que se ha guardado, en vez de la que tiene que aparecer
          // onSlideChange={(swiper) => { console.log(swiper.activeIndex, " swiper realIndex aquis"); photoMenu === true ? setphotoIndex(swiper.activeIndex) : console.log(swiper.activeIndex)}}
          onSlideChange={(swiper) => { console.log(swiper.activeIndex, " swiper realIndex aquis"); setphotoIndex(swiper.activeIndex)}}
          onSwiper={(swiper) => console.log(swiper)}
        >

          {/* MAPEO ÁLBUMES CON LA COMPROBACIÓN DE: SI LA PÁGINA ACTIVA COINCIDE 
          CON EL ÁLBUM, SE MUESTRA EL SIGUIENTE MAPEO DE FOTOS DE ESE ÁLBUM */}
          {/* PÁGINA DE FOTOS */}
          {
            activePage === "photos" &&
            media.photos.map((photo, i) => {
              return (
                <React.Fragment key={"singleAll-" + i}>
                  <SwiperSlide >
                    {console.log(photoIndex, " photoIndex", i)}
                    <object
                      key={`photo-${i}`}
                      className="photoSingle"
                      data={photo.src}
                      type="image/jpeg"
                      // onClick={() => setphotoIndex(i)}
                    // onClick={()=> { if (photoIndex !== i) {setphotoIndex(i)}}} // esto no sirve porque parpadea. guardar el índice de la foto que se ha cargado para poder mostrar su fecha y otros metadatos
                    >

              
                    </object>
                  </SwiperSlide>
                </React.Fragment>
              );
            })
          }
          {/* PÁGINA DE ÁLBUMES */}
          {media.photos
            .filter((photo) => photo.album === activePage)
            .map((photo, i) => {
              return (
                <React.Fragment key={"singleInAlbum-" + i}>
                  <SwiperSlide >
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
                  <SwiperSlide >
                    <object
                      key={`photo-${i}`}
                      className="photoSingle"
                      data={photo.src}
                      type="image/jpeg"
                    ></object>
                     {/* <div className="photoMenu">
                        <p className="date">{formatDate(photo.date)}</p>
                        <p className="location">{photo.location}</p>
                      </div> */}
                  </SwiperSlide>
                 
                </React.Fragment>
              );
            })}
        </Swiper>
        <div className={photoMenu === true ? "btnGroupSinglePhoto" : "btnGroupSinglePhotoHidden"}>

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