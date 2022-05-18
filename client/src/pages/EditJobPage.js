import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Autocomplete,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import {
  FormProvider,
  FRadioGroup,
  FTextField,
  FUploadImage,
} from "components/form";
import { useNavigate, useParams } from "react-router-dom";
import { editJob, getJobById } from "features/job/jobSlice";
import { Box } from "@mui/system";
import dataLocation from "local.json";
import PostJobMap from "features/map/PostJobMap";

const EditJobPage = () => {
  const { jobId } = useParams();
  const defaultValues = {
    name: "",
    type: "",
    description: "",
    imageUrl: "",
    detailedInformation: "",
    category: "",
    status: "ongoing",
  };

  const { currentJob } = useSelector((state) => state.job);
  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    dispatch(getJobById(jobId));
  }, []);
  const [location, setLocation] = useState();
  const [district, setDistrict] = useState();
  const [districtOptions, setDistrictOptions] = useState([]);
  const [address, setAddress] = useState("");
  const [map, setMap] = useState({});
  useEffect(() => {
    reset({
      name: currentJob.name,
      type: currentJob.type,
      description: currentJob.description,
      imageUrl: currentJob.imageUrl,
      detailedInformation: currentJob.detailedInformation,
      category: currentJob.category,
      status: "ongoing",
    });
    setLocation(currentJob.location);
    setDistrict(currentJob.district);
    setDistrictOptions(
      dataLocation
        .find((province) => province.name === "Hồ Chí Minh")
        .districts.map((location) => location.name)
    );
    setAddress(district + ", " + location + ", Vietnam");
    setMap({ lng: currentJob.lng, lat: currentJob.lat });
  }, [currentJob]);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.job);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("submit data", data);

    dispatch(editJob(jobId, { ...data, location })).then(() => reset());
    navigate("/account");
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          "imageUrl",
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
      }
    },
    [setValue]
  );
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem",
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} sx={{ marginBottom: 3 }}>
            <Typography> EDIT YOUR JOB</Typography>

            <Box component="span">
              Status
              <FRadioGroup
                name="status"
                label="Status"
                options={["ongoing", "Hiring Freeze"]}
              />
            </Box>
            <FTextField name="name" label="Job Title" />

            {dataLocation && (
              <>
                <Autocomplete
                  id="location"
                  onInputChange={(event, newInputValue) => {
                    setLocation(newInputValue);
                  }}
                  defaultValue={currentJob.location}
                  name="location"
                  size={"small"}
                  style={{ width: 200, marginRight: 25, height: 55 }}
                  options={dataLocation.map((location) => location.name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Location"
                      InputProps={{
                        ...params.InputProps,
                        style: { height: 55 },
                      }}
                    />
                  )}
                />
                <Autocomplete
                  id="location-district"
                  onInputChange={(event, newInputValue) => {
                    setDistrict(newInputValue);
                    setAddress(newInputValue + ", " + location + ", Vietnam");
                  }}
                  defaultValue={currentJob.district}
                  name="district"
                  size={"small"}
                  style={{ width: 210, marginRight: 25, height: 55 }}
                  options={districtOptions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="District"
                      InputProps={{
                        ...params.InputProps,
                        style: { height: 55 },
                      }}
                    />
                  )}
                />
              </>
            )}
            <PostJobMap address={address} setMap={setMap} map={map} />

            <FTextField
              name="description"
              label="Job Description"
              multiline
              rows={4}
            />
            <Typography>Type</Typography>
            <FRadioGroup
              name="type"
              label="type"
              options={["Full time", "Part time", "Temporary"]}
            />

            <Typography component="span">Category</Typography>
            <FRadioGroup
              name="category"
              label="category"
              options={["Community", "Environment", "Healthcare"]}
            />
            {/* <FTextField name="imageUrl" label="Image Link" /> */}
            <FUploadImage
              name="imageUrl"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
            />

            <FTextField
              multiline
              rows={4}
              name="detailedInformation"
              label="Secret message for participant"
              placeholder="This message will be sent to all participants who have been approved application"
            />
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting || isLoading}
          >
            Update
          </LoadingButton>
        </FormProvider>
      </Container>
    </>
  );
};

export default EditJobPage;
