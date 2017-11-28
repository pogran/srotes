import { TypesActionComment } from './../actions/actions';
import {initComments, IntInitComments} from "./initialState";

export default function commentReducer(state :IntInitComments = initComments, action: TypesActionComment) {
  switch (action.type) {
    default:
      return state;
  }
}