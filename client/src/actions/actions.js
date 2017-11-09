import * as types from './actionTypes';
import config from "../../../config/config";

export const loadStores = () => {
    return dispatch => {
        dispatch(fetchStores());
        return new Promise((resolve, reject) => {
            return fetch(`${config.SERVER_API}/stories`)
                .then(res => res.json())
                .then(data => {
                    dispatch(fetchStoresSuccess(data));
                    resolve();
                })
                .catch(error => {
                    dispatch(fetchStoresError());
                    reject(error.toString());
                })
        });
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
export const fetchStoresError = () => {
    return {
        type: types.FETCH_STORES_ERROR,
    }
}

export const updateProductData = (storeId, product) => {
    return {
        type: types.UPDATE_PRODUCT_DATA,
        storeId,
        product
    }
}

export const addProduct = (storeId, product) => {
    return {
        type: types.ADD_PRODUCT,
        storeId,
        product
    }
}