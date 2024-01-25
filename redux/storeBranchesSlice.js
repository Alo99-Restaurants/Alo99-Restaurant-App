import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRestaurantService } from '../services/restaurant.service';

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  storeBranches: []
};

export const fetchRestaurantList = createAsyncThunk(
  'storeBranches/getRestaurantService',
  async () => {
    const response = await getRestaurantService();
    return response.data;
  }
);

export const tableLayoutSlice = createSlice({
  name: 'storeBranches',
  initialState,
  reducers: {
    clearState: () => {
      return initialState;
    },
    setStoreBranches: (state, action) => {
      state.storeBranches = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurantList.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchRestaurantList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.storeBranches = action?.payload?.items;
    });

    builder.addCase(fetchRestaurantList.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action?.payload?.message;
    });
  },
});

export const { clearState, setStoreBranches } = tableLayoutSlice.actions;
export default tableLayoutSlice.reducer;