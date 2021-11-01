import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import useGuest from "./hooks/useGuest";

const Home = () => {
  const [email, setEmail] = useState<string>("");
  const {
    actions: { fetchGuest },
    error,
  } = useGuest();

  const onClick = (e: any) => {
    e.preventDefault();
    fetchGuest(email);
  };

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
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(event.currentTarget.value)
          }
          error={!!error}
          helperText={error}
        />
        <Button variant="contained" onClick={onClick} fullWidth>
          Voir mon invitation
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
