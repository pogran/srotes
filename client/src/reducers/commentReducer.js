import {initComments} from "./initialState";

export default function commentReducer(state = initComments, action) {
  switch (action.type) {
    default:
      return state;
  }
}