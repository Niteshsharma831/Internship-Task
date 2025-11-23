import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/constants";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.list.push(action.payload);
    },

    deleteUser: (state, action) => {
      state.list = state.list.filter((u) => u.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load users";
      });
  },
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
