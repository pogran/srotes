import {initStores} from './initialState';
import _ from 'lodash';
import {
    ADD_PRODUCT, FETCH_STORES, FETCH_STORES_ERROR, FETCH_STORES_SUCCESS, FILTER_PRODUCT,
    UPDATE_PRODUCT_DATA
} from "../actions/actionTypes";

export default function stuff(state = initStores, action) {
    let indexStore = action.hasOwnProperty('storeId') ? state.stores.findIndex(x=> x.id === action.storeId) : -1;

    switch (action.type) {
        case FETCH_STORES:
            return {...state,
                loading: true
            };

        case FETCH_STORES_SUCCESS:
            return {...state,
                loading: false,
                stores: _.chain(action.data)
                    .keyBy('id')
                    .map(object => {
                        object.products = _.chain(object.products)
                            .keyBy('id')
                            .value();

                        return object
                    })
                    .value()
            }

        case FETCH_STORES_ERROR:
            return {...state,
                loading: false,
            }

        case UPDATE_PRODUCT_DATA:
            let indexProduct = state.stores[indexStore].products.findIndex(x => x.id === action.product.id);

            return {...state,
                stores: [
                    ...state.stores.slice(0, indexStore),
                    {
                        ...state.stores[indexStore],
                        products: [
                            ...state.stores[indexStore].products.slice(0, indexProduct),
                            action.product,
                            ...state.stores[indexStore].products.slice(indexProduct + 1)
                        ],
                    },
                    ...state.stores.slice(indexStore + 1)
                ]
            }

        case ADD_PRODUCT:
            return {...state,
                stores: [
                    ...state.stores.slice(0, indexStore),
                    {
                        ...state.stores[indexStore],
                        products: [
                            ...state.stores[indexStore].products,
                            {
                                ...action.product,
                                id: state.stores[indexStore].products.length + 1
                            }
                        ],
                    },
                    ...state.stores.slice(indexStore + 1)
                ]
            }

        case FILTER_PRODUCT:
            return {...state,
                filterName: action.name
            };

        default:
            return state;
    }
}