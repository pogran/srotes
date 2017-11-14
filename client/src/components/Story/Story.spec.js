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

const mockStore = configureMockStore([ thunk ]);
const storeStateMock = {
    store:{
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
                        count: 4,
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

describe("test <Story/> component", function () {
    let container,
        store,
        updateProductData = sinon.spy();

    const props = {
        id: 2,
        filterName: '',
        updateProductData:updateProductData
    };

    beforeEach(() => {
        store = mockStore(storeStateMock);
        container = mount(<Story store={store} {...props}/>);
    });

    it('count div', () => {
        expect(container.find('div').length).to.equal(9);
    })

    it('count +', () => {
        const product = container.find('Product').first();
        //product.simulate('updateProduct')
        //product.props().updateProduct({name: 1, count: 2, id: 3});
        expect(updateProductData.calledOnce).to.equal(false);
        //expect(container.props().updateProductData.mock.calls.length).toBe(1);
        //product.simulate('updateProduct');
    })

    // it('AddProduct', () => {
    //     const addProduct = container.find('AddProduct');
    //     console.log('add', addProduct.debug());
    // });
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
        const mockStore = configureMockStore(middlewares)
        const store = mockStore({stores: []});

        return store.dispatch(actions.searchProduct(name)).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
});