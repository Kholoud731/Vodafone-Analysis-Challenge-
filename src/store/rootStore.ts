import { createStore, applyMiddleware } from "redux"
import thunk, {ThunkMiddleware} from "redux-thunk"
import reducers from '../reducers'
import { AppActions } from "../actions/actionTypes";
import { createLogger } from 'redux-logger'


const logger = createLogger()

export type AppState = ReturnType<typeof reducers>
export const store = createStore<AppState, AppActions,{},{}>(
    reducers, 
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>,logger))
