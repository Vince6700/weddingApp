import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Typography color="primary" sx={{ mb: 2 }}>
        Entre ton adresse email
      </Typography>
      <Box component="form" autoComplete="off">
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          fullWidth
          color="primary"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" fullWidth>
          Voir mon invitation
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
