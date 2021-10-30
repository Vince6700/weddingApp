import React from "react";
import { Switch, Route, BrowserRouter as RouterDom } from "react-router-dom";
import Home from "./Home";
import { createTheme, ThemeProvider } from "@mui/material";
import { themeOptions } from "./theme";
import Layout from "./components/Layout";

const Index = () => {
  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <RouterDom>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </RouterDom>
      </Layout>
    </ThemeProvider>
  );
};

export default Index;
