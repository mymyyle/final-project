import { createSlice } from "@reduxjs/toolkit";
import apiService from "app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  commentIds: [],
  comments: {},
};

const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.commentIds.unshift(action.payload._id);
      state.comments[action.payload._id] = action.payload;
    },
    getCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { commentList } = action.payload;
      state.commentIds = [];
      commentList?.forEach((comment) => {
        if (!state.commentIds.includes(comment._id))
          state.commentIds.unshift(comment._id);
        state.comments[comment._id] = { ...comment };
      });
    },
    replyCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const comment = action.payload;
      state.comments[comment._id] = { ...comment };
    },
    editCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const comment = action.payload;
      state.comments[comment._id] = { ...comment };
    },
    deleteCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const comment = action.payload;
      state.commentIds = state.commentIds.filter((id) => id !== comment._id);
    },
  },
});
export const createComment =
  (jobId, { content }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/comment/create/${jobId}`, {
        content,
      });
      dispatch(slice.actions.createCommentSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export const getCommentList = (jobId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/comment/all/${jobId}`);
    dispatch(slice.actions.getCommentSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const replyComment =
  (id, { reply }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/comment/${id}`, {
        reply,
      });
      dispatch(slice.actions.replyCommentSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export const editComment =
  (id, { content }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/comment/update/${id}`, {
        content,
      });
      dispatch(slice.actions.editCommentSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export const deleteComment = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/comment/delete/${id}`);
    dispatch(slice.actions.deleteCommentSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
export default slice.reducer;
