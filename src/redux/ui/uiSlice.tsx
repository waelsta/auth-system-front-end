import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../types/user';

type IUIstate = {
  modalState: boolean;
  modalEndpoint: string;
  modalParam: UserType;
  displayAlert: boolean;
};
const initialState: IUIstate = {
  modalState: false,
  modalEndpoint: '',
  modalParam: '',
  displayAlert: false
};
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setEndpoint: (state, action) => {
      state.modalEndpoint = action.payload;
    },
    setParam: (state, action) => {
      state.modalParam = action.payload;
    },
    ToggleState: state => {
      state.modalState = !state.modalState;
    },
    resetModal: state => {
      state.modalState = false;
      state.modalEndpoint = '';
      state.modalParam = '';
    },
    displayAlert: state => {
      state.displayAlert = true;
    },
    removeAlert: state => {
      state.displayAlert = false;
    }
  }
});

export const {
  setEndpoint,
  setParam,
  ToggleState,
  resetModal,
  displayAlert,
  removeAlert
} = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
