import { ThemeOptions } from "@mui/material";

declare module "@mui/material/styles" {
  export interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#cfd8dc",
      light: "#ffffff",
      dark: "#808e95",
    },
    secondary: {
      main: "#05445e",
      light: "#3f6f8b",
      dark: "#001d34",
    },
    background: {
      default: "#121212",
      paper: "#181818",
    },
    text: {
      primary: "#f8f8ff",
    },
  },
  typography: {
    fontFamily: "Quicksand, sans-serif",
    h1: {
      fontFamily: "Smooch, cursive",
    },
    h2: {
      fontFamily: "Quicksand, sans-serif",
    },
    h3: {
      fontFamily: "Quicksand, sans-serif",
    },
    h4: {
      fontSize: "3rem",
      "@media (max-width:480px)": {
        fontSize: "2rem",
      },
    },
    h5: {
      fontSize: "2rem",
      "@media (max-width:480px)": {
        fontSize: "1.5rem",
      },
    },
    body1: {
      color: "#FFF",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#808e9590",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          "&:before": {
            borderTop: "thin solid #808e95",
          },
          "&:after": {
            borderTop: "thin solid #808e95",
          },
        },
      },
    },
  },
};
