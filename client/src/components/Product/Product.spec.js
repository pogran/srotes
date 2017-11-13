import React from 'react';
import {expect} from 'chai';
import Enzyme,{shallow, mount} from 'enzyme';
import raf from '../../../../test/tempPolyfills';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import Product from './Product';

Enzyme.configure({ adapter: new Adapter() });

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
