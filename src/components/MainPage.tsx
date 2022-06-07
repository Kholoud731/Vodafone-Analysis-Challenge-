import { connect } from 'react-redux'
import React from 'react';
import { AppState } from "../store/rootStore";
import {  DataType} from "../actions/actionTypes";
import { changeCountry, changeCamp, changeSchool, resetSchools } from "../actions"; 
import DropDown from "./DropDown";
import './main.css'
import Slide from './Slide';
import Chart from './Chart';
import Header from './Header';

interface Props {
    children: React.ReactNode
}
interface LinkStateProps{
    data: DataType[]
    country : string
    camp: string
    school: string
}
interface LinkDispatchProps{
    changeCountry: (country: string)=>void
    changeCamp: (camp:string)=>void
    changeSchool: (school:string)=>void
    resetSchools: ()=> void
}

type LinkProps = Props & LinkStateProps & LinkDispatchProps



const MainPage = ({children,data,country,camp, school, changeSchool, changeCamp, changeCountry, resetSchools}: LinkProps)=>{





    const countries: string[] = data.map((elm: DataType) =>{
        return elm.country
    })

    const uniqueCountrie: string[] = Array.from(new Set(countries))

    const camps : string[] = data.map((elm: DataType) =>{
        return elm.camp
    })

    const uniqueCamp: string[] = Array.from(new Set(camps))

    const schools : string[] = data.map((elm: DataType) =>{
        return elm.school
    })

    const uniqueSchools: string[] =["Show all" , ...Array.from(new Set(schools))]

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
}

const mapStateToProps = (state: AppState): LinkStateProps =>{
    return {
        data: state.data.data,
        country: state.data.country,
        camp: state.data.camp,
        school: state.data.school
}}

export default connect(mapStateToProps,{changeCountry, changeCamp, changeSchool, resetSchools})(MainPage)