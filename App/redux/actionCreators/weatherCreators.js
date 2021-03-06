import { getweatherForcastBegin, getweatherForcastFailure, getweatherForcastSuccess,getCurrentWeatherBegin,getCurrentWeatherSuccess,getCurrentWeatherFailure } from "../actions/weatherActions";
import { create } from 'apisauce'
import { API } from "../../api/api";

const api = create({
    baseURL: API.BASE_URL,
    headers: { Accept: 'application/json' },
  })

  export function getCurrentweather(lat,long){
    return async dispatch => {
      dispatch(getCurrentWeatherBegin());
      try {
        api
       .get(API.WEATHER_CURRENT+lat+'&lon='+long+'&appid='+API.KEY+'&units=metric')
       .then(response => {
        if (response.data.cod === 200) {
        dispatch(getCurrentWeatherSuccess(response.data))
      }else{
          console.log('response= ',response);
      }
       }
    )
      } catch (error) {
        dispatch(getCurrentWeatherFailure(error));
           }
    };
    
  }

export function getweatherForcast(lat,long){
    return async dispatch => {
      dispatch(getweatherForcastBegin());
      try {
        api
       .get(API.WEATHER_FORECAST+lat+'&lon='+long+'&exclude=hourly,minutely,current,alerts&appid='+API.KEY+'&units=metric')
       .then(response => {
        dispatch(getweatherForcastSuccess(response.data.daily))
       }
    )
      } catch (error) {
        dispatch(getweatherForcastFailure(error));
           }
    };
    
  }