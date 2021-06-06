import axios from "axios";
import { FETCH_USER } from "./types";

//redux-thunk will check if we are returning a function, it will pass the dispatch as an argument
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};
