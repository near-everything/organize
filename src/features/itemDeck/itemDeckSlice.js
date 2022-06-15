import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentIndex: 0
};

export const itemDeckSlice = createSlice({
  name: 'itemDeck',
  initialState,
  reducers: {
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    nextItem: (state, action) => {
      state.currentIndex += 1;
    },
    lastItem: (state, action) => {
      state.currentIndex -= 1;
    }
  },
});

export const { setCurrentIndex, nextItem, lastItem } = itemDeckSlice.actions;

export const selectCurrentIndex = (state) => state.itemDeck.currentIndex;

export default itemDeckSlice.reducer;
