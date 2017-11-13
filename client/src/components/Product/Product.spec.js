import React from 'react';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import Product from './Product';

const updateProduct = sinon.spy();
const props = {
    data: {
        count: 1,
        name: 'apple'
    },
    updateProduct: updateProduct,
};

const container = shallow(<Product {...props}/>);

describe("test <Product/> component", function () {
    it('should render two div', () => {
        expect(container.find('div').length).to.equal(2);
    });
});
