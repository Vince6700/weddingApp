import React from "react";
import { Switch, Route, BrowserRouter as RouterDom } from "react-router-dom";
import Home from "./Home";
import { createTheme, ThemeProvider } from "@mui/material";
import { themeOptions } from "./theme";
import Layout from "./components/Layout";
import GuestProvider from "./context/guestProvider";
import Invitation from "./Invitation";

const Index = () => {
  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <GuestProvider>
        <Layout>
          <RouterDom>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/invitation">
                <Invitation />
              </Route>
            </Switch>
          </RouterDom>
        </Layout>
      </GuestProvider>
    </ThemeProvider>
  );
};

export default Index;
