import {initStores} from './initialState';
import {FETCH_STORES} from "../actions/actionTypes";

export default function stuff(state = initStores, action) {
    switch (action.type) {
        case FETCH_STORES:
            return {...state,
                loading: true
            };

        default:
            return state;
    }
}