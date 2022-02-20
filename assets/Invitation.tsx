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

  /** todo what if I don't go*/

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
          mt: 2,
        }}
      >
        <Box>
          <Typography component="h4" variant="h4" color="primary">
            Invitation
          </Typography>
        </Box>
        <Box>
          <Typography component="h5" variant="h5" color="primary">
            {guest?.drink && "Vin d'honneur"}
          </Typography>
        </Box>
      </Box>
      {!guest?.drink && (
        <InvitationItem title="Quoi ?" icon={"📜"}>
          Cérémonie laïque
          <br />
          Vin d'honneur
          <br />
          Diner
          <br />
          Soirée endiablée
        </InvitationItem>
      )}
      {guest?.drink && (
        <InvitationItem title="Quoi ?" icon={"📜"}>
          Vin d'honneur
        </InvitationItem>
      )}
      <InvitationItem title="Où ?" icon={"📍"}>
        Ferme de Rawez <br /> 1 rue de Rawez, B-6730 Saint-Vincent
      </InvitationItem>
      <InvitationItem title="A quelle heure ?" icon={"⏱"}>
        {guest?.drink && "16h"}
        {!guest?.drink && "14h30"}
      </InvitationItem>
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
