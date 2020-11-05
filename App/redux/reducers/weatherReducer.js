import WEATHER_TYPES from '../types/weatherTypes';

const initialState = {
    loading: true,
    error: null,
    currentWeatherData:[],
    weatherData: [],
  };

  export default function weatherReducer(state = initialState, action) {
    switch (action.type) {
       
        case WEATHER_TYPES.GET_CURRENT_WEATHER_BEGIN:
        case WEATHER_TYPES.GET_WEATHER_FORECAST_BEGIN:
       return {
        ...state,
        loading: true,
        error: null,
      };

      case WEATHER_TYPES.GET_CURRENT_WEATHER_SUCCESS:
        return {
            ...state,
            loading: false,
            currentWeatherData: action.payload,
          };

      case WEATHER_TYPES.GET_WEATHER_FORECAST_SUCCESS:
        return {
         ...state,
         loading: false,
         weatherData: action.payload,
       };

       case WEATHER_TYPES.GET_CURRENT_WEATHER_FAILURE:
       case WEATHER_TYPES.GET_WEATHER_FORECAST_FAILURE:
        return {
         ...state,
         loading: false,
         error: action.payload,
       };
 
       default:
        return state;

    }
}