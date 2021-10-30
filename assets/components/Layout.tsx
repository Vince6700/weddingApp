import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import backgroundImg from "../images/background.jpg";

interface LayoutInterface {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutInterface) => {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minWidth: "100%",
        minHeight: "100vh",
      }}
      maxWidth="sm"
    >
      <Grid container>
        <Grid sm={8} sx={{ minHeight: "100vh" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundImage: `url(${backgroundImg})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "100%",
            }}
          />
        </Grid>
        <Grid sm={4}>
          <Grid container>
            <Grid sm={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "4rem 2rem",
                }}
              >
                <Typography component="h1" variant="h1" color="primary">
                  Claudia & Vincent
                </Typography>
              </Box>
            </Grid>
            <Grid sm={12}>{children}</Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
