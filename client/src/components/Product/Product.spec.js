import React from 'react';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import Product from './Product';

describe("test <Product/> component", function () {
    let container,
        updateProduct;

    updateProduct = sinon.spy();
    const props = {
        data: {
            count: 1,
            name: 'apple'
        },
        updateProduct: updateProduct,
    };

    beforeEach(() => {
        container = mount(<Product {...props}/>);
    });

    it('should render two div', () => {
        expect(container.find('div').length).to.equal(2);
    });

    it('if count = 99 not call updateProduct', () => {
        container.setProps({ data: {count: 99, name: 'apple'}});
        expect(container.props().data.count).to.equal(99);
        container.find('button.btn-outline-success').simulate('click');
        expect(updateProduct.calledOnce).to.equal(false);
        expect(container.find('.count-product').text()).to.equal('99');
    });

    it('click +', () => {
        container.find('button.btn-outline-success').simulate('click');
        container.setProps({ data: {count: 2, name: 'apple'}});
        expect(updateProduct.calledOnce).to.equal(true);
        expect(container.find('.count-product').text()).to.equal('2');
    })

    it('click -', () => {
        container.find('button.btn-outline-danger').simulate('click');
        container.setProps({ data: {count: 1, name: 'apple'}});
        expect(container.find('.count-product').text()).to.equal('1');
    })

    it('if count null - class error', () => {
        container.setProps({...container.props(), data: {
            ...container.props().data,
            count: 0
        }});
        expect(container.find('.col-form-label').hasClass('error')).to.equal(true);
    })
});
