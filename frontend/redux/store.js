import { createStore } from "redux";
import shiftsReducer from "./shiftsReducer";

const store = createStore(
  shiftsReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
