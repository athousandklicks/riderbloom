/* eslint-disable prettier/prettier */
import {
    TRIP_DETAILS
  } from '../types';
  
  import axios from 'axios';
  
  const URL = 'https://jsonplaceholder.typicode.com';
  
  
  const BLOOM_URL = 'http://104.248.254.71/app/public/api';
  
  export function isLoading(bool:Boolean){
    return{
      type:'LOGIN_ATTEMPT',
      isLoading:bool
    }
  }
    
    export function registerSuccess(userData:Object){
      return {
        type: LOGIN_SUCCESS,
        userData,
      }
    }
    
    export function registerFailed(error:Object){
      return {
        type: LOGIN_FAILED,
        error,
      }
    }
  
  
  //   export function register(data = {}){
  
  //     var url = 'http://104.248.254.71/app/public/api/register';
      
  //     return dispatch => {
  //       dispatch(isLoading());
  //       fetch(url, {
  //         method: 'POST', // or 'PUT'
  //         body: JSON.stringify(data), // data can be `string` or {object}!
  //         headers:{
  //           'Content-Type': 'application/json',
  //         }
  //         }).then(res => res.json())
  //         .then(response => {
  //           console.log(response.message);
  //             if (response.status === true){
  //                 dispatch(registerSuccess(response))
  //             } else {
  //                 console.log(response.status);
  //                 console.log(response.errors);
  //             }
  //         })
  //         .catch(error => console.error('Error', error));
  //       }
  //     }
    
  
  
  
    
    
    export function register(data:Object){
      console.log('REGISTER' + data);
      return dispatch => {
        dispatch(isLoading());
        return fetch(`${BLOOM_URL}/register`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(data)
        })
        .then((response) => {
          if (response.status === true){
            dispatch(isLoading(false))
            response.json().then((responseJSON) => {
              console.log("responseJSON", responseJSON);
              dispatch(registerSuccess(responseJSON))
            })
          }
          else {
            response.json().then((responseJSON) => {
              console.log("responseJSON",responseJSON);
              dispatch(isLoading(false))
              dispatch(registerFailed(responseJSON.message))
            })
          }
        })
        .catch((error) => {
          console.log("error",error);
          dispatch(isLoading(false))
          dispatch(registerFailed(error))
        })
      }
    }
    
  
  
  
  
    export function artistsListAll(){
      const request = axios.get(`${URL}/users`)
                      .then( response => response.data );
  
      return {
          type: GET_ARTISTS_ALL,
          payload: request
      }
  }
  
  export function artistDetail(id){
      const request = axios.get(`${URL}/users?id=${id}`)
                      .then(response => response.data )
      
      return {
          type: GET_ARTIST_DETAIL,
          payload: request
      }
  }
  
  export function clearArtistDetail(){
      return {
          type: CLEAR_ARTIST_DETAIL,
          payload:null
      }
  }


cancel-trip-request
param: trip_id



  /get-active-trip
  Param: User_id

  Response: 
  status
  TRIP_Details
  Vehicle
  Driver
  request_details