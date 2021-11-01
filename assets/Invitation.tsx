import useGuest from "./hooks/useGuest";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useQuery from "./hooks/useQuery";

const Invitation = () => {
  const {
    guest,
    error,
    actions: { fetchGuest },
  } = useGuest();
  const history = useHistory();
  const email = useQuery().get("email");

  useEffect(() => {
    !!email && fetchGuestFromUrl();
  }, [email]);

  useEffect(() => {
    if ((!guest && !email) || !!error) {
      history.push("/");
    }
  }, [guest, error]);

  const fetchGuestFromUrl = () => {
    fetchGuest(email);
  };

  return <Box>invite</Box>;
};

export default Invitation;
