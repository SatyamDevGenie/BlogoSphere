import {
  BLOG_CREATE_FAIL,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_RESET,
  BLOG_CREATE_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_LIST_SUCCESS,
  BLOG_REVIEW_CREATE_FAIL,
  BLOG_REVIEW_CREATE_REQUEST,
  BLOG_REVIEW_CREATE_RESET,
  BLOG_REVIEW_CREATE_SUCCESS,
  BlOG_LIST_REQUEST,
} from "../constants/blogConstants";

export const blogListReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case BlOG_LIST_REQUEST:
      return { loading: true, blogs: [] };
    case BLOG_LIST_SUCCESS:
      return { loading: false, blogs: action.payload };
    case BLOG_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const blogDetailsReducer = (
  state = { blog: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case BLOG_DETAILS_REQUEST:
      return { ...state, loading: true };
    case BLOG_DETAILS_SUCCESS:
      return { loading: false, blog: action.payload };
    case BLOG_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const blogReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case BLOG_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true };
    case BLOG_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const blogCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_CREATE_REQUEST:
      return { loading: true };
    case BLOG_CREATE_SUCCESS:
      return { loading: false, success: true, blog: action.payload };
    case BLOG_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
