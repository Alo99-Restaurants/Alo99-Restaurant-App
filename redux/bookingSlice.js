import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createBookingOrderService,
  createBookingService
} from '../services/restaurant.booking.service';

const initialState = {
  isLoading: false,
  isAddNewBookingSuccess: false,
  isAddNewBookingOrderSuccess: false,
  isError: false,
  errorMessage: '',
  newBooking: {},
  newBookingOrder: {}
};

export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await createBookingService(payload);
      console.log('res', response);
      if (!response) {
        throw response.error;
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

export const createBookingOrder = createAsyncThunk(
  'booking/createBookingOrder',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await createBookingOrderService(payload);
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
    },
    clearAddNewBookingStatus: (state, action) => {
      return {
        ...state,
        isAddNewBookingSuccess: false
      };
    },
    clearAddNewBookingOrderStatus: (state, action) => {
      return {
        ...state,
        isAddNewBookingOrderSuccess: false
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBookingOrder.pending, (state) => {
        state.isLoading = true;
      });

    builder
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAddNewBookingSuccess = true;
        state.newBooking = action.payload.data;
      })
      .addCase(createBookingOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAddNewBookingOrderSuccess = true;
        state.newBookingOrder = action.payload.data;
      });

    builder
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(createBookingOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });
  }
});

export const { clearState, clearAddNewBookingStatus, clearAddNewBookingOrderStatus } =
  bookingSlice.actions;
export default bookingSlice.reducer;
