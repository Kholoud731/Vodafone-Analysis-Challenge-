# Documentation of steps made to finalize this app

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

Will warp the whole application and will define the routers used and which component will be rendered based on the url\
Will connect the store to the whole App

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

***Build all the app components***

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

## Header Component 

This component has been sepetered in case we wanted to refactor and add more static or dynamic content\
It contains a simple TSX\
No need to be connected with the store

### Return function 

```javascript
    return (
        <div  className ="header">
        <div data-testid="head" className ="main">Analysis Chart </div>
        <div data-testid="head" className ="second">Number of lessons</div>
    </div>
    )
```

## DropDown Component 

This app doesn’t needs to be connected to the store\
We need to add type to the props received from the parent

- We will pass label for each component 
- We will pass an event ***click*** from parent ***parent will decide which dispatch method will be used***
- We will pass the unique values to loop on it as add it as an option to each element 
- We will pass the selected value once we pass it from parent ***parent will git the value from the store***
- Each component will communicate the new selected value with the parent 

### Props recived from parent 

```javascript
type DropDownProps = {
    options: string[]
    selected: string
    label: string
    onSelectionChange: (e: string, lable: string)=>void
}
```

### OnClickHandeler 

This method will sent the new selected value to the parent based on the targeted element we clicked on 

```javascript
    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        onSelectionChange(e.target.value, label)
    }
```

### Return function 

```javascript
    return (
        <div>
             
                <label>{label}</label>
                <select  value={selected} onChange={(e)=>onChangeHandler(e)}>
                        {options.map((elm: string)=>{
                            return <option data-testid="option" key={elm} value={elm}>{elm}</option>
                        })}
                </select>
     

        </div>
    )
```

## Slider Component 

This component will connect to the store to add the selected list of schools to display it's values\
Will send to the store the color of each School to be easily accessible and visible\
We will need to have and access to dispatch functions to add or remove a school from the list with it's color based on the click event

### Store value needed 

We will need to have an access to the selected country , school and camp to filter the list of the data to be displayed\
We need to have an access to each school from the list and each color to connect the color with the school based on it's index\


```javascript
interface LinkStateProps{
    data: DataType[]
    country : string
    camp: string
    school: string
    filteredSchools: string[]
    color: string[]
}
```

### Dispatch actions 

```javascript
interface LinkDispatchProps{
    filterSchools : (data: string, color:string)=> void
    removeSchool: (data: string, color:string) => void
}
```

### Filtered list function

We will need to have an array of the unique schooles regardless the month to loop over it and display it on the screen

```javascript
    const filteredData = data.filter((elm)=> {
        if(school === "Show all"){
            return elm.country === country && elm.camp === camp 
        }else {
            return elm.country === country && elm.camp === camp && elm.school === school
        }
    })

    const schools: string[] = filteredData.map((elm: DataType) =>{
        return elm.school
    })

    const uniqueSchools: string[] = schools.filter(function (x, i, a) { 
        return a.indexOf(x) === i; 
    });

    const dataforEchSchool = uniqueSchools.map(school => {
        return filteredData.filter((elm)=> elm.school === school)
    })
```

### Sum of lessons function 

We need to have a function to get the sum of the lessons based on the array sent\
We will use it twice 

- one time to get number of leassons to each school
- one time to get number of lessons to each camp selected 

```javascript
    const findNumberOfLessons = (data: DataType[]): number=>{
        const sum = data.reduce(function (accumulator, curValue) {
            return accumulator + curValue.lessons
        }, 0)

        return sum
    }
```

### OnClick handler 

This handeler will decide the color to be sent to the list of colors with the school added or removed from the list 

```javascript
    const onChangeHandler = (e:  React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.classList[0] === 'active'){
            const color = e.target.getAttribute('color')
            removeSchool(e.target.value, color? color : '')
            e.target.removeAttribute('color')
            e.target.checked = false
            e.target.style.backgroundColor= 'white'
            removeOne()
        }else{

            if(filteredSchools[0] === ''){
                console.log(colorArray[filteredSchools.length])
                filterSchools(e.target.value, colorArray[0])
                e.target.setAttribute('color',colorArray[0])
                e.target.style.backgroundColor=colorArray[0]
            }else{
                console.log(colorArray[filteredSchools.length])
                filterSchools(e.target.value, colorArray[filteredSchools.length])
                e.target.setAttribute('color',colorArray[filteredSchools.length])
                e.target.style.backgroundColor=colorArray[filteredSchools.length]
            }

        }
        e.target.classList.toggle('active')
        
    }
```

### Return Function 

We will loop over the unique schools with the total number of lessons\
We will check if this school on the selected school list and add the color with a conditional style rendering 

