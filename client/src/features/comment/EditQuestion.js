import React from "react";
import { FormProvider, FTextField } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Container, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useDispatch, useSelector } from "react-redux";
import { createComment, editComment } from "./commentSlice";
import { useParams } from "react-router-dom";

const NewCommentSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

const defaultValues = {
  content: "",
};

const EditQuestion = ({ id, setShowEdit }) => {
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
  const { isLoading } = useSelector((state) => state.comment);

  const onSubmit = async (data) => {
    setShowEdit(false);
    dispatch(editComment(id, data)).then(() => reset());
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
          <FTextField
            name="content"
            label="Edit Question"
            placeholder="Enter your question"
          />

          <LoadingButton
            size="small"
            type="submit"
            variant="contained"
            loading={isSubmitting || isLoading}
          >
            Update
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
};

export default EditQuestion;
