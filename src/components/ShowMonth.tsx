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