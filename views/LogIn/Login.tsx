import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import { loginForm } from "utility/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { reqLogin } from "pages/api/auth";
import { ROUTES } from "constants/Routes";

import appStore from "store/AppStore";

import CustomTypography from "components/CustomTypography";
import Button from "components/Button";
import { IUser } from "interfaces/user";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import TextFieldInput from "components/TextFieldInput/TextFieldInput";
import { GridContainer, LoginErrorContainer } from "./Login.styles";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loggedInUser: IUser | null = appStore((state) => state.user);
  const userToken: string | null = appStore((state) => state.token);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginForm), mode: "onBlur" });

  useEffect(() => {
    if (loggedInUser) {
      router.push(ROUTES.HOME);
    }
  }, [loggedInUser]);

  const handleLogin = async (values: any) => {
    setIsLoading(true);

    try {
 
      const response = await reqLogin({
        username: username,
        password: password,
      });
      console.log("response", response);
      const { token } = response;

      appStore.setState({
        user: {
          username,
        },
        token
      });
    } catch (error) {
      console.error("error", error);
      reset();
      setShowError(true);
      setIsLoading(false);
    }
  };

  return (
    // TODO: Change designs to follow figma designs
    <GridContainer container justifyContent="center" alignItems="center">
      <Grid item xs={4}>
        <Card variant="outlined">
          <Box p={6}>
            <Grid container>
              <Grid item xs={12}>
                <Box mb={2}>
                  <CustomTypography variant="h1">Login</CustomTypography>
                </Box>

                <Box>
                  <CustomTypography variant="h2" color="grey">
                    Welcome back!
                  </CustomTypography>
                </Box>
                {showError && !isLoading && (
                  <LoginErrorContainer>
                    <CustomTypography>
                      This username and password combination is not correct.
                      Please try again. If you’ve forgotten your password, we
                      can email you a link that will let you reset it.
                    </CustomTypography>
                  </LoginErrorContainer>
                )}
                <form onSubmit={handleSubmit(handleLogin)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextFieldInput
                        label="USER NAME"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        error={errors?.message}
                        register={register}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextFieldInput
                        label="PASSWORD"
                        name="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors?.message}
                        register={register}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        color="secondary"
                        onClick={handleLogin}
                        disabled={isLoading}
                      >
                        {!isLoading ? "Login" : "Please wait..."}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>
    </GridContainer>
  );
};

export default Login;
