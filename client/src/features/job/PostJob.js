import React from "react";
import { FormProvider, FRadioGroup, FTextField } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Alert, Container, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { createJob } from "./jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const NewJobSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("description is required"),
  location: Yup.string().required("location is required"),
});

const defaultValues = {
  name: "",
  type: "Temporary",
  location: "",
  description: "",
  imageUrl: "",
  detailedInformation: "",
  category: "Environment",
};

const PostJob = () => {
  const methods = useForm({
    resolver: yupResolver(NewJobSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.job);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    dispatch(createJob(data)).then(() => reset());
    navigate("/jobs");
  };
  return (
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
          <Typography> POST YOUR JOB</Typography>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message} </Alert>
          )}

          <FTextField name="name" label="Job Title" />
          <FTextField
            name="location"
            label="Location"
            placeholder="Ho Chi Minh, VN"
          />
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
            options={["Community", "Environment", "Health care"]}
          />
          <FTextField name="imageUrl" label="Image Link" />

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
          Post
        </LoadingButton>
      </FormProvider>
    </Container>
  );
};

export default PostJob;
