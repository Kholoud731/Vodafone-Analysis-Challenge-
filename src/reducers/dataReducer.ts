import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FALIURE } from "../actions/actionTypes";
import { ActionTypes, DataType } from "../actions/actionTypes";
import {SELECT_COUNTRY, SELECT_CAMP, SELECT_SCHOOL} from "../actions/actionTypes"
import { FILTER_SCHOOLS, REMOVE_SCHOOL, RESET_SCHOOLS } from "../actions/actionTypes";



interface StateType {
    loading: boolean
    data: DataType[]
    error: string
    camp: string
	country: string
	school: string
    selectedSchool: string[]
    lineColor: string[]
}

const initialState = {
    loading: false,
    data: [],
    error: '',
    camp: '',
    country: '',
    school: '',
    selectedSchool: [''],
    lineColor:['']
}

const dataReducer = (state:StateType = initialState, action:ActionTypes): StateType =>{

    switch(action.type){
        case FETCH_DATA_REQUEST:
            return {
                loading: true,
                data: [],
                error: '',
                camp: '',
                country: '',
                school: '',
                selectedSchool: [''],
                lineColor:['']
            }
        case FETCH_DATA_SUCCESS:
            return {
                loading: false,
                data: action.data,
                error: '',
                camp: action.data[0].camp,
                country: action.data[0].country,
                school: "Show all",
                selectedSchool: [''],
                lineColor:['']
            }
        case FETCH_DATA_FALIURE:
            return {
                loading: false,
                data: [],
                error: action.error,
                camp: '',
                country: '',
                school: '',
                selectedSchool: [''],
                lineColor:['']
            }
        case SELECT_COUNTRY:
            return {...state, country: action.country}
    
        case SELECT_CAMP:
            return {...state, camp: action.camp}

        case SELECT_SCHOOL:
            return {...state, school: action.school}

        case FILTER_SCHOOLS:
            
            if(state.selectedSchool[0] === ""){
                return {...state, selectedSchool: [action.selectedSchool], lineColor: [action.lineColor]}
            }else if (state.selectedSchool.indexOf(action.selectedSchool) > -1){
                        return state
            }else{
                return {...state, selectedSchool: [...state.selectedSchool, action.selectedSchool], lineColor: [...state.lineColor, action.lineColor]}
            } 
            case REMOVE_SCHOOL: 
                return {...state, 
                    selectedSchool: state.selectedSchool.filter((elm)=> elm !== action.selectedSchool),
                     lineColor: state.lineColor.filter((elm)=> elm !== action.lineColor)}
            
            case RESET_SCHOOLS:
                return {...state, selectedSchool: [""], lineColor:['']}
        default:
            return state
    }

}

export default dataReducer
