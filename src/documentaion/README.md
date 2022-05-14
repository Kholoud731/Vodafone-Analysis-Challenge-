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

all 4 types has the same type the only difference is the typeof "type prop" of each creator.

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





























