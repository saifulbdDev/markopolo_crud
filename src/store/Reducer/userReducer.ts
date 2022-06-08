import * as Types from "../types/userTypes";
const initialState = {
  users: null,
  user:null,
  status: null,
  posts: [],
};
const userReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.USER_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case Types.GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case Types.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case Types.ADD_POST:
      return {
        ...state,
        posts: state.posts.concat(action.payload),
      };
    case Types.EDIT_POST:
      return {
        ...state,
        posts: state.posts.concat(action.payload),
      };
    case Types.FAILED:
      return {
        ...state,
        status: action.payload,
      };
    case Types.SUCCESS:
      return {
        ...state,
        status: action.payload,
      };
    case Types.LOADING:
      return {
        ...state,
        status: action.payload,
      };
    case Types.REMOVES_STATUS:
      return {
        ...state,
        status: action.payload,
      };

    default:
      break;
  }

  return newState;
};
export default userReducer;
