// uploadSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "services/api";

interface UploadState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UploadState = {
  status: "idle",
  error: null,
};

export const uploadImage = createAsyncThunk(
  "upload/uploadImage",
  async (formData: FormData) => {
    const response = await api.post("/uplaod", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadImage.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(uploadImage.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default uploadSlice.reducer;
