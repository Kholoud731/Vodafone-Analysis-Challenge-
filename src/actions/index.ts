import { Dispatch } from "redux"; // to import dispatch type from redux
import { AppState } from "../store/rootStore";
import { ActionTypes } from "./actionTypes";
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FALIURE } from "./actionTypes";
import {DataType} from './actionTypes'

// imports for the selection
import {SELECT_COUNTRY, SELECT_CAMP, SELECT_SCHOOL} from "./actionTypes"

// imports for filtering schools
import { FILTER_SCHOOLS, RESET_SCHOOLS, REMOVE_SCHOOL } from "../actions/actionTypes";





// this part for fetching data
export const requestData = (): ActionTypes =>{
    return {
        type: FETCH_DATA_REQUEST,
        loading: true,
        data: [],
        error: '',
        camp: '',
        country: '',
        school: '',
        selectedSchool: ''
    }
}

export const receiveData = (data: DataType[]): ActionTypes =>{
    return {
        type: FETCH_DATA_SUCCESS,
        loading: false,
        data: data,
        error: '',
        camp: data[0].camp,
        country: data[0].country,
        school: data[0].school,
        selectedSchool: ''
    }
}

export const invalidData = (): ActionTypes =>{
    return {
        type: FETCH_DATA_FALIURE,
        loading: false,
        data: [],
        error: 'unable to fetch data',
        camp: '',
        country: '',
        school: '',
        selectedSchool: ''
    }
}


// this part to select from the 3 dropdown 


export const changeCountry = (country : string): ActionTypes=>{
    return {
        type: SELECT_COUNTRY,
        loading: false,
        data: [],
        error: '',
        camp: '',
        country:country,
        school: '',
        selectedSchool: ''
    }
}

export const changeCamp = (camp : string): ActionTypes=>{
    return {
        type: SELECT_CAMP,
        loading: false,
        data: [],
        error: '',
        camp: camp,
        country: '',
        school: '',
        selectedSchool: ''
    }
}


export const changeSchool = (school : string): ActionTypes=>{
    return {
        type: SELECT_SCHOOL,
        loading: false,
        data: [],
        error: '',
        camp: '',
        country: '',
        school: school,
        selectedSchool: ''
    }
}


//  async using thunk
export const apiRequest = ()=>{
    return (dispatch: Dispatch<ActionTypes>, getState: AppState)=>{
        dispatch(requestData())
        return fetch('http://localhost:4000/')
        .then(res => res.json())
        .then((data: DataType[]) =>{
            dispatch(receiveData(data))
        })
        .catch(error =>{
            dispatch(invalidData())
        })
        
    }
}

export const filterSchools = (school: string):ActionTypes =>{
    return {
        type: FILTER_SCHOOLS,
        loading: false,
        data: [],
        error: '',
        camp: '',
        country: '',
        school: school,
        selectedSchool: school
    }
}

export const removeSchool = (school: string):ActionTypes => {
    return {
        type: REMOVE_SCHOOL,
        loading: false,
        data: [],
        error: '',
        camp: '',
        country: '',
        school: school,
        selectedSchool: school
    }
}

export const resetSchools = ():ActionTypes =>{
    return {
        type: RESET_SCHOOLS,
        loading: false,
        data: [],
        error: '',
        camp: '',
        country: '',
        school: '',
        selectedSchool: ''
    }
}










