import React, { useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import useGuest from "./hooks/useGuest";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const renderOptions = () => {
  const array = [0, 1, 2, 3, 4];
  return array.map((num: number) => <MenuItem value={num}>{num}</MenuItem>);
};

const ConfirmInvitation = () => {
  const {
    guest,
    actions: {},
  } = useGuest();
  const history = useHistory();

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
      <Box mb={2}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="adults-label">Adultes</InputLabel>
          <Select
            labelId="adults-label"
            id="adults"
            label="adultes"
            name="adults"
          >
            {renderOptions()}
          </Select>
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
          >
            {renderOptions()}
          </Select>
        </FormControl>
        <Typography variant="caption" color="primary">
          * moins de 12 ans
        </Typography>
      </Box>
      <Box mb={2}>
        <TextField
          name="comment"
          variant="outlined"
          multiline
          color="primary"
          fullWidth
          label="Commentaires"
          rows={4}
        />
      </Box>
      <Box display="flex" justifyContent="center" mb={2}>
        <FormControlLabel
          control={
            <Checkbox
              name="confirm"
              color="primary"
              icon={
                <FavoriteBorder
                  sx={{
                    color: (theme: Theme) => `${theme.palette.primary.light}80`,
                  }}
                />
              }
              checkedIcon={<Favorite />}
            />
          }
          label="je viens !"
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <Button color="primary" variant="contained">
          Envoyer ma réponse
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmInvitation;
