import { useContext } from "react";
import { GuestContext } from "../context/guestProvider";

const useGuest = () => useContext(GuestContext);

export default useGuest;
