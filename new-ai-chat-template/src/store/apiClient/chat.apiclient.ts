import axios from "axios";
import { HEADERS } from "../requestDefaults/axiosDefaults";
import { CREDIT_URL } from "../requestDefaults/routes";
import { Chat } from "../types/chat";

export const getUsersCredit = (): Promise<Chat> => {
  return new Promise(async (res, rej) => {
    await axios
      .get(`${CREDIT_URL}`, HEADERS)
      .then((_res) => {
        res(_res.data);
      })
      .catch((error) => {
        rej(error);
      });
  });
};
