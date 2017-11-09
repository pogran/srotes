import * as types from './actionTypes';
import config from "../../../config/config";

export const loadStores = () => {
    return dispatch => {
        dispatch(fetchStores());
        return fetch(`${config.SERVER_API}/stories`)
            .then(res => res.json())
            .then(data => {
                dispatch(fetchStoresSuccess(data));
            })
            .catch(error => {
                dispatch(fetchStoresError(error.toString()));
            })
    };
}
export const fetchStores = () => {
    return {
        type: types.FETCH_STORES
    }
}
export const fetchStoresSuccess = data => {
    return {
        type: types.FETCH_STORES_SUCCESS,
        data
    }
}
export const fetchStoresError = error => {
    return {
        type: types.FETCH_STORES_ERROR,
        error
    }
}