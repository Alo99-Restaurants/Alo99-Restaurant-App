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
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRestaurantService();
      if (!response) {
        throw response.error;
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
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
      state.storeBranches = action.payload.items;
    });

    builder.addCase(fetchRestaurantList.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
  },
});

export const { clearState, setStoreBranches } = tableLayoutSlice.actions;
export default tableLayoutSlice.reducer;