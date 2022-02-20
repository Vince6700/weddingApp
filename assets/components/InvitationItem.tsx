import { Box, Divider, Typography } from "@mui/material";
import React from "react";

interface IInvitationItem {
  title: string;
  children: string | React.ReactNode;
  icon: string;
}

const InvitationItem = ({ children, title, icon }: IInvitationItem) => {
  return (
    <Box mb={2}>
      <Divider color="primary">
        <Typography component="h3" variant="h6" color="primary">
          {icon}
          &nbsp;
          {title}
          &nbsp;
          {icon}
        </Typography>
      </Divider>
      <Box display="flex" justifyContent="center">
        <Typography color="primary" sx={{ textAlign: "center" }}>
          {children}
        </Typography>
      </Box>
    </Box>
  );
};

export default InvitationItem;
