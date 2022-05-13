import * as ReactDOM from 'react-dom';
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import '@testing-library/jest-dom'
import Home from '../components/Home';
import { store } from '../store/rootStore';
import { Provider } from 'react-redux';
import DropDown from '../components/DropDown';
import {DataType} from "../actions/actionTypes"
import {changeCountry, resetSchools, changeCamp, changeSchool } from '../actions'



test('landing on Home page', () => {
    const countries: string[] = store.getState().data.data.map((elm: DataType) =>{
        return elm.country
    })
    const uniqueCountrie: string[] = countries.filter(function (x, i, a) { 
        return a.indexOf(x) === i; 
    });

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

  const history = createMemoryHistory()
  history.push('/')
  let container = document.createElement("div");
  document.body.appendChild(container);
  ReactDOM.render(
    <Provider store={store}>
    <DropDown 
                options={uniqueCountrie} 
                selected={store.getState().data.country}
                label="Select Country"
                onSelectionChange = {onSelectionChange}
    />
    </Provider>
,container)

expect(container).toHaveTextContent("Select Country")
})
