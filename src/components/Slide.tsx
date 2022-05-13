import { connect } from 'react-redux'
import { AppState } from "../store/rootStore";
import {  DataType} from "../actions/actionTypes";
import { filterSchools, removeSchool } from '../actions/index';



interface Props {}
interface LinkStateProps{
    data: DataType[]
    country : string
    camp: string
    school: string
    filteredSchools: string[]
}
interface LinkDispatchProps{
    filterSchools : (data: string)=> void
    removeSchool: (data: string) => void
}

type LinkProps = Props & LinkStateProps & LinkDispatchProps

const Slide = ({data, country, camp, school, filteredSchools,filterSchools , removeSchool}:LinkProps)=>{

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



    const findNumberOfLessons = (data: DataType[]): number=>{
        const sum = data.reduce(function (accumulator, curValue) {
            return accumulator + curValue.lessons
        }, 0)

        return sum
    }

    const onChangeHandler = (e:  React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.classList[0] === 'active'){
            removeSchool(e.target.value)
            e.target.checked = false
        }else{
            filterSchools(e.target.value)
        }
        e.target.classList.toggle('active')
        
    }

    return (
        <div className="slide">
            <div className='total heading'>
                <span>{findNumberOfLessons(filteredData)}</span> lessons<div>in {camp}</div>

            </div>

            <div className='sections'>
                {dataforEchSchool.map(elm =>{
                    return <div className='total input' key={elm[0].id}>
                         <div className='input'>
                         <input 
                         className=''
                         type="checkbox" 
                         value={elm[0].school} 
                         name="school"
                         checked={filteredSchools.indexOf(elm[0].school) > -1 }
                         onChange={(e)=>onChangeHandler(e)}
                         />
                         </div>
                         <div>
                         <span >{findNumberOfLessons(elm)}</span> lessons<div>in {elm[0].school}</div>
                         </div>
                         </div>
                })}
            </div>

        
        </div>
    )
}

const mapStateToProps = (state: AppState): LinkStateProps =>{
    return {
        data: state.data.data,
        country: state.data.country,
        camp: state.data.camp,
        school: state.data.school,
        filteredSchools: state.data.selectedSchool
}}
export default connect(mapStateToProps,{ filterSchools, removeSchool })(Slide)