import { createAsyncThunk } from "@reduxjs/toolkit";
import { Chat } from "../../../types/chat";
import { getUsersCredit } from "../../../apiClient/chat.apiclient";

export const fetchCredits = createAsyncThunk(
  "fetchCredits",
  async (_, { rejectWithValue }) => {
    try {
      const response: Chat = await getUsersCredit();
      return response;
    } catch (error: any) {
      const response = error.reseponse.data;
      return rejectWithValue(response);
    }
  }
);
