import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createBookingService } from '../services/restaurant.booking.service';

const initialState = {
  isLoading: false,
  isAddNewBookingSuccess: false,
  isError: false,
  errorMessage: '',
  newBooking: {}
};

export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await createBookingService(payload);
      if (!response) {
        throw response.error;
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    clearState: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createBooking.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createBooking.fulfilled, (state, action) => {
      console.log('action.payload', action.payload);
      state.isLoading = false;
      state.isAddNewBookingSuccess= true;
      state.storeBranches = action.payload.data;
    });

    builder.addCase(createBooking.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
  }
});

export const { clearState } = bookingSlice.actions;
export default bookingSlice.reducer;
