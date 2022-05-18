import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import { getGeocode, getLatLng } from "use-places-autocomplete";

const libraries = ["places"]; //tranh rerender nhieu lan

const mapContainerStyle = {
  width: "30vw",
  height: "50vh",
};
const center = {
  lat: 10.784154,
  lng: 106.70104,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const EditJobMap = ({ address, setMap, map }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [renderMarker, setRenderMarker] = useState(false);
  useEffect(() => {
    const timer = setTimeout(
      () => (!renderMarker ? setRenderMarker(true) : null),
      0
    );
    return () => clearTimeout(timer);
  }, [renderMarker]);

  const [marker, setMarker] = useState();
  const covertAddressToSearch = async () => {
    try {
      const results = await getGeocode({ address });
      console.log(`results`, results);
      const { lat, lng } = await getLatLng(results[0]);
      console.log(lat, lng);
      panTo({ lat, lng });
    } catch (error) {
      console.log("map error!");
    }
  };
  useEffect(() => {
    covertAddressToSearch();
  }, [address]);

  const onMapClick = useCallback((e) => {
    setMarker((current) => {
      return {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      };
    });
    setMap({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "error loading maps";
  if (!isLoaded) return "loading maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <Marker
          key={marker?.time.toISOString()}
          position={{ lat: marker?.lat, lng: marker?.lng }}
        />
        {map && renderMarker && <Marker key="123" position={map} />}
      </GoogleMap>
    </div>
  );
};

export default EditJobMap;
