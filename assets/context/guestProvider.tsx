import React, { createContext, useState } from "react";
import {
  IGuestContextValue,
  IGuestData,
  IGuestProviderState,
} from "../models/guestModel";
import { fetchGuestByEmail, modifyGuestById } from "../clients/guestClient";

interface IGuestContext {
  children?: React.ReactNode;
}

export const GuestContext = createContext<IGuestContextValue>({
  actions: {
    fetchGuest: () => {},
    respondToInvitation: () => {},
  },
  guest: null,
  error: null,
});

const GuestProvider = ({ children }: IGuestContext) => {
  const [state, setState] = useState<IGuestProviderState>({
    email: null,
    guest: null,
    error: null,
  });

  const fetchGuest = async (email: string) => {
    try {
      const res = await fetchGuestByEmail(email);
      setState((state: IGuestProviderState) => ({
        ...state,
        guest: res.data,
        error: null,
      }));
    } catch (error: any) {
      if (error.response.status === 404) {
        setState((state: IGuestProviderState) => ({
          ...state,
          error: "Email introuvable",
        }));
      } else if (error.response) {
        setState((state: IGuestProviderState) => ({
          ...state,
          error: error.response.data,
        }));
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error("Error", error.message);
      }
    }
  };

  const respondToInvitation = async (guestData: IGuestData) => {
    try {
      await modifyGuestById({ id: state.guest?.id, guestData });
    } catch (error: any) {
      if (error.response.status === 404) {
        setState((state: IGuestProviderState) => ({
          ...state,
          error: "erreur: vueillez contacter: vincent.racelle@gmail.com",
        }));
      } else if (error.response) {
        setState((state: IGuestProviderState) => ({
          ...state,
          error: error.response.data,
        }));
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error("Error", error.message);
      }
    }
  };

  const value = {
    actions: { fetchGuest, respondToInvitation },
    guest: state?.guest,
    error: state?.error,
  };

  return (
    <GuestContext.Provider value={value}>{children}</GuestContext.Provider>
  );
};

export default GuestProvider;
