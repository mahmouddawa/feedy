import { FETCH_SURVEYS } from "../actions/types";

export default function surveysReducer(state = null, action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload || false;
    default:
      return state;
  }
}
