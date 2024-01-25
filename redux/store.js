import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import storeBranchesReducer from './storeBranchesSlice';
import tableLayoutReducer from './tableLayoutSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    storeBranches: storeBranchesReducer,
    layout: tableLayoutReducer
  },
});