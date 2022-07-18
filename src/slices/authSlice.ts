import { createSlice } from "@reduxjs/toolkit";
import { signUp } from "asyncActions";
import { IRegistrationState } from "types";

const initialState: IRegistrationState = {
  isRegistration: true,
  message: ''
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setSuccessfulRegistration(state, action) {
      return {
        ...state,
        isRegistration: action.payload,
        message: "Registration completed successfully!"
      };
    },
  },
});

const { actions, reducer } = registrationSlice;
export const { setSuccessfulRegistration } = actions;

export default reducer;
