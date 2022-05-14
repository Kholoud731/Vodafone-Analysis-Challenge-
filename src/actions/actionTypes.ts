export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST"
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS"
export const FETCH_DATA_FALIURE = "FETCH_DATA_FALIURE"
export const SELECT_COUNTRY = "SELECT_COUNTRY"
export const SELECT_CAMP = "SELECT_CAMP"
export const SELECT_SCHOOL = "SELECT_SCHOOL"
export const FILTER_SCHOOLS = "FILTER_SCHOOLS"
export const REMOVE_SCHOOL = 'REMOVE_SCHOOL'
export const RESET_SCHOOLS = "RESET_SCHOOLS"

export type DataType = {
    id: string
	month: string
	camp: string
	country: string
	school: string
	lessons: number
}

interface DataAsync {
    loading: boolean
    data: DataType[]
    error: string
    camp: string
	country: string
	school: string
    selectedSchool: string
    lineColor: string

}

interface FetchDataRequest extends DataAsync{
    type: typeof FETCH_DATA_REQUEST
}
interface FetchDataSuccess extends DataAsync{
    type: typeof FETCH_DATA_SUCCESS
}

interface FetchDataFaliure extends DataAsync{
    type: typeof FETCH_DATA_FALIURE
}



interface SelectCountry extends DataAsync{
    type: typeof SELECT_COUNTRY
}
interface SelectCamp extends DataAsync{
    type: typeof SELECT_CAMP
}

interface SelectSchool extends DataAsync{
    type: typeof SELECT_SCHOOL
}


interface FilteredSchool extends DataAsync{
    type: typeof FILTER_SCHOOLS
}
interface RemoveSchool extends DataAsync{
    type: typeof REMOVE_SCHOOL
}

interface ResetSchool extends DataAsync{
    type: typeof RESET_SCHOOLS
}


export type ActionTypes = FetchDataRequest | 
FetchDataSuccess | FetchDataFaliure | SelectCountry | 
SelectCamp | SelectSchool | FilteredSchool | ResetSchool | RemoveSchool


// app actions to combine all types for the whole app 
export type AppActions = ActionTypes 