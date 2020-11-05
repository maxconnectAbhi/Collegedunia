import React, { Component } from 'react'
import {
  View,Text,Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';
import {connect} from 'react-redux';

import NetInfo from "@react-native-community/netinfo";
import Geolocation from '@react-native-community/geolocation';
import { getCurrentweather,getweatherForcast } from './App/redux/actionCreators/weatherCreators';



 class App extends Component {

  async componentDidMount(){
    try {
       PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {title:'Need Permission',
      messag:'Please allow location permission to see weather near you.'}
      )
    } catch (error) {
      console.log(error)
    }

    NetInfo.fetch().then(state => {
      if(state.isConnected) {
       this.getCurrentWeather()
      }else{
     
      }
    })
  }

  async getCurrentWeather(){
    Geolocation.getCurrentPosition(
      (position) => {
       this.props.getCurrentweather(position.coords.latitude,position.coords.longitude)
       this.props.getweatherForcast(position.coords.latitude,position.coords.longitude)
        },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  }

  render() {
    if(this.props.loading){
      return(
      <View style={styles.container}>
      <Image style={{height:'40%',width:'40%'}} resizeMode='contain' source={require('./App/assets/loader.gif')}/>
      </View>
      )
    }
    else{
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
         <View style={styles.container}>
          <Text style={styles.currentText}>{this.props.currentWeatherData?.main?.temp}</Text>
          <Text style={styles.boldText}>{this.props.currentWeatherData?.name}</Text>
          </View>
          <View style={{flex:1}}>
          <View style={styles.row}>
          <Text style={styles.boldText}>{this.props.weatherData?.name}</Text>
          <Text style={styles.boldText}>{this.props.weatherData?.name}</Text>
          </View>

          </View>
        </ScrollView>
      </SafeAreaView>
      </View>
    )
    }
}
      }


const styles = StyleSheet.create({
  container: {
    flex:1,backgroundColor:'#FFF',
    justifyContent:'center',alignItems:'center'
  },
  currentText:{
    fontSize:60,
    fontWeight:'bold'
  },
  boldText:{
    fontWeight:'bold',
    fontSize:22
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-around',
    borderBottomWidth:1,
    flex:1/5
  }
 
});


const mapStateToProps = state => ({
  loading:state.weather.loading,
  currentWeatherData: state.weather.currentWeatherData,
  weatherData: state.weather.weatherData,
});

const mapDispatchToProps = dispatch => ({
  getCurrentweather:(lat,long) => dispatch(getCurrentweather(lat,long)) ,
  getweatherForcast:(lat,long) => dispatch(getweatherForcast(lat,long)) 
});

export default  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App)
