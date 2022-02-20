import useGuest from "./hooks/useGuest";
import { Box, Button, Divider, Link, Theme, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useQuery from "./hooks/useQuery";
import InvitationItem from "./components/InvitationItem";
import InvitationHeader from "./components/InvitationHeader";
import InvitationBody from "./components/InvitationBody";
import InvitationResponse from "./components/InvitationResponse";

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

  const onConfirmInvitation = () => {
    history.push("/confirm-invitation");
  };

  return (
    <Box>
      <InvitationHeader />
      {(!guest?.responded || guest?.confirm) && (
        <InvitationBody guest={guest} />
      )}
      {guest?.responded && !guest?.confirm && (
        <InvitationItem title="Dommage" icon="😢">
          <Typography color="primary" textAlign="center">
            Merci d'avoir répondu à notre invitation.
            <br />
            Nous sommes tristes de ne pas vous compter parmi nous, mais ce n'est
            que partie remise 😁
          </Typography>
        </InvitationItem>
      )}
      {!guest?.responded && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="outlined"
            color="primary"
            onClick={onConfirmInvitation}
          >
            Répondre
          </Button>
        </Box>
      )}
      {guest?.responded && guest.confirm && (
        <InvitationResponse guest={guest} />
      )}
      <Box>
        <Typography color="primary" variant="body2" mt={2} textAlign="center">
          Pour tout changement, envoyez un mail à{" "}
          <Link href="mailto:vincent.racelle@gmail.com">
            vincent.racelle@gmail.com
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Invitation;
