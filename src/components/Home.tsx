import React from "react";
import { useEffect } from "react";
import { connect } from 'react-redux'
import { AppState } from "../store/rootStore";
import {  DataType} from "../actions/actionTypes";
import { apiRequest } from "../actions"; 

import MainPage from "./MainPage";
import Loading from './Loading';

interface Props {}
interface LinkStateProps{
    data: DataType[]
}
interface LinkDispatchProps{
    apiRequest: ()=> void
}

type LinkProps = Props & LinkStateProps & LinkDispatchProps



const Home = ({data, apiRequest}: LinkProps)=> {


  useEffect(()=>{
    if(data.length === 0){
      apiRequest()
    }
    return (()=>{})
    
  },[apiRequest])

  return (
        <>

        
        {
          data && <MainPage/>
        }
        
       {
         !data &&  <Loading/>
       }
        </>

  );
}

const mapStateToProps = (state: AppState): LinkStateProps =>{
    return {
        data: state.data.data
    }
}

export default connect(mapStateToProps, {apiRequest})(Home)
