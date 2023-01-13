import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    modalState: false,
    modalRoute: '/'
  },
  reducers: {
    openModal: state => {
      state.modalState = true;
    },
    closeModal: state => {
      state.modalState = false;
    },
    toggleModal: state => {
      state.modalState = !state.modalState;
    },
    setModalRoute: (state, action) => {
      state.modalRoute = action.payload;
    },
    clearModalRoute: state => {
      state.modalRoute = '/';
    }
  }
});

export const {
  openModal,
  closeModal,
  toggleModal,
  setModalRoute,
  clearModalRoute
} = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
