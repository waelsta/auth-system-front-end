import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    modalState: false,
    modalEndpoint: '',
    modalParam: ''
  },
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
    }
  }
});

export const { setEndpoint, setParam, ToggleState, resetModal } =
  uiSlice.actions;
export const uiReducer = uiSlice.reducer;
