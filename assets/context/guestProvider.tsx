import React, { createContext, useState } from "react";
import {
  IGuestContextValue,
  IGuestData,
  IGuestProviderState,
} from "../models/guestModel";
import { fetchGuestByEmail, modifyGuestById } from "../clients/guestClient";
import useMountedRef from "../hooks/useMountedRef";

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
  isLoading: false,
});

const GuestProvider = ({ children }: IGuestContext) => {
  const [state, setState] = useState<IGuestProviderState>({
    email: null,
    guest: null,
    error: null,
    isLoading: false,
  });
  const mountedRef = useMountedRef();

  const fetchGuest = async (email: string) => {
    try {
      setState((state) => ({ ...state, isLoading: true }));
      const res = await fetchGuestByEmail(email);
      if (mountedRef.current) {
        setState((state: IGuestProviderState) => ({
          ...state,
          guest: res.data,
          error: null,
        }));
      }
    } catch (error: any) {
      if (error.response.status === 404 && mountedRef.current) {
        setState((state: IGuestProviderState) => ({
          ...state,
          error: "Email introuvable",
        }));
      } else if (error.response && mountedRef) {
        setState((state: IGuestProviderState) => ({
          ...state,
          error: error.response.data,
        }));
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error("Error", error.message);
      }
    } finally {
      mountedRef.current &&
        setState((state) => ({ ...state, isLoading: false }));
    }
  };

  const respondToInvitation = async (guestData: IGuestData) => {
    try {
      setState((state) => ({ ...state, isLoading: true }));
      await modifyGuestById({ id: state.guest?.id, guestData });
    } catch (error: any) {
      if (error.response.status === 404 && mountedRef.current) {
        setState((state: IGuestProviderState) => ({
          ...state,
          error: "erreur: veuillez contacter: vincent.racelle@gmail.com",
        }));
      } else if (error.response && mountedRef.current) {
        setState((state: IGuestProviderState) => ({
          ...state,
          error: error.response.data,
        }));
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error("Error", error.message);
      }
    } finally {
      mountedRef.current &&
        setState((state) => ({ ...state, isLoading: true }));
    }
  };

  const value = {
    actions: { fetchGuest, respondToInvitation },
    guest: state?.guest,
    error: state?.error,
    isLoading: state.isLoading,
  };

  return (
    <GuestContext.Provider value={value}>{children}</GuestContext.Provider>
  );
};

export default GuestProvider;
