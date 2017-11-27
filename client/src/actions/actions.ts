import * as types from './actionTypes';
import config from "../../../config/config";
import { Dispatch } from 'redux';

export const loadStores = () => {
  return (dispatch : Dispatch<any>) => {
    dispatch(fetchStores());
    return new Promise<String>((resolve: any, reject: any) => {
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
export const fetchStoresSuccess = (data : any) => {
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

export const updateProductData = (storeId: any, product: any) => {
  return {
    type: types.UPDATE_PRODUCT_DATA,
    storeId,
    product
  }
}

export const addProduct = (storeId : any, product: any) => {
  return {
    type: types.ADD_PRODUCT,
    storeId,
    product
  }
}

export const filterProduct = (name: string) => {
  return {
    type: types.FILTER_PRODUCT,
    name 
  }
}

export const searchProduct = (name: any) => {
  return (dispatch: any) => {
    dispatch(filterProduct(name));
    //return new Promise((resolve, reject) => {
    return fetch(`${config.SERVER_API}/stories/?q=${name}`)
      .then(res => res.json())
      .then(data => {
        dispatch(fetchStoresSuccess(data));
        //resolve();
      })
      .catch(() => {
        dispatch(fetchStoresError());
        //  reject(error.toString());
      })
    // });
  };
}

export const loadComments = () => {
  // return dispatch => {
  //   dispatch(fetchComments());
  //   return new Promise((resolve, reject) => {
  //     return fetch(`${config.SERVER_API}/comments/`)
  //       .then(res => res.json())
  //       .then(data => {

  //       })
  //   });
  // }
};

export const fetchComments = () => {
  return {
    type: types.FETCH_COMMENTS
  }
}