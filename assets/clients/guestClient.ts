import axios from "axios";
import { IGuestData } from "../models/guestModel";

interface IModifyGuestById {
  id?: number;
  guestData: IGuestData;
}

export const fetchGuestByEmail = async (email: string) => {
  return axios.get(`/api/guest/${email}`);
};

export const modifyGuestById = async ({ id, guestData }: IModifyGuestById) => {
  if (!!id) {
    return axios.put(`/api/guest/${id}`, guestData);
  }
};
