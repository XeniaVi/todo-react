import { createSlice } from "@reduxjs/toolkit";
import { actionSignIn } from "asyncActions";
import { AuthState } from "types/types";

const initialState: AuthState = {
  isRegistration: true,
  isLogin: localStorage.getItem("token") ? true : false,
  message: '',
  registrationError: '',
  token: localStorage.getItem("token") ? localStorage.getItem("token") : '',
};

export const registrationSlice = createSlice({  
  name: "registration",
  initialState,
  reducers: {
    setSuccessfulRegistration(state, action) {
      return {
        ...state,
        isRegistration: action.payload,
        message: "Registration completed successfully!",
        registrationError: ''
      };
    },
    setRegistrationError(state, action) {
      return {
        ...state,
        registrationError: action.payload,
      };
    },
    setMessage(state, action) {
      return {
        ...state,
        message: action.payload,
      };
    },
    setSignOut(state) {
      localStorage.setItem("token", ``);
      return {
        ...state,
        isLogin: false,
        token: '',
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(actionSignIn.fulfilled, (state, action) => {
      localStorage.setItem("token", `Bearer ${action.payload}`);
      return {
        ...state,
        isLogin: true,
        token: `Bearer ${action.payload}`,
      }
    })
  },
});

const { actions, reducer } = registrationSlice;
export const { setSuccessfulRegistration, setRegistrationError, setSignOut, setMessage } = actions;

export default reducer;