```javascript
return (
        <div className="slide">
            <div className='total heading'>
                <span>{findNumberOfLessons(filteredData)}</span> lessons<div>in {camp}</div>

            </div>

            <div className='sections'>
                {dataforEchSchool.map((elm, index) =>{
                    if(filteredSchools.indexOf(elm[0].school) > -1 ){
                        addOn()
                        return <div className='total input' key={elm[0].id}>
                        <div className='input'>
                        <input 
                        className=''
                        type="checkbox" 
                        value={elm[0].school} 
                        name="school"
                        style={{
                           backgroundColor: color[ count -1],

                        }}
                        checked={filteredSchools.indexOf(elm[0].school) > -1 }
                        onChange={(e)=>onChangeHandler(e)}
                        />
                        </div>
                        <div style={{
                           color: color[ count -1]
                        }}>
                        <span >{findNumberOfLessons(elm)}</span> lessons<div>in {elm[0].school}</div>
                        </div>
                        </div>
                    } else{
                        return <div className='total input' key={elm[0].id}>
                        <div className='input'>
                        <input 
                        className=''
                        type="checkbox" 
                        value={elm[0].school} 
                        name="school"
                        style={{
                           backgroundColor: 'white',

                        }}
                        checked={filteredSchools.indexOf(elm[0].school) > -1 }
                        onChange={(e)=>onChangeHandler(e)}
                        />
                        </div>
                        <div style={{
                           color: 'gray'
                        }}>
                        <span >{findNumberOfLessons(elm)}</span> lessons<div>in {elm[0].school}</div>
                        </div>
                        </div>
                    }

                })}
            </div>

        
        </div>
    )
 ```
    
## Chart Component 

This component will communicate with the store to get the school list with the list of color to add it or remove it from the canvas.
I used Rechart as it was easier to edit the styling and passing the data to it.

### Install package 

```sh
npm i recharts
```

### State values to be used

we need to access the state for those needs 

- list of schools to know which will be rendered 
- list of colors to know the color will be added to it to match the slider color 
- country , school and camp will be used to loop over the data to get the values for each school with it's lessons per month

```javascript
interface LinkStateProps{
    fetchedData: DataType[]
    country : string
    camp: string
    school: string
    filteredSchools: string[]
    color: string[]
}
```

### Data to be passed to the chart 

country , school and camp will be used to loop over the data to get the values for each school with it's lessons per month

```javascript
  const ghraphs = filteredSchools.map((school)=> {
    return fetchedData.filter((elm: DataType)=> {
      return elm.country === country && elm.camp === camp && elm.school === school
        })
  })


  const findMonthsLessons = (arr: DataType[]) : number[]=>{

    const setofData: number[] = [0,0,0,0,0,0,0,0,0,0,0,0]

    for(let i =0; i< labels.length; i++){
        for(let j = 0; j < arr.length; j++){
          if(labels[i] === arr[j].month){
            if(setofData[i]){
              setofData[i] += arr[j].lessons
            }else{
              setofData[i] = arr[j].lessons
            }
            
          }else {
            continue
        }}
    
        }
        return setofData
      }
    

  const lessonsPerMonth = ghraphs.map((g)=>{
        return findMonthsLessons(g)
      })

  const data: {}[] = [
  ];

  filteredSchools.forEach((school, index)=>{
    labels.forEach((month , i)=> {
      data[i] = {...data[i], "month": month, [school]: lessonsPerMonth[index][i]}
    })
  
  })
```

***Now we have the data which will be passed to the chart for a line display***

### Return function

This will display the chart with the exact data\
We will add Link from the Router component to redirect us to the clicked point to display the related data 

```javascript
  return (

    <>    
    <LineChart
      width={750}
      height={500}
      data={data}
      margin={{
        top: 40,
        right: 0,
        left: 60,
        bottom: 5
      }}
      onClick={demoOnClick}
    >
      <CartesianGrid vertical={false}  fill='white'  />
      <XAxis dataKey="month" stroke= 'gray'/>
      <YAxis type='number' width={1} 
        label={{
          value: 'No of lessons',
          position: {x: 90, y: -30},
          className: 'chart__label',
          stroke: '#eee'
        }}
        stroke= 'gray'
        axisLine={{ stroke: '#EAF0F4' }}
      tickSize={0} >
        
      </YAxis>
      <Tooltip viewBox={{ x: 0, y: 0, width: 200, height: 200 }}  />
      {filteredSchools.map((school, index)=>{return <Line type="linear"  key={school} dataKey={school} stroke={color[index]} strokeWidth={2} dot={{ r: 5 }}  activeDot={{ r: 5 }} />})} 

      
    </LineChart>

      <Link to={`show/${month}`} ref={linkRef}/>


    </>

  )
```

