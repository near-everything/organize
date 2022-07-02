import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentIndex: 0
};

export const requestDeckSlice = createSlice({
  name: 'requestDeck',
  initialState,
  reducers: {
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    nextRequest: (state, action) => {
      state.currentIndex += 1;
    },
    lastRequest: (state, action) => {
      state.currentIndex -= 1;
    }
  },
});

export const { setCurrentIndex, nextRequest, lastRequest } = requestDeckSlice.actions;

export const selectCurrentIndex = (state) => state.requestDeck.currentIndex;

export default requestDeckSlice.reducer;
