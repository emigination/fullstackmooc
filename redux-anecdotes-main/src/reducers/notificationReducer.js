import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      state.unshift(action.payload);
    },
    popNotification(state) {
      state.pop();
    }
  }
});

export const setNotification = (message, seconds) => {
  return dispatch => {
    dispatch(addNotification(message));
    setTimeout(() => {
      dispatch(popNotification());
    }, seconds * 1000);
  }
}

const { addNotification, popNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
