import { createSlice } from "@reduxjs/toolkit";
import apiService from "app/apiService";
import { stringify } from "query-string";
const initialState = {
  isLoading: false,
  error: null,
  jobIds: [],
  jobs: {},
  currentJob: {},
};

const slice = createSlice({
  name: "job",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createJobSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.jobIds.unshift(action.payload._id);
      state.jobs[action.payload._id] = action.payload;
    },
    getJobSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { jobList } = action.payload;
      state.jobIds = [];
      jobList.forEach((job) => {
        state.jobIds.push(job._id);
        state.jobs[job._id] = job;
      });
    },
    getJobByIdSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentJob = { ...action.payload };
    },
  },
});

export const createJob =
  ({
    name,
    type,
    location,
    description,
    imageUrl,
    detailedInformation,
    category,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/job/create", {
        name,
        type,
        location,
        description,
        imageUrl,
        detailedInformation,
        category,
      });
      dispatch(slice.actions.createJobSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getJob =
  ({ page = 1, limit = 5, ...body }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const query = { page, limit };
    try {
      const response = await apiService.get(
        `/job/all?${stringify(query)}`,
        body
      );
      dispatch(slice.actions.getJobSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getJobById = (jobId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/job/${jobId}`);
    dispatch(slice.actions.getJobByIdSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
export default slice.reducer;
