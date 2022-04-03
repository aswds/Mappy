import {
  USER_STATE_CHANGE,
  USER_POST_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USER_FOLLOWERS_STATE_CHANGE,
  USER_INFO_LOADING,
  USER_INFO_LOADED,
} from "../constans";
const initialState = {
  currentUser: null,
  loading: false,
  posts: [],
  following: [],
  followers: [],
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case USER_INFO_LOADED: {
      return {
        ...state,
        currentUser: action.currentUser,
        loading: false,
      };
    }
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case USER_POST_STATE_CHANGE:
      return {
        ...state,
        posts: action.posts,
      };
    case USER_FOLLOWING_STATE_CHANGE:
      return {
        ...state,
        following: action.following,
      };
    case USER_FOLLOWERS_STATE_CHANGE:
      return {
        ...state,
        followers: action.followers,
      };

    default: {
      return state;
    }
  }
};
