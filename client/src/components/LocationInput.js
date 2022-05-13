import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, Card, TextField, Typography } from "@mui/material";
import { setDate } from "date-fns";
import data from "local.json";

const LocationInput = ({ onInputChange }) => {
  return (
    <div>
      {data && (
        <Autocomplete
          id="search-location"
          onInputChange={(event, newInputValue) => {
            onInputChange(newInputValue);
          }}
          size={"small"}
          style={{ width: 200, marginRight: 25 }}
          options={data.map((location) => location.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by Location"
              InputProps={{
                ...params.InputProps,
                style: { height: 40 },
              }}
            />
          )}
        />
      )}
    </div>
  );
};

export default LocationInput;
