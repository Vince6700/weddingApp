import { Box, Typography } from "@mui/material";
import React from "react";

const InvitationHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mb: 2,
        mt: 2,
      }}
    >
      <Box>
        <Typography component="h4" variant="h4" color="primary">
          Invitation
        </Typography>
      </Box>
    </Box>
  );
};

export default InvitationHeader;
