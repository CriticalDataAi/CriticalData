"use client";
import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  Grid,
  TextField,
  Snackbar,
  Alert,
  Container,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";

import { useFormik } from "formik";
import * as yup from "yup";

import Cookies from "js-cookie";

import AuthAPI from "@/apis/AuthAPI";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const router = useRouter();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Entre com um email válido")
      .required("O e-mail é obrigatório"),
    password: yup
      .string()
      .min(4, "A senha deve ter no mínimo 4 caracteres")
      .required("Senha é obrigatória"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.email = values.email.toLowerCase();
      try {
        const data = await AuthAPI.getToken(values.email, values.password);

        if (!data) {
          setSnackbarOpen(true);
          return "";
        }

        Cookies.set("auth-token", data?.access_token);
        Cookies.set("username", data?.username);
        Cookies.set("userrole", data?.userrole);

        router.push("/");
      } catch {
        setSnackbarOpen(true);
      }
    },
  });

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <>
      <Head>
        <title>Cards - Components</title>
      </Head>

      <Container 
        maxWidth="md"
        style={{ minHeight: '100vh' }}
        justifyContent="center"
        direction="column"
      >
      <form onSubmit={formik.handleSubmit}
        style={{ minHeight: '100vh' }}
      >
      <Stack justifyContent="center" 
        style={{ minHeight: '100vh' }}
      >
        <Card>
          <CardHeader title="Login" />
          <CardContent>
          <Stack>
            <Box>
              <TextField
                required
                label="Email"
                name="email"
                sx={{ width: "100%" }}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Box>
            <Box mt="25px">
              <TextField
                required
                label="Senha"
                name="password"
                type="password"
                sx={{ width: "100%" }}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </Box>
            <Stack
              justifyContent="space-between"
              direction="row"
              alignItems="center"
              my={2}
            ></Stack>
          </Stack>
          <Box>
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
            >
              Sign In
            </Button>
          </Box>
          <Box>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              autoHideDuration={5000}
              open={snackbarOpen}
              onClose={handleClose}
              message="Não foi possível realizar o login"
            >
              <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
                Não foi possível realizar o login
              </Alert>
            </Snackbar>
          </Box>
          </CardContent>
        </Card>
      </Stack>
      </form>
      </Container>
    </>
  );
};

export default AuthLogin;