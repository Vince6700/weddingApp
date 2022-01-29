import React from "react";
import { Box, Grid, Theme, Typography } from "@mui/material";
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
    >
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
          lg={7}
          sx={{ minHeight: "100vh", display: { xs: "none", md: "block" } }}
        >
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
        <Grid item xs={12} md={6} lg={5}>
          <Box
            sx={{
              display: { xs: "flex", md: "block" },
              justifyContent: "center",
              backgroundImage: {
                xs: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImg})`,
                md: "none",
              },
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: { md: "100%" },
              minHeight: "100vh",
            }}
          >
            <Grid container>
              <Grid item sm={12}>
                <Box
                  sx={{
                    display: "flex",
                    padding: {
                      xs: "2rem",
                      sm: "4rem 2rem 2rem 2rem",
                    },
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h1"
                    color="primary"
                    sx={{
                      flexBasis: "100%",
                      display: "flex",
                      justifyContent: "center",
                      fontSize: {
                        xs: "2.5rem",
                        sm: "5rem",
                        md: "4rem",
                        lg: "4.5rem",
                      },
                    }}
                  >
                    <Box component="span">Claudia</Box>
                    <Box
                      component="span"
                      sx={{
                        color: "primary.dark",
                        ml: 1,
                        mr: 2,
                      }}
                    >
                      &
                    </Box>
                    <Box component="span">Vincent</Box>
                  </Typography>
                  <Typography
                    component="h4"
                    variant="h4"
                    color="primary"
                    sx={{
                      flexBasis: "100%",
                      display: "flex",
                      justifyContent: "center",
                      fontSize: {
                        xs: "2rem",
                        sm: "4.5rem",
                        md: "3.5rem",
                        lg: "4rem",
                      },
                    }}
                  >
                    4 juin 2022
                  </Typography>
                </Box>
              </Grid>
              <Grid item sm={12}>
                <Box
                  sx={{
                    margin: "0 2rem 2rem 2rem",
                    padding: "2rem",
                    border: "1px solid",
                    borderColor: (theme) => {
                      const color = theme.palette.primary.light;
                      return `${color}10`;
                    },
                    borderRadius: "10px",
                  }}
                >
                  {children}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
