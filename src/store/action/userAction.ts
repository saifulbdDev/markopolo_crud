import * as Types from "../types/userTypes";
import axios from "../../apis/axiosApiInstance";
import { Dispatch } from "redux";

export const getUsers = () => {
  return async (dispatch: Dispatch) => {
    try {
      await axios
        .get("/users")
        .then((res: { data: { success: any; data: any } }) => {
          if (res.data) {
            dispatch({
              type: Types.GET_USERS,
              payload: res.data,
            });
          }
        });
    } catch (error) {
      // showToast("error", "Something went wrong");
      //
    }
  };
};
export const getPosts = () => {
  return async (dispatch: Dispatch) => {
    try {
      await axios
        .get("/posts")
        .then((res: { data: { success: any; data: any } }) => {
          if (res.data) {
            dispatch({
              type: Types.GET_POSTS,
              payload: res.data,
            });
          }
        });
    } catch (error) {
      // showToast("error", "Something went wrong");
      //
    }
  };
};
export const addPost = (value: IPost) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: Types.LOADING,
      payload: "loading",
    });
    try {
      await axios
        .post("/posts", {
          body: JSON.stringify(value),
        })
        .then((res: any) => {
          if (res.status === 201) {
            dispatch({
              type: Types.ADD_POST,
              payload: value,
            });
            dispatch({
              type: Types.LOADING,
              payload: "add",
            });
          }
        });
    } catch (error) {
      dispatch({
        type: Types.FAILED,
        payload: "failed",
      });
    }
  };
};
export const editPost = (value: any) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: Types.LOADING,
      payload: "loading",
    });
    try {
      await axios
        .put(`/posts/${value.id}`, {
          body: JSON.stringify(value),
        })
        .then((res: any) => {
          if (res.status === 200) {
            dispatch({
              type: Types.EDIT_POST,
              payload: value,
            });
            dispatch({
              type: Types.LOADING,
              payload: "edit",
            });
          }
        });
    } catch (error) {
      dispatch({
        type: Types.FAILED,
        payload: "failed",
      });
    }
  };
};
export const deletePost = (value: number) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.delete(`/posts/${value}`, {}).then((res: any) => {
        if (res.status === 200) {
          dispatch({
            type: Types.REMOVE_POST,
            payload: value,
          });
          dispatch({
            type: Types.LOADING,
            payload: "remove",
          });
        }
      });
    } catch (error) {
      dispatch({
        type: Types.FAILED,
        payload: "failed",
      });
    }
  };
};
export const removeStatus = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: Types.REMOVES_STATUS,
      payload: "",
    });
  };
};
export const userLogin = (value: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: Types.USER_LOGIN,
      payload: value,
    });
  };
};
export const userLogOut = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: Types.USER_LOGIN,
      payload: "",
    });
  };
};
