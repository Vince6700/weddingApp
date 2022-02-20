import InvitationItem from "./InvitationItem";
import React from "react";
import { IGuest } from "../models/guestModel";

interface IInvitationBody {
  guest?: IGuest | null;
}

const InvitationBody = ({ guest }: IInvitationBody) => {
  return (
    <>
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
    </>
  );
};

export default InvitationBody;
