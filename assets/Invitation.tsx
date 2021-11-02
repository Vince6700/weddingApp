import useGuest from "./hooks/useGuest";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
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
      <Box mb={2} display="flex" justifyContent="center">
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
      {!guest?.confirm && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={onConfirmInvitation}
          >
            Confirmer mon invitation
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Invitation;
