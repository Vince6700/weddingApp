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
      <Typography color="primary" textAlign="center">
        <strong>Votre réponse :</strong>
      </Typography>
      <Typography color="primary" textAlign="center">
        {!!guest &&
          guest?.adults > 0 &&
          `${guest?.adults} ${guest?.adults === 1 ? "adulte" : "adultes"}`}
      </Typography>
      <Typography color="primary" textAlign="center">
        {!!guest &&
          guest?.children > 0 &&
          `${guest?.children} ${guest?.children === 1 ? "enfant" : "enfants"}`}
      </Typography>
    </Box>
  );
};

export default InvitationResponse;
