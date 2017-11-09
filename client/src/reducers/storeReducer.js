import {initStores} from './initialState';
import {FETCH_STORES, FETCH_STORES_ERROR, FETCH_STORES_SUCCESS} from "../actions/actionTypes";

export default function stuff(state = initStores, action) {
    switch (action.type) {
        case FETCH_STORES:
            return {...state,
                loading: true
            };

        case FETCH_STORES_SUCCESS:
            return {...state,
                loading: false,
                stores: action.data
            }

        case FETCH_STORES_ERROR:
            return {...state,
                loading: false,
            }

        default:
            return state;
    }
}