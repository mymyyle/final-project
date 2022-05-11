import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Alert, Container, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, FRadioGroup, FTextField } from "components/form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { editJob, getJobById } from "features/job/jobSlice";
import { Box } from "@mui/system";

const EditJobPage = () => {
  const { jobId } = useParams();
  const defaultValues = {
    name: "",
    type: "",
    location: "",
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
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    dispatch(getJobById(jobId));
  }, []);

  useEffect(() => {
    reset({
      name: currentJob.name,
      type: currentJob.type,
      location: currentJob.location,
      description: currentJob.description,
      imageUrl: currentJob.imageUrl,
      detailedInformation: currentJob.detailedInformation,
      category: currentJob.category,
      status: "ongoing",
    });
  }, [currentJob]);

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.job);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    dispatch(editJob(jobId, data)).then(() => reset());
    navigate("/account");
  };
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
            Update
          </LoadingButton>
        </FormProvider>
      </Container>
    </>
  );
};

export default EditJobPage;
