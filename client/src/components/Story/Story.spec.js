import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { expect } from 'chai';

Enzyme.configure({ adapter: new Adapter() });

describe('is null', () => {
    it('null', () => {
        expect(null).to.equal(null);
    })
});