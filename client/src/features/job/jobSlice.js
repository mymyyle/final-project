import { createSlice } from "@reduxjs/toolkit";
import apiService from "app/apiService";
import { stringify } from "query-string";
const initialState = {
  isLoading: false,
  error: null,
  jobIds: [],
  jobs: {},
  currentJob: {},
  allJobs: [],
  totalPages: 1,
  totalJobs: 0,
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
    editJobSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentJob = { ...action.payload };
    },
    getJobSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { jobList, count, totalPage } = action.payload;
      state.jobIds = [];
      jobList.forEach((job) => {
        state.jobIds.push(job._id);
        state.jobs[job._id] = job;
      });
      state.totalJobs = count;
      state.totalPages = totalPage;
    },
    getJobByIdSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentJob = { ...action.payload };
    },
    getJobOfCurrentUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { jobList, count, totalPage } = action.payload;
      state.allJobs = [...jobList];
      state.totalJobs = count;
      state.totalPages = totalPage;
    },
    deleteJobSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.allJobs = state.allJobs.filter(
        (job) => job._id !== action.payload._id
      );
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
export const editJob =
  (
    jobId,
    {
      name,
      type,
      location,
      description,
      imageUrl,
      detailedInformation,
      category,
      ...data
    }
  ) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    let status;
    if (data.status !== "ongoing") status = "done";
    try {
      const response = await apiService.put(`/job/update/${jobId}`, {
        name,
        type,
        location,
        description,
        imageUrl,
        detailedInformation,
        category,
        status,
      });
      dispatch(slice.actions.editJobSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getJob =
  ({ page = 1, limit = 5, ...body }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const query = { page, limit, ...body };
    try {
      const response = await apiService.get(`/job/all?${stringify(query)}`);
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
export const getJobOfCurrentUser =
  ({ name, page = 1, limit = 5 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const query = { page, limit, name };
    try {
      const response = await apiService.get(`/job/me/all?${stringify(query)}`);
      dispatch(slice.actions.getJobOfCurrentUserSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export const deleteJob = (jobId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/job/delete/${jobId}`);
    dispatch(slice.actions.deleteJobSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export default slice.reducer;
