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

in separate action folder I started to create all types needed to fetch the response from the backend\ 
I started only created 4 types: 

- one to request data type
- one to receive the sucess response type
- one to receive the error response if any type
- one to have the async action to call the api type

all 4 types has the same type "DataAsync" { loading , data , error } the only difference is the typeof "type prop" of each creator.\
DataType : to define the type of the response received by the api.\
Each type has extra props to be edited later "will be described on a different section"


```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

***Decided to sotre the all the data in the same reducer as all depends on the same api response***


## Root Reducer & Data Reducer

Root reducer was designed to give the option later if we wanted to add extra reducers and combine them later\ 
Data reducer has all the cases for all the action creators introduced above 

```javascript
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
```

### Index file to hold the combined reducers 

```javascript
const RootReducer = combineReducers({
    data: dataReducer
})

export default RootReducer 
```

## Create Store

To be able to communicate the app state we need to create a store holding the intial state and the reducers with the thunk ***middelware to deal with the async actions***

```javascript
const logger = createLogger()

export type AppState = ReturnType<typeof reducers>
export const store = createStore<AppState, AppActions,{},{}>(
    reducers, 
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>,logger))
```

***used logger to console log state updated whenever a despatch is called***

## Connect the store

Connected the store to whole app to wrap all the components displayed and used within this app 

## Use Router Dom 

I started to install router dom to create the routes we will be using 

- '/' url to have the home page displayed 
- '/show/:str' dynamic url to route to whenever we click on point 

```sh
npm install @types/react-router-dom react-router-dom
```


## App Component

```javascript
const App: React.FC = ()=> {
  return (
    <React.StrictMode>
          <Provider store={store}>
             <Router>
              <Routes>
                  <Route path="/"  element={<Home/>} />
                  <Route path="/show/:str" element={<ShowMonth/>} />
              </Routes>
            </Router>
          </Provider>
    </React.StrictMode>


  );
}

export default App;
```

## Build all the app components 

## Home Component 

This Component rendered when I call url of '/' or [http://localhost:3001/](http://localhost:3001/)

### wrap the app with the connect function to connect it to the store 

We need to define the **mapStateToProps** to have an access to the main state\ 
mapStateToProps will distract the used part of the state ***in this case the returned data from the api request***\
we need to define the used dispatch functions used within this component ***in this case apirequest()***

```javascript
interface Props {}
interface LinkStateProps{
    data: DataType[]
}
interface LinkDispatchProps{
    apiRequest: ()=> void
}

type LinkProps = Props & LinkStateProps & LinkDispatchProps

const mapStateToProps = (state: AppState): LinkStateProps =>{
    return {
        data: state.data.data
    }
}

export default connect(mapStateToProps, {apiRequest})(Home)
```

### Render the component 

We have two conditions when the app renders 

- We still didn't get the data from the api **we will display the loading component**
- We have the data from the api **we will display the MainPage component**

#### UseEffect to start the api request

```javascript
  useEffect(()=>{

    if(data.length === 0){
      apiRequest()
    }
    return (()=>{})
  },[apiRequest])
```

#### Return function to display the TSX 

```javascript
  return (
        <>

        
        { data && <MainPage>
            <ThemeSwitch/>
          </MainPage>
        }
        
       {
         !data &&  <Loading/>
       }
        </>

  );
```

## Loading Component 

This comonent will be rendered only when we don't have data yet\
It has a simple layout\
***No need to connect it to the store***

```javascript
const Loading: React.FC = ()=> {
  return (
        <>
        loading...
        </>

  );
}

export default Loading;
```

## MainPage Component 

this app will display mainly the rest of the components

- Will display 3 Dropdown lists ***with the selected country school camp from the store*** 
- Will display Header component ***static component only to display the header layout***
- Will display the Chart ***that holds the lines from the selected school***
- Will display a slider ***a list of checkboxes of the filltered schools to select from***

I will show each function and line in details 

### Used data from the store 

We will use school, country and camp to add it's value to the Dropdown\
We will use the data to get a list of unique schools, countries and campsa to send it as a prop to the dropdown as well


```javascript
interface LinkStateProps{
    data: DataType[]
    country : string
    camp: string
    school: string
}
```

### Get the unique values for each dropdown 

I used filter and map to distract the values from the data stored in the store state

```javascript
    const countries: string[] = data.map((elm: DataType) =>{
        return elm.country
    })

    const uniqueCountrie: string[] = countries.filter(function (x, i, a) { 
        return a.indexOf(x) === i; 
    });

    const camps : string[] = data.map((elm: DataType) =>{
        return elm.camp
    })

    const uniqueCamp: string[] = camps.filter(function (x, i, a) { 
        return a.indexOf(x) === i; 
    });

    const schools : string[] = data.map((elm: DataType) =>{
        return elm.school
    })

    const uniqueSchools: string[] =["Show all" , ...schools.filter(function (x, i, a) { 
        return a.indexOf(x) === i; 
    })]
```

### Used actions 

I selected actions to be used on event ***click*** whenver I change the selected value from the dropdown to update the store on the spot

- ***changeCountry()*** for new country selected
- ***changeCamp()*** for new camp selected 
- ***changeSchool()*** for new school selected 
- ***resetSchools()*** to reset the list of schools selected on the slider to show it's data 

```javascript
interface LinkDispatchProps{
    changeCountry: (country: string)=>void
    changeCamp: (camp:string)=>void
    changeSchool: (school:string)=>void
    resetSchools: ()=> void
}
```

### OcClickHandler 

This handeler passed as a prop to the Dropdown component to act apon the even to dispatch the proper action\
Whenever I change the selected value from any of the dropdowns we will need to remove all the selected schools to be displayed on the chart as we have different data now 

```javascript
    const onSelectionChange = (e: string, data:string)=>{
        if(data === "Select Country"){
            changeCountry(e)
            resetSchools()
        }else if (data === "Select Camp"){
            changeCamp(e)
            resetSchools()
        }else if (data === "Select School"){
            resetSchools()
            changeSchool(e)

        }
    }
```

### Sending the props to the Dropdown 

We will send data to each component based on it's purpose 

- one for country 
- one for camp
- one for school

```javascript
            <DropDown 
            options={uniqueCountrie} 
            selected={country}
            label="Select Country"
            onSelectionChange = {onSelectionChange}
            />
            <DropDown 
            options={uniqueCamp} 
            selected={ camp}
            label="Select Camp"
            onSelectionChange = {onSelectionChange}
            />
            <DropDown 
            options={uniqueSchools} 
            selected={school}
            label="Select School"
            onSelectionChange = {onSelectionChange}
            />
```

### Return function 

This function will return the tsx to add the components need to be displayed on the main page\
Some need to have props and some only to be rendered 

```javascript
return(
    <div className='pageSize'>
    <div className='container'>
        <Header/>
        {children}
       
    </div>

        <div className="selection">

            <DropDown 
            options={uniqueCountrie} 
            selected={country}
            label="Select Country"
            onSelectionChange = {onSelectionChange}
            />
            <DropDown 
            options={uniqueCamp} 
            selected={ camp}
            label="Select Camp"
            onSelectionChange = {onSelectionChange}
            />
            <DropDown 
            options={uniqueSchools} 
            selected={school}
            label="Select School"
            onSelectionChange = {onSelectionChange}
            />

        </div>

        <div className='graph'>
            <Chart/>
            <Slide/>
        </div>


    </div>
)
```




















