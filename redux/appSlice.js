import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  screen: {
    navigationBottomHeight: 0,
    headerHeight: 0
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    clearState: () => {
      return initialState;
    },
    setNavigationBottomHeight: (state, action) => {
      state.screen.navigationBottomHeight = action.payload;
    },
    setHeaderHeight: (state, action) => {
      state.screen.headerHeight = action.payload;
    },
  },
});

export const { clearState, setNavigationBottomHeight, setHeaderHeight } = appSlice.actions;
export default appSlice.reducer;