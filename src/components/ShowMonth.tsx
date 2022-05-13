import { Link } from 'react-router-dom';
import {  DataType} from "../actions/actionTypes";
import { AppState } from "../store/rootStore";
import { connect } from 'react-redux'
import {useParams} from 'react-router-dom'

interface Props {}
interface LinkStateProps{
    data: DataType[]
    country : string
    camp: string
    school: string
    filteredSchools: string[]
}
interface LinkDispatchProps{
}

type LinkProps = Props & LinkStateProps & LinkDispatchProps


const ShowMonth = ({data, country, camp, school, filteredSchools}: LinkProps)=>{

    const {str: month} = useParams()

    const displayedData = filteredSchools.map((school)=>{
        return data.filter((elm)=>{
            return elm.country === country && elm.camp === camp && elm.school === school && elm.month === month
        })
    })
    return (
        <div>

            <div>Data for the select point </div>

            <div>
               {displayedData.map((data)=>{
                   return data.map((elm)=>{
                    return <div className='data-container' key={elm.id}>
                        <div>
                           ID: {elm.id}
                            </div>
                        <div>
                            Country: {elm.country}
                            </div>
                        <div>
                            Camp: {elm.camp}
                            </div>
                        <div>
                            School: {elm.school}
                            </div>
                        <div>
                            Month: {elm.month}
                        </div>
                        <div>
                            Lessons: {elm.lessons }
                            </div>

                        
                        </div>
                })
               })}
            </div>
            <Link to={'/'} >Back to Home Page </Link>
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


export default connect(mapStateToProps) (ShowMonth)