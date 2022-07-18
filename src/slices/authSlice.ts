import { createSlice } from "@reduxjs/toolkit";
import { signUp } from "asyncActions";
import { IRegistrationState } from "types";

const initialState: IRegistrationState = {
  isRegistration: true,
  message: '',
  registrationError: ''
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
});

const { actions, reducer } = registrationSlice;
export const { setSuccessfulRegistration, setRegistrationError } = actions;

export default reducer;
