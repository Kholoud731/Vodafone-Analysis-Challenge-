import { combineReducers } from "redux";
import dataReducer from "./dataReducer";

const RootReducer = combineReducers({
    data: dataReducer
})

export default RootReducer 