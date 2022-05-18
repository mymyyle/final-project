import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";

import { getGeocode, getLatLng } from "use-places-autocomplete";
import { useSelector } from "react-redux";
import IconItem from "assets/icon1.png";

// const ScriptLoaded = require("../../docs/ScriptLoaded").default;

const libraries = ["places"]; //tranh rerender nhieu lan

const mapContainerStyle = {
  width: "22vw",
  height: "30vh",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const DetailJobMap = ({ address, setMap }) => {
  const { lat, lng } = useSelector((state) => state.job.currentJob);
  const center = {
    lat,
    lng,
  };
  console.log("center", center);
  // let map = [{ lat, lng }];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "error loading maps";
  if (!isLoaded) return "loading maps";
  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };
  console.log("isLoaded", isLoaded);
  return (
    <div>
      {/* <ScriptLoaded> */}
      {/* {lng && ( */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
      >
        {/* {map.map((marker) => (
            <Marker
              key={marker.lng}
              position={{ lat: marker.lat, lng: marker.lng }}
            />
          ))} */}
        <Marker
          onLoad={onLoad}
          position={{ lat: 12.019307644395338, lng: 108.92610907724612 }}
        />
      </GoogleMap>
      {/* )} */}
      {/* </ScriptLoaded> */}
    </div>
  );
};

export default DetailJobMap;
