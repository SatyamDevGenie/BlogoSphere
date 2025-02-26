import axios from "axios";
import {
  BLOG_CREATE_FAIL,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS,
  BLOG_DELETE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_LIST_SUCCESS,
  BLOG_REVIEW_CREATE_FAIL,
  BLOG_REVIEW_CREATE_REQUEST,
  BLOG_REVIEW_CREATE_SUCCESS,
  BLOG_UPDATE_FAIL,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_SUCCESS,
  BlOG_LIST_REQUEST,
} from "../constants/blogConstants";

export const listBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: BlOG_LIST_REQUEST });

    const { data } = await axios.get("https://blogosphere-id7a.onrender.com/api/blogs");

    dispatch({ type: BLOG_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: BLOG_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listBlogDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_DETAILS_REQUEST });

    const { data } = await axios.get(`https://blogosphere-id7a.onrender.com/api/blogs/${id}`);

    dispatch({ type: BLOG_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: BLOG_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createBlogReview =
  (blogId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: BLOG_REVIEW_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };

      await axios.post(`https://blogosphere-id7a.onrender.com/api/blogs/${blogId}/reviews`, review, config);

      dispatch({ type: BLOG_REVIEW_CREATE_SUCCESS });
    } catch (err) {
      dispatch({
        type: BLOG_REVIEW_CREATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const createBlog = (blog) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`https://blogosphere-id7a.onrender.com/api/blogs`, blog, config);

    dispatch({ type: BLOG_CREATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: BLOG_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};


export const updateBlog = (blog) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    console.log("Updating blog with ID:", blog._id); // Log blog._id to ensure it's not undefined

    const { data } = await axios.put(`https://blogosphere-id7a.onrender.com/api/blogs/${blog._id}`, blog, config);

    dispatch({ type: BLOG_UPDATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: BLOG_UPDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteBlog = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`https://blogosphere-id7a.onrender.com/api/blogs/${id}`, config);

    dispatch({ type: BLOG_DELETE_SUCCESS });
  } catch (err) {
    dispatch({
      type: BLOG_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
