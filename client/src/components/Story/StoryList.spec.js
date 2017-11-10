import React from 'react';
import {expect} from 'chai';
import Enzyme,{shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store'

// components
import StoryList from './StoryList';

Enzyme.configure({ adapter: new Adapter() });

let context;

function shallowStoryList() {
    return shallow(
        <StoryList/>, {
            context: context
        }
    );
}

describe("<StoryList/>", function () {
    const initialState = {stores: [{id: 1, products: []}]};
    const mockStore = configureStore();
    let store, container;

    beforeEach(function () {
        store = mockStore(initialState);
        container = shallow(<StoryList store={store}/>)
    });

    it("test", function () {
        expect(container);
    })
});

// describe('Shallow Render REACT COMPONENTS',()=>{
//     let wrapper;
//     const stores = [];
//
//     beforeEach(()=>{
//         wrapper = shallow(<StoryList stores={stores}/>)
//
//     })
//
//     it('+++ render the DUMB component', () => {
//         expect(wrapper.length).toEqual(1)
//     });
//
//     it('+++ contains output', () => {
//         expect(wrapper.find('input[placeholder="Output"]').prop('value')).toEqual(stores)
//     });
//
// });

