import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerClusterer,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";

import IconItem from "assets/focus-location.png";
import apiService from "app/apiService";
import { Button, Chip, Stack, Typography } from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CategoryIcon from "@mui/icons-material/Category";
import { fToNow } from "utils/formatTime";
import { Box } from "@mui/system";
import mapStyles from "./mapStyles";
import { useNavigate } from "react-router-dom";

const libraries = ["places"]; //tranh rerender nheiu lan

const mapContainerStyle = {
  width: "95vw",
  height: "70vh",
  margin: "auto",
};
const center = {
  lat: 10.823099,
  lng: 106.629662,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const AllJobMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [selected, setSelected] = useState(null);
  const [jobs, setJobs] = useState();

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  useEffect(() => {
    const getMarkerAllJob = async () => {
      try {
        const response = await apiService.get(`/job/all`);
        const data = response.data.jobList;
        console.log("data", data);
        setJobs(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMarkerAllJob();
  }, []);

  const [renderMarker, setRenderMarker] = useState(false);
  useEffect(() => {
    const timer = setTimeout(
      () => (!renderMarker ? setRenderMarker(true) : null),
      2000
    );
    return () => clearTimeout(timer);
  }, [renderMarker]);

  const navigate = useNavigate();
  const navigateToDetailPage = (jobId) => {
    navigate(`/job/${jobId}`);
  };
  if (loadError) return "error loading maps";
  if (!isLoaded) return "loading maps";

  return (
    <div>
      <Search panTo={panTo} />
      <Locate
        panTo={panTo}
        onClick={() => {
          console.log("click on location");
          // navigator.geolocation.getCurrentPosition(success, error, options);
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null,
            options
          );
        }}
      />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {renderMarker && (
          <MarkerClusterer>
            {(clusterer) =>
              jobs?.map((marker) => (
                <Marker
                  key={marker._id}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  clusterer={clusterer}
                  icon={{
                    label: {
                      url: `${marker.authorId.avatarUrl}`,
                    },
                    // url: `${marker.authorId.avatarUrl}`,
                    // path: ,
                    scaledSize: new window.google.maps.Size(50, 50),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(25, 25),
                  }}
                  onClick={() => {
                    setSelected(marker);
                  }}
                />
              ))
            }
          </MarkerClusterer>
        )}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <Stack
              spacing={1}
              sx={{
                color: "black",
                p: "0.5rem 1rem 1rem 1rem",
                opacity: 0.75,
              }}
            >
              <Button onClick={() => navigateToDetailPage(selected._id)}>
                <Typography variant="h6" sx={{ color: "black" }}>
                  {selected.name}
                </Typography>
              </Button>
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                <CategoryIcon />
                {selected.category}
              </Typography>
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                <AccessTimeIcon /> {fToNow(selected.updatedAt)}
              </Typography>
              <Chip
                label={selected.type}
                sx={{ fontWeight: 600, fontSize: "14px" }}
                variant="contained"
                color={
                  selected.type === "Full time"
                    ? "success"
                    : selected.type === "Temporary"
                    ? "warning"
                    : "secondary"
                }
              />
            </Stack>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default AllJobMap;

export const Locate = ({ panTo, onClick }) => {
  return (
    <button onClick={onClick}>
      <img src={IconItem} alt="compass-locate me" width="30" height="30" />
    </button>
  );
};

export const Search = ({ panTo }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 10.823099, lng: () => 106.629662 },
      radius: 200 * 1000, //km --> mét
    },
  });

  return (
    <Combobox
      onSelect={async (address) => {
        // console.log(address);
        setValue(address, false);
        clearSuggestions();
        try {
          const results = await getGeocode({ address });
          //   console.log(results);
          const { lat, lng } = await getLatLng(results[0]);
          //   console.log(lat, lng);
          panTo({ lat, lng });
        } catch (error) {
          console.log("map error!");
        }
      }}
    >
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="enter address"
      />

      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
