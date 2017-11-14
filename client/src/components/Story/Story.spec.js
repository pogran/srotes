/* global describe, it, expect, jest */

import React from 'react';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock'

import sinon from 'sinon';
import Story from './Story';

import * as actions from "../../actions/actions";
import * as types from "../../actions/actionTypes";
import Product from "../Product/Product";
import {initStores} from "../../reducers/initialState";
import reducer from "../../reducers/storeReducer";

const mockStore = configureMockStore([ thunk ]);
const storeStateMock = {
    store:{
        loading: false,
        filterName: '',
        stores: [
            {
                id: 1,
                products: [

                ]
            },
            {
                id: 2,
                products: [
                    {
                        id: 1,
                        name: 'orange',
                        count: 1,
                    },
                    {
                        id: 2,
                        name: 'bananas',
                        count: 20,
                    }
                ]
            },{
                id: 3,
                products: [

                ]
            }
        ]
    }
};

describe.only("<Story/> component", function () {
    let container,
        store;

    const updateProductData = sinon.spy();


    const props = {
        id: 2,
        filterName: '',
        updateProductData: updateProductData,
    };

    beforeEach(() => {
        store = mockStore(storeStateMock);
        container = mount(<Story store={store} {...props}/>);
    });

    it('render name for product',() => {
        const product = container.find(Product).first();

    });

    it('click count plus for product', () => {
        const product = container.find(Product).first();
        product.find('.btn-outline-success').simulate('click');
        expect(container.props().store.getActions()[0].product)
            .to.deep.equal({
                id: 1, name: 'orange', count: 2
            });
        //console.log('prod update', container.props().store.replaceReducer());
        // store.dispatch(actions.fetchStores());
        // console.log('store', store.getActions());
        // console.log('store', store.getState());
        //product.find('.btn-outline-danger').simulate('click');
        //console.log('prod update', container.props().store.getActions());
    });

    it('click count minus for product', () => {
        const product = container.find(Product).first();
        product.find('.btn-outline-danger').simulate('click');
        expect(container.props().store.getActions()[0].product)
            .to.deep.equal({
            id: 1, name: 'orange', count: 0
        });
    })
});

describe('actions', () => {
    it('addProduct', () => {
        const storeId = 2;
        const product = {
            name: 'apple',
            count: 2,
        };
        const expectedAction = {
            type: types.ADD_PRODUCT,
            storeId,
            product
        };
        expect(actions.addProduct(storeId, product)).to.deep.equal(expectedAction);
    });

    it('updateProductData', () => {
        const storeId = 2;
        const product = {
            id: 1,
            name: 'orange',
            count: 5,
        };
        const expectedAction = {
            type: types.UPDATE_PRODUCT_DATA,
            storeId,
            product
        };
        expect(actions.updateProductData(storeId, product)).to.deep.equal(expectedAction);
    })
});

describe('async actions', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('searchProduct success', () => {
        const name = 'az';
        const data = [{"id":1,"products":[]},{"id":2,"products":[]},{"id":3,"products":[]}];

        fetchMock
            .getOnce(`/stories/?q=${name}`, {
                body: data,
                headers: { 'content-type': 'application/json' }
            });

        const expectedActions = [
            {type: types.FILTER_PRODUCT, name},
            {type: types.FETCH_STORES_SUCCESS, data}
        ]

        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const store = mockStore({stores: []});

        return store.dispatch(actions.searchProduct(name)).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
});

describe('test reducer story', () => {

    let state = {
        stores: [],
        loading: false,
        filterName: ''
    };

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal(state)
    })

    it('should handle FETCH_STORES', () => {
        expect(reducer(state,{
            type: types.FETCH_STORES,
        })).to.deep.equal({
            stores:[],
            loading: true,
            filterName: ''
        })
    })

    it('should handle ADD_PRODUCT', () => {
        expect(reducer({
            stores: [{
                id: 1,
                products: []
            }],
            loading: false,
            filterName: ''
        },{
            type: types.ADD_PRODUCT,
            storeId: 1,
            product: {
                name: 'apple',
                count: 1
            }

        })).to.deep.equal({
            stores: [{
                id: 1,
                products: [
                    {
                        name: 'apple',
                        count: 1,
                        id: 1
                    }
                ]
            }],
            loading: false,
            filterName: ''
        })
    });
});