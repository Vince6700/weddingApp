import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import useGuest from "./hooks/useGuest";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Entrez une adresse mail valide")
    .required("Email requis"),
});

const Home = () => {
  const {
    actions: { fetchGuest },
    error,
  } = useGuest();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      fetchGuest(values.email);
    },
  });

  return (
    <Box>
      <Typography color="primary" sx={{ mb: 2 }}>
        Entre ton adresse email
      </Typography>
      <Box component="form" autoComplete="off" onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          name="email"
          fullWidth
          color="primary"
          sx={{ mb: 2 }}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={
            (formik.touched.email && Boolean(formik.errors.email)) || !!error
          }
          helperText={(formik.touched.email && formik.errors.email) || error}
        />
        <Button variant="contained" type="submit" fullWidth>
          Voir mon invitation
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
