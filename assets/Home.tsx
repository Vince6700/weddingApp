import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import useGuest from "./hooks/useGuest";
import * as yup from "yup";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      fetchGuest(values.email).then(() => history.push("/invitation"));
    },
  });

  return (
    <Box>
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
        <Button variant="outlined" type="submit" fullWidth>
          Voir mon invitation
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
