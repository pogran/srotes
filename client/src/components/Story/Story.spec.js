import React from 'react';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import sinon from 'sinon';
import Story from './Story';

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
        product.props().updateProduct({name: 1, count: 2, id: 3});
        expect(updateProductData.calledOnce).to.equal(false);
        //expect(container.props().updateProductData.mock.calls.length).toBe(1);
    })

    it('AddProduct', () => {
        const addProduct = container.find('AddProduct');
        console.log('add', addProduct.debug());
    });
});