import { createSlice } from "@reduxjs/toolkit";
import apiService from "app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  currentApplication: {},
};

const slice = createSlice({
  name: "application",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    applyJobSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentApplication = { ...action.payload };
    },
    cancelJobSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentApplication = {};
    },
  },
});

export const applyJob =
  (jobId, { message }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/application/apply/${jobId}`, {
        message,
      });
      dispatch(slice.actions.applyJobSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const cancelJob = (jobId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/application/cancel/${jobId}`);
    dispatch(slice.actions.cancelJobSuccess());
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
export default slice.reducer;
