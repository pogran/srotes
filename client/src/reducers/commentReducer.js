import {initComments} from "./initialState.ts";

export default function commentReducer(state = initComments, action) {
  switch (action.type) {
    default:
      return state;
  }
}