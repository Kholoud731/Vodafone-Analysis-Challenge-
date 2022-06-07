import { connect } from 'react-redux'
import { AppState } from "../store/rootStore";
import {  DataType} from "../actions/actionTypes";
import { filterSchools, removeSchool } from '../actions/index';


const colorArray = ['#FF6633', '#00B3E6', 
'#E6B333', '#3366E6', '#B34D4D',
'#80B300', '#E6B3B3', '#6680B3', 
'#FF99E6', '#CCFF1A', '#E6331A', 
'#66994D', '#B366CC', '#4D8000', '#CC80CC', 
'#66664D', '#991AFF', '#E666FF', '#4DB3FF',
'#E666B3', '#33991A', '#B3B31A', '#00E680', 
'#4D8066', '#809980', '#E6FF80', '#1AFF33',  
'#CCCC00', '#66E64D', '#4D80CC',
 '#4DB380','#99E6E6', '#6666FF'];

interface Props {}
interface LinkStateProps{
    data: DataType[]
    country : string
    camp: string
    school: string
    filteredSchools: string[]
    color: string[]
}
interface LinkDispatchProps{
    filterSchools : (data: string, color:string)=> void
    removeSchool: (data: string, color:string) => void
}

type LinkProps = Props & LinkStateProps & LinkDispatchProps

const Slide = ({data, country, camp, school, color, filteredSchools,filterSchools , removeSchool}:LinkProps)=>{

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

    const uniqueSchools: string[] = Array.from(new Set(schools))

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
    let count = 0
    const addOn = ()=>{
        count++
        return count
    }
    const removeOne = ()=>{
        count--
        return count
    }

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
}

const mapStateToProps = (state: AppState): LinkStateProps =>{
    return {
        data: state.data.data,
        country: state.data.country,
        camp: state.data.camp,
        school: state.data.school,
        filteredSchools: state.data.selectedSchool,
        color: state.data.lineColor
}}
export default connect(mapStateToProps,{ filterSchools, removeSchool })(Slide)