import { configureStore } from '@reduxjs/toolkit'
import countriesSlice from './countriesSlice.js';

export default configureStore({
  reducer: {
    selectedCca3: countriesSlice,
    loading: countriesSlice,
    countries: countriesSlice,
    limit: countriesSlice,
    search: countriesSlice,
    continent: countriesSlice,
    failed: countriesSlice
  }
})

