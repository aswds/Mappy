import { POST_UPLOADING_START, POST_UPLOADING_END } from "../constans";
const initialState = {
  isLoading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_UPLOADING_START:
      return {
        ...state,
        isLoading: action.payload,
      };
    case POST_UPLOADING_END:
      return {
        ...state,
        isLoading: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default postReducer;
