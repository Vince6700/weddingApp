import { Box, Divider, Typography } from "@mui/material";
import React from "react";

interface IInvitationItem {
  title: string;
  description: string;
}

const InvitationItem = ({ title, description }: IInvitationItem) => {
  return (
    <Box mb={2}>
      <Divider color="primary">
        <Typography component="h3" variant="h6" color="primary">
          {title}
        </Typography>
      </Divider>
      <Box display="flex" justifyContent="center">
        <Typography color="primary">{description}</Typography>
      </Box>
    </Box>
  );
};

export default InvitationItem;
