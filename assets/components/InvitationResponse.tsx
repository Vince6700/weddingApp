import { Box, Divider, Link, Theme, Typography } from "@mui/material";
import React from "react";
import { IGuest } from "../models/guestModel";

interface IInvitationResponse {
  guest?: IGuest | null;
}

const InvitationResponse = ({ guest }: IInvitationResponse) => {
  return (
    <Box mt={2}>
      <Divider
        sx={{
          mt: 2,
          mb: 2,
          backgroundColor: (theme: Theme) => `${theme.palette.primary.main}20`,
        }}
      />
      <Typography color="primary">Votre réponse:</Typography>
      <Typography color="primary">
        {!!guest && guest?.adults > 0 && `${guest?.adults} adultes`}
      </Typography>
      <Typography color="primary" textAlign="center">
        {!!guest && guest?.children > 0 && `${guest?.children} enfants`}
      </Typography>
    </Box>
  );
};

export default InvitationResponse;
