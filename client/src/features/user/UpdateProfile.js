import React, { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Container,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import { FormProvider, FTextField } from "components/form";
import { useDispatch, useSelector } from "react-redux";
import { deactivateAccount, updateAccount } from "./userSlice";

const UpdateProfileSchema = Yup.object().shape({
  password: Yup.string(),

  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
});

const defaultValues = {
  password: "",
  passwordConfirmation: "",
  name: "",
  avatarUrl: "",
  aboutMe: "",
};

const UpdateProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  useEffect(() => {
    reset({
      password: "",
      passwordConfirmation: "",
      name: user.name,
      avatarUrl: user.avatarUrl,
      aboutMe: user.aboutMe,
    });
  }, [user]);
  const methods = useForm({
    resolver: yupResolver(UpdateProfileSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    dispatch(updateAccount(data)).then(() => reset());
  };

  const handleDeactivate = () => {
    dispatch(deactivateAccount());
    logout(() => {
      navigate("/register");
    });
  };
  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ marginBottom: 3 }}>
          {error && <Alert severity="error">{error} </Alert>}

          <FTextField name="name" label="Name" />
          <FTextField name="avatarUrl" label="Link Avatar" />
          <FTextField
            multiline
            rows={4}
            name="aboutMe"
            label="About Me"
            placeholder="Tell everybody something about you"
          />
          <FTextField
            name="password"
            label="Password"
            autoComplete="on"
            type={showPassword ? "string" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FTextField
            name="passwordConfirmation"
            label="Password Confirmation"
            autoComplete="on"
            type={showPasswordConfirmation ? "string" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPasswordConfirmation(!showPasswordConfirmation)
                    }
                    edge="end"
                  >
                    {showPasswordConfirmation ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
      <LoadingButton
        fullWidth
        size="large"
        color="error"
        variant="contained"
        sx={{ marginTop: 3 }}
        loading={isSubmitting || isLoading}
        onClick={handleDeactivate}
      >
        Deactivate Account
      </LoadingButton>
    </Container>
  );
};

export default UpdateProfile;
