import * as types from './actionTypes';
//
// export function fetchStuff() {
//     return dispatch => {
//         return fetch('test')
//             .then(response => response.json())
//             .then(json => dispatch(receiveStuff(json)))
//     };
// }

export function loadStores() {
    return dispatch => {
        dispatch(fetchStores());
    };

    // return {
    //     type: types.FETCH_STORES
    // }
}

export function fetchStores() {
    return {
        type: types.FETCH_STORES
    }
}