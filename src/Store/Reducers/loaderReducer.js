import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  showLoader: false
}

const loaderReducer = createSlice({
  name: 'loaderReducer',
  initialState: INITIAL_STATE,
  reducers: {
    updateShowLoader: (state, action) => {
      const { payload } = action
      state.showLoader = payload
      return state
    }
  }
})

export default loaderReducer.reducer
export const { updateShowLoader } = loaderReducer.actions