### Click Events 

We have 2 click events 

- one attached to the point and it will trigged **demoOnClick()** handeler 
- **demoOnClick** handeler will get the month out of the event object sent with the chart 
- UseEffect function will watch if the month value has been changed to click on the link component to redirect us to tge required route

```javascript
const demoOnClick = (e: any)=> {
    console.log(e.activeLabel)
    setMonth(e.activeLabel)


}

useEffect(() => {
  if(month){
    linkRef.current?.click()
  }
}, [month])
```

## ShowMonth Component 

This component displaied with whenever we change the url\
It will check what is the parameter sent to the url and use it to search with the help of the data stored it the store

### State used 

We will loop over all the array of response data\
With the help of the selected country , schools , camp and the filtered schools list we will get the data to be displayed 

```javascript
interface LinkStateProps{
    data: DataType[]
    country : string
    camp: string
    school: string
    filteredSchools: string[]
}
```

### Displayed data function 

With the help of the selected country , schools , camp and the filtered schools list we will get the data to be displayed

```javascript
    const displayedData = filteredSchools.map((school)=>{
        return data.filter((elm)=>{
            return elm.country === country && elm.camp === camp && elm.school === school && elm.month === month
        })
    })
```

## Return Function 

Now we will loop over the data to diplay it on the screen 

```javascript
    return (
        <div className='pageSize'>
            <div  className ="header">
                <div data-testid="head" className ="main">Data for the selected points</div>
                <Link className='home-button' to={'/'} >Back to Home Page </Link>
            </div>

            <div>
               {displayedData && displayedData.map((data)=>{
                   return data.map((elm)=>{
                    return <div className='data-container' key={elm.id}>
                        <div className='border'>
                        <div className='row'>
                        <div className='title'>
                            ID
                                </div>
                            <div>
                            {elm.id}
                                </div>
                            </div>
                        
                        <div className='row'>
                        <div className='title'>
                            Country
                                </div>
                            <div>
                            {elm.country}
                                </div>
                            </div>

                        <div className='row'>
                            <div className='title'>
                            Camp
                                </div>
                            <div>
                            {elm.camp}
                                </div>
                            </div>

                        <div className='row'>
                            <div className='title'>
                            School
                                </div>
                            <div>
                            {elm.school}
                                </div>
                            </div>
                        <div className='row'>
                            <div className='title'>
                            Month
                                </div>
                            <div>
                            {elm.month}
                                </div>
                            </div>

                        <div className='row'>
                            <div className='title'>
                            Lessons
                                </div>
                            <div>
                            {elm.lessons }
                                </div>
                            </div>

                        </div>
                        </div>
                })
               })}
            </div>
           
        </div>
    )
 ```
 
 ## SwitchTheme Component 
 
 This component will check and set the theme color to the localStorage to know what it the proper background to add 
 
 ### UseEffect and click event 
 
 We will use use effect to access the localstorage to check if we have the data and we will store the value on a state\
 by listening to the theme on the component state we will decide the actions taken on the checkbox to be clicked or not and to change the color of the whole app or not 
 
 ```javascript
     useEffect(()=>{
        
        if(window.localStorage.getItem('theme') && switchRef.current?.className !== 'active'){
            setTheme('Dark')
            document.body.style.background = "#2d2c2c"
            document.body.style.color = "white"
            switchRef.current?.classList.add("active")
            switchRef.current?.click()
        }


    },[theme])
 ```
 
 ### OnClickEnevt 
 
 ```javascript
     const changetheme = (e: React.MouseEvent<HTMLInputElement, MouseEvent>)=>{
        if(theme && switchRef.current?.className === 'active'){
            window.localStorage.removeItem('theme')
            switchRef.current?.classList.remove("active")
            setTheme('')
            document.body.style.background = "#eee"
            document.body.style.color = "#2d2c2c"
        }else if(theme && switchRef.current?.className !== 'active'){
            window.localStorage.setItem('theme', 'Dark')
            switchRef.current?.classList.add("active")

        }else{
            window.localStorage.setItem('theme', 'Dark')
            setTheme('Dark')
        }
    } 
 ```
 
 ### Return function 
 
 ```javascript
     return (
        <div className='theme'>
        <span className='dark'> Dark Mode </span> 
     <label htmlFor='switch' className="switch">
     <input id="switch" type="checkbox" onClick={(e)=>changetheme(e)} ref={switchRef}/>
     <span className="slider round"></span>
     </label>
     </div>
    )
 ```









