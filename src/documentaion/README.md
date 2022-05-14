# Documentation of steps made to finalise this app

### Create typeScript React App

```sh
npx create-react-app my-app --template typescript
cd my-app
npm start
```

### Download dependencies needed to start the App

```sh
npm install redux react-redux redux-thunk redux-logger
npm install -D @types/redux @types/react-redux @types/redux-thunk
npm install axios
```
### Creating a backend server to receive a json response 

Your could find the link for the backend server herer: [Backend link](https://github.com/Kholoud731/Vodafone-Backend)
npm start to run the server and to make sure it's working properly and send a json response [http://localhost:4000/](http://localhost:4000)

### Create all the actions types with the action return types in a separate file 

in separate action folder I started to create all types needed to fetch the response from the backend 
I started only created 4 types: 

- one to request data type
- one to receive the sucess response type
- one to receive the error response if any type
- one to have the async action to call the api type

all 4 types has the same type "DataAsync" { loading , data , error } the only difference is the typeof "type prop" of each creator.
DataType : to define the type of the response received by the api.
Each type has extra props to be edited later "will be described on a different section"


```
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
```


### Create action creators on a separate file

In the same folder there’s a file to host all the functions for each action creator

- one to request data
- one to receive the sucess response 
- one to receive the error response if any
- one to have the async action to call the api 

based on the api response from the middleware I started to dispatch related action creators 

```
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
        selectedSchool: '',
        lineColor: ''
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
        selectedSchool: '',
        lineColor: ''
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
        selectedSchool: '',
        lineColor: ''
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
```

### Extra action creators "Select From Dropdown"

I have added extra action creators to store the selected data from the Dropdown 

- one to change the country and it has a default value of the first element of the array of object responses 
- one to change the camp and it has a default value of the first element of the array of object responses 
- one to change the school and it's empty as we hav an extra option to show all the schools. 

All action creators share the same data type the difference as was explained in the type prop of each creator 

#### Types 

```
interface SelectCountry extends DataAsync{
    type: typeof SELECT_COUNTRY
}
interface SelectCamp extends DataAsync{
    type: typeof SELECT_CAMP
}

interface SelectSchool extends DataAsync{
    type: typeof SELECT_SCHOOL
}
```

#### Action creators 

```
export const changeCountry = (country : string): ActionTypes=>{
    return {
        type: SELECT_COUNTRY,
        loading: false,
        data: [],
        error: '',
        camp: '',
        country:country,
        school: '',
        selectedSchool: '',
        lineColor: ''
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
        selectedSchool: '',
        lineColor: ''
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
        selectedSchool: '',
        lineColor: ''
    }
}
```

### Extra action creators "Selected school to display it's data"

I have added extra action creators to store the selected school from the Slider 

- add selected school 
- remove the school from the selected array
- reset array to empty 

All action creators share the same data type the difference as was explained in the type prop of each creator 

#### Types 

```
interface FilteredSchool extends DataAsync{
    type: typeof FILTER_SCHOOLS
}
interface RemoveSchool extends DataAsync{
    type: typeof REMOVE_SCHOOL
}

interface ResetSchool extends DataAsync{
    type: typeof RESET_SCHOOLS
}
```

#### Action creatos  

```
export const filterSchools = (school: string, color: string):ActionTypes =>{
    return {
        type: FILTER_SCHOOLS,
        loading: false,
        data: [],
        error: '',
        camp: '',
        country: '',
        school: school,
        selectedSchool: school,
        lineColor: color
    }
}

export const removeSchool = (school: string, color: string):ActionTypes => {
    return {
        type: REMOVE_SCHOOL,
        loading: false,
        data: [],
        error: '',
        camp: '',
        country: '',
        school: school,
        selectedSchool: school,
        lineColor: color
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
        selectedSchool: '',
        lineColor: ''
    }
}
```

## Wrap the whole App action type to be added later to the store 

```javascript
export type ActionTypes = FetchDataRequest | 
FetchDataSuccess | FetchDataFaliure | SelectCountry | 
SelectCamp | SelectSchool | FilteredSchool | ResetSchool | RemoveSchool


// app actions to combine all types for the whole app 
export type AppActions = ActionTypes 
```

***Decided to sotre the all the data to the same reducer as all depends on the same api response***

























