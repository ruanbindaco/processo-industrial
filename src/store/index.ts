//import {legacy_createStore} from 'redux'
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { processReducer } from './process'

const rootreducer=combineReducers({processList: processReducer})

const store=configureStore({reducer:rootreducer,middleware:[thunk]});
export default store;