import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();

  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Typography variant="h5" component="h5" color="primary" mb={2}>
          🤭 Vous êtes perdus ? 🤭
        </Typography>
      </Box>
      <Button
        variant="outlined"
        type="submit"
        fullWidth
        onClick={() => history.push("/")}
      >
        Retour à la page d'accueil
      </Button>
    </Box>
  );
};

export default NotFound;
