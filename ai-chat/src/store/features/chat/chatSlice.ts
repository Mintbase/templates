import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Chat } from "../../types/chat";
import { fetchCredits } from "./thunks/chatThunk";

const initialState: { status: Chat } = {
  status: {
    credits: 0,
  },
};

export const chatSlice = createSlice({
  name: "ai-chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //#region Fetch credits
    builder.addCase(fetchCredits.pending, (state) => {
      state.status = {
        ...state.status,
      };
    });
    builder.addCase(
      fetchCredits.fulfilled,
      (state, action: PayloadAction<Chat>) => {
        state.status = {
          ...state.status,
          credits: action.payload?.credits,
        };
      }
    );
    builder.addCase(fetchCredits.rejected, (state, action: any) => {
      state.status = {
        ...state.status,
        credits: action.payload?.credits,
      };
    });
    //#endregion
  },
});

export const chatSelector = (state: RootState) => state.chatReducer;
export default chatSlice.reducer;
