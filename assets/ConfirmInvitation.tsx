import React, { useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import useGuest from "./hooks/useGuest";
import {
  SentimentDissatisfiedOutlined,
  SentimentSatisfiedOutlined,
} from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";

const renderOptions = () => {
  const array = [0, 1, 2, 3, 4];
  return array.map((num: number) => (
    <MenuItem value={num} key={num}>
      {num}
    </MenuItem>
  ));
};

const validationSchema = yup.object({
  adults: yup
    .number()
    .max(4, "4 adultes maximum")
    .min(1, "1 adulte minimum")
    .required(),
  children: yup.number().max(4, "maximum 4 enfants"),
  comments: yup.string(),
  confirm: yup.bool().required(),
});

const ConfirmInvitation = () => {
  const {
    guest,
    actions: { respondToInvitation },
    error,
  } = useGuest();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      adults: 1,
      children: 0,
      comments: "",
      confirm: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      respondToInvitation(values).then(() =>
        history.push(`/invitation?email=${guest?.email}`)
      );
    },
  });

  useEffect(() => {
    if (!guest) {
      history.push("/");
    }
  }, []);

  return (
    <Box>
      <Box display="flex" justifyContent="center" mb={2}>
        <Typography variant="h2" component="h2" color="primary">
          Ma réponse
        </Typography>
      </Box>
      <Box component="form" autoComplete="off" onSubmit={formik.handleSubmit}>
        <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
          <RadioGroup
            name="confirm"
            onChange={formik.handleChange}
            value={formik.values.confirm}
            row
            sx={{ justifyContent: "space-evenly", width: "100%" }}
          >
            <FormControlLabel
              value={true}
              control={
                <Radio
                  checkedIcon={<SentimentSatisfiedOutlined color="primary" />}
                  sx={{
                    color: (theme: Theme) => `${theme.palette.primary.main}80`,
                  }}
                />
              }
              label="Je viens"
            />
            <FormControlLabel
              value={false}
              control={
                <Radio
                  checkedIcon={
                    <SentimentDissatisfiedOutlined color="primary" />
                  }
                  sx={{
                    color: (theme: Theme) => `${theme.palette.primary.main}80`,
                  }}
                />
              }
              label="Je ne viens pas"
            />
          </RadioGroup>
        </FormControl>
        {formik.values.confirm === "true" && (
          <>
            <Box mb={2}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="adults-label">Adultes</InputLabel>
                <Select
                  labelId="adults-label"
                  id="adults"
                  label="adultes"
                  name="adults"
                  value={formik.values.adults}
                  onChange={formik.handleChange}
                  error={formik.touched.adults && Boolean(formik.errors.adults)}
                >
                  {renderOptions()}
                </Select>
                <FormHelperText
                  sx={{ color: (theme: Theme) => theme.palette.error.main }}
                >
                  {(formik.touched.adults && formik.errors.adults) || error}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="children-label">
                  <Box display="flex">
                    <Typography variant="body1">Enfants *</Typography>
                  </Box>
                </InputLabel>
                <Select
                  labelId="children-label"
                  id="children"
                  label="enfants"
                  name="children"
                  value={formik.values.children}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.children && Boolean(formik.errors.children)
                  }
                >
                  {renderOptions()}
                </Select>
                <FormHelperText>
                  {formik.touched.children && formik.errors.children}
                </FormHelperText>
              </FormControl>
              <Typography variant="caption" color="primary">
                * moins de 15 ans
              </Typography>
            </Box>
          </>
        )}
        {formik.values.confirm && (
          <>
            <Box mb={2}>
              <TextField
                name="comments"
                variant="outlined"
                multiline
                color="primary"
                fullWidth
                label="Commentaires"
                rows={4}
                value={formik.values.comments}
                onChange={formik.handleChange}
                error={
                  formik.touched.comments && Boolean(formik.errors.comments)
                }
                helperText={formik.touched.comments && formik.errors.comments}
              />
            </Box>
            <Box display="flex" justifyContent="center">
              <Button color="primary" variant="contained" type="submit">
                Répondre
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ConfirmInvitation;
