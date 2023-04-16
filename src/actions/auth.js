import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";

import setAuthToken from "../utils/setAuthToken";

import { appConfig } from "./../config/config";

export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  
  if (token) setAuthToken(token);

  try {
    const res = await axios.get(`${appConfig.API_URL}/api/users/getUser`);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register =
  ({ firstName , lastName , emailId, password, phoneNumber }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ firstName , lastName , emailId, password, phoneNumber });
    console.log(body)
    try {
      const res = await axios.post(
        `${appConfig.API_URL}/api/users/register`,
        body,
        config
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        // errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        console.log(errors);
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const login = (emailId, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ emailId, password });
  try {
    const res = await axios.post(`${appConfig.API_URL}/api/users/login`, body, config);
    console.log(res)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err?.response?.data?.errors;
    if (errors) {
      // errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      console.log(errors);
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
