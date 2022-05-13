import React from "react";
import { FormProvider, FTextField } from "../../components/form";
import { useForm } from "react-hook-form";
import { Card, Container, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { applyJob, cancelJob } from "features/application/applicationSlice";
import { Box } from "@mui/system";
import useAuth from "hooks/useAuth";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const defaultValues = {
  message: "",
};

const ApplyJob = () => {
  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const { jobId } = useParams();
  const dispatch = useDispatch();
  const { currentJob } = useSelector((state) => state.job);
  const { currentApplication, isLoading } = useSelector(
    (state) => state.application
  );
  const onSubmit = async (data) => {
    dispatch(applyJob(jobId, data)).then(() => reset());
  };

  const handleCancel = async () => {
    dispatch(cancelJob(jobId));
  };

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    navigate("/login", { state: { from: location } });
  };
  const { isAuthenticated } = useAuth();
  return (
    <Card
      sx={{
        mt: "1rem",
        p: "1rem 0",
        position: { sm: "fixed" },
        top: { md: "390px", sm: "555px" },
        width: { sm: "25%" },
      }}
    >
      <Container maxWidth="xs">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1}>
            <FTextField
              name="message"
              label="Message"
              placeholder="Tell employer something about yourself
           "
              multiline
              rows="3"
            />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting || isLoading}
              disabled={
                !isAuthenticated ||
                currentJob.status === "done" ||
                (currentApplication.jobId === jobId &&
                  (currentApplication.status === "pending" ||
                    currentApplication.status === "approved"))
                  ? true
                  : false
              }
            >
              {currentApplication.jobId === jobId &&
              currentApplication.status === "pending" ? (
                <Box component="span">Sent your application</Box>
              ) : currentJob.status === "done" ? (
                <Box component="span">Hiring Freeze</Box>
              ) : (
                <Box component="span"> Send an Application</Box>
              )}
            </LoadingButton>
            {!isAuthenticated ? (
              <LoadingButton
                fullWidth
                size="large"
                variant="contained"
                loading={isLoading}
                onClick={handleLogin}
              >
                Login to Apply
              </LoadingButton>
            ) : null}
            {currentApplication.jobId === jobId &&
            (currentApplication.status === "pending" ||
              currentApplication.status === "approved") ? (
              <LoadingButton
                fullWidth
                size="large"
                variant="contained"
                loading={isLoading}
                onClick={handleCancel}
              >
                Cancel
              </LoadingButton>
            ) : null}
          </Stack>
        </FormProvider>
      </Container>
    </Card>
  );
};

export default ApplyJob;
