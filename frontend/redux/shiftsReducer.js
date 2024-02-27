import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  bookedShifts: []
};

const shiftsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BOOK_SHIFT":
      const updatedBookedShifts = [...state.bookedShifts, action.payload];
      AsyncStorage.setItem("bookedShifts", JSON.stringify(updatedBookedShifts))
        .catch(error => console.error('Error saving data:', error));
      return {
        ...state,
        bookedShifts: updatedBookedShifts,
      };
    case "CANCEL_SHIFT":
      const updatedCanceledShifts = state.bookedShifts.filter(
        (shift) => shift.id !== action.payload.id
      );
      AsyncStorage.setItem("bookedShifts", JSON.stringify(updatedCanceledShifts))
        .catch(error => console.error('Error saving data:', error));
      return {
        ...state,
        bookedShifts: updatedCanceledShifts,
      };
    default:
      return state;
  }
};

export default shiftsReducer;
