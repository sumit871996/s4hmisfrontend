import { configureStore } from '@reduxjs/toolkit'
import MedicineSlice from './slices/MedicineSlice'

import authSlice from './slices/authSlice'

const store = configureStore({
  reducer: {
    MedicineSlice,
    authSlice,
  },
})

export default store
