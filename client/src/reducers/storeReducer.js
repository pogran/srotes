import {initStores} from './initialState';

export default function stuff(state = initStores, action) {
    switch (action.type) {
        default:
            return state;
    }
}