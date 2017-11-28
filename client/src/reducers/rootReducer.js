import {
	combineReducers
} from 'redux'
import store from './storeReducer'
import comment from './commentReducer.ts'

const rootReducer = combineReducers({
	store,
	comment
})

export default rootReducer