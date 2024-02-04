import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFloorTableDetailService, getFloorTablesService } from '../services/restaurant.table.service';

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  layout: []
};

export const fetchFloorTables = createAsyncThunk(
  'layout/getFloorTablesService',
  async (id_floor) => {
    const response = await getFloorTablesService(id_floor);
    return response.data;
  }
);

export const fetchFloorTableDetail = createAsyncThunk(
  'layout/getFloorTableDetailService',
  async (id_floor) => {
    const response = await getFloorTableDetailService(id_floor);
    return response.data;
  }
);

export const tableLayoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    clearState: () => {
      return initialState;
    },
    setLayout: (state, action) => {
      state.layout = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFloorTables.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchFloorTables.fulfilled, (state, action) => {
      state.isLoading = false;
      state.layout = action?.payload?.items;
    });

    builder.addCase(fetchFloorTables.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action?.payload?.message;
    });
  },
});

export const { clearState, setStoreBranches } = tableLayoutSlice.actions;
export default tableLayoutSlice.reducer;