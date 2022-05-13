import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { connect } from 'react-redux'
import { AppState } from "../store/rootStore";
import {  DataType} from "../actions/actionTypes";
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';





const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];


interface Props {}
interface LinkStateProps{
    fetchedData: DataType[]
    country : string
    camp: string
    school: string
    filteredSchools: string[]
}
interface LinkDispatchProps{
}

type LinkProps = Props & LinkStateProps & LinkDispatchProps


const Chart = ({fetchedData, filteredSchools, country, camp, school}: LinkProps)=> {

  const [month, setMonth] = useState('')
  const linkRef  = useRef<HTMLAnchorElement>(null)

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

const demoOnClick = (e: any)=> {
    console.log(e.activeLabel)
    setMonth(e.activeLabel)


}

useEffect(() => {
  if(month){
    linkRef.current?.click()
  }
}, [month])


  return (

    <>
    <LineChart
      width={750}
      height={500}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
      onClick={demoOnClick}
    >
      <CartesianGrid strokeDasharray="3 3" fill='white'  />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip   />
      {filteredSchools.map((school)=>{return <Line type="linear"  key={school} dataKey={school} stroke="#82ca9d" />})} 

      
    </LineChart>

      <Link to={`show/${month}`} ref={linkRef}/>


    </>

  );

}

const mapStateToProps = (state: AppState): LinkStateProps =>{
  return {
      fetchedData: state.data.data,
      country: state.data.country,
      camp: state.data.camp,
      school: state.data.school,
      filteredSchools: state.data.selectedSchool
}}

export default connect(mapStateToProps,{}) (Chart)