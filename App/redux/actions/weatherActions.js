import WEATHER_TYPES from '../types/weatherTypes';


export const getCurrentWeatherBegin = () => ({
    type: WEATHER_TYPES.GET_CURRENT_WEATHER_BEGIN,
  });
  
  export const getCurrentWeatherSuccess = data => ({
    type: WEATHER_TYPES.GET_CURRENT_WEATHER_SUCCESS,
    payload: data,
  });
  
  export const getCurrentWeatherFailure = error => ({
    type: WEATHER_TYPES.GET_CURRENT_WEATHER_FAILURE,
    payload: {error},
  });

export const getweatherForcastBegin = () => ({
    type: WEATHER_TYPES.GET_WEATHER_FORECAST_BEGIN,
  });
  
  export const getweatherForcastSuccess = data => ({
    type: WEATHER_TYPES.GET_WEATHER_FORECAST_SUCCESS,
    payload: data,
  });
  
  export const getweatherForcastFailure = error => ({
    type: WEATHER_TYPES.GET_WEATHER_FORECAST_FAILURE,
    payload: {error},
  });