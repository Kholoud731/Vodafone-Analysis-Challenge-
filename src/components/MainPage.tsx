import { connect } from 'react-redux'
import { AppState } from "../store/rootStore";
import {  DataType} from "../actions/actionTypes";
import { changeCountry, changeCamp, changeSchool, resetSchools } from "../actions"; 
import DropDown from "./DropDown";
import './main.css'
import Slide from './Slide';
import Chart from './Chart';
import ThemeSwitch from './ThemeSwitch';
import Header from './Header';

interface Props {}
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



const MainPage = ({data,country,camp, school, changeSchool, changeCamp, changeCountry, resetSchools}: LinkProps)=>{





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
        <ThemeSwitch/>
       
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