import useGuest from "./hooks/useGuest";
import { Box, Button, Divider, Link, Theme, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useQuery from "./hooks/useQuery";
import InvitationItem from "./components/InvitationItem";

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
      <Box mt={2} display="flex" justifyContent="center" mb={2}>
        <Typography component="h2" variant="h2" color="primary">
          Invitation
        </Typography>
      </Box>
      <InvitationItem title="Cérémonie" description="13H à la ferme de Rawez" />
      <InvitationItem title="Apéritif" description="14H à la ferme de Rawez" />
      {!guest?.drink && (
        <>
          <InvitationItem title="Repas" description="17H à la ferme de Rawez" />
          <InvitationItem
            title="Soirée"
            description="21H à la ferme de Rawez"
          />
        </>
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
      {guest?.responded && (
        <Box mt={2}>
          <Divider
            sx={{
              mt: 2,
              mb: 2,
              backgroundColor: (theme: Theme) =>
                `${theme.palette.primary.main}20`,
            }}
          />
          <Typography color="primary">Votre réponse:</Typography>
          <Typography color="primary">
            {guest.adults > 0 && `${guest.adults} adultes`}
          </Typography>
          <Typography color="primary">
            {guest.children > 0 && `${guest.children} enfants`}
          </Typography>
          <Typography color="primary" variant="body2" mt={2}>
            Pour tout changement, envoyez un mail à{" "}
            <Link href="mailto:vincent.racelle@gmail.com">
              vincent.racelle@gmail.com
            </Link>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Invitation;
