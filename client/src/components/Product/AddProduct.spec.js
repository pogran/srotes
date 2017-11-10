import React from 'react';
import {expect} from 'chai';
import Enzyme,{shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// components
import AddProduct from './AddProduct';

Enzyme.configure({ adapter: new Adapter() });

let context;

function shallowAddProduct() {
    return shallow(
        <AddProduct/>, {
            context: context
        }
    );
}

describe("<AddProduct/>", function () {

    beforeEach(function () {
        context = {
            i18n: {
                getMessage: (code) => {
                    return code
                }
            }
        };
    });

    it("", function () {
        const wrapper = shallowAddProduct();

        expect(wrapper);
    })
});
