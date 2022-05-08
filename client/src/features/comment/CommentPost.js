import React from "react";
import { FormProvider, FRadioGroup, FTextField } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Alert, Container, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { createJob } from "./jobSlice";
import { useDispatch, useSelector } from "react-redux";

const NewCommentSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

const defaultValues = {
  content: "",
};

const CommentPost = () => {
  const methods = useForm({
    resolver: yupResolver(NewCommentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  // const { isLoading } = useSelector((state) => state.job);

  const onSubmit = async (data) => {
    // dispatch(createJob(data)).then(() => reset());
  };
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "1rem",
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1} sx={{ marginBottom: 2 }}>
          <Typography> Question & Answer</Typography>

          <FTextField
            name="content"
            label="Question"
            placeholder="Enter your question"
          />

          <LoadingButton
            size="small"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            // loading={isSubmitting || isLoading}
          >
            Post
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
};

export default CommentPost;
