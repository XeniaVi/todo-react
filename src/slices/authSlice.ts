import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "asyncActions";
import { AuthState } from "types";

const initialState: AuthState = {
  isRegistration: true,
  isLogin: localStorage.getItem("token") ? true : false,
  message: '',
  registrationError: '',
  token: localStorage.getItem("token") ? localStorage.getItem("token") : ''
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
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      console.log(action.payload)
      localStorage.setItem("token", JSON.stringify(action.payload));
      console.log(action.payload)
      return {
        ...state,
        token: action.payload,
      }
    })
  },
});

const { actions, reducer } = registrationSlice;
export const { setSuccessfulRegistration, setRegistrationError } = actions;

export default reducer;
