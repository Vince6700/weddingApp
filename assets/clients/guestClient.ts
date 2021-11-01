import axios from "axios";

export const fetchGuestByEmail = async (email: string) => {
  return axios.get(`/api/guest/${email}`);
};
