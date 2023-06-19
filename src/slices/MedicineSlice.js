import { createSlice } from '@reduxjs/toolkit'
const MedicineSlice = createSlice({
  name: 'medicine',
  initialState: {
    medicines_list: [],
  },
  reducers: {
    updateMedicines: (state, action) => {
      state.medicines_list = [...action.payload]
    },
  },
})

export const { updateMedicines } = MedicineSlice.actions
export default MedicineSlice.reducer
