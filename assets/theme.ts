import { ThemeOptions } from "@mui/material";

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#c78f00",
      light: "#febf43",
      dark: "#916200",
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
    fontFamily: "Quicksand",
    h1: {
      fontFamily: "Stalemate",
    },
    h2: {
      fontFamily: "Stalemate",
    },
    h3: {
      fontFamily: "Stalemate",
    },
    body1: {
      color: "#FFF",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#febf4380",
        },
      },
    },
  },
};
