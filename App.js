import React, { Component } from 'react'
import {
  View,Text,Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  PermissionsAndroid,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import NetInfo from "@react-native-community/netinfo";
import Geolocation from '@react-native-community/geolocation';
import { getCurrentweather,getweatherForcast } from './App/redux/actionCreators/weatherCreators';
import AsyncStorage from '@react-native-community/async-storage';

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

 class App extends Component {

  async componentDidMount(){
    try {
       PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {title:'Need Permission',
      messag:'Please allow location permission to see weather near you.'}
      )
      if ('granted' === PermissionsAndroid.RESULTS.GRANTED) {
        this.getCurrentWeather()
      }else{
        alert("Permission Denied");
      }
    } catch (error) {
      console.log(error)
    }

    NetInfo.fetch().then(state => {
      if(state.isConnected) {
       this.getCurrentWeather()
      }else{
     this.emptyComponent()
      }
    })
  }

  async componentWillUnmount(){
    await AsyncStorage.clear()
  }

  async getCurrentWeather(){
    Geolocation.getCurrentPosition(
      (position) => {
      console.log('position= ',position);

       this.props.getCurrentweather(position.coords.latitude,position.coords.longitude)
       this.props.getweatherForcast(position.coords.latitude,position.coords.longitude)
        },
      (error) => console.log('error= ',error),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  }

  emptyComponent(){
    return(
      <View style={styles.container}>
      <Text style={styles.currentText}>Something Went Wrong at our End</Text>
<TouchableOpacity style={styles.button} onPress={()=>this.getCurrentWeather()}>
<Text>RETRY</Text>
</TouchableOpacity>
      </View>
    )
  }

  getDayOfWeek(i){
    let date = new Date();
    date = date.addDays(i);
    const dayOfWeek = date.getDay();    
    return isNaN(dayOfWeek) ? null : 
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}

  render() {
    if(this.props.loading){
      return(
      <View style={styles.container}>
      <Image style={{height:200,width:200}} resizeMode='contain' source={require('./App/assets/loader.gif')}/>
      </View>
      )
    }
    else{
    return (
      <View style={[styles.container,{justifyContent:'space-between'}]}>
        <StatusBar barStyle="dark-content" />
      <SafeAreaView>
       
         <View style={styles.container}>
          <Text style={styles.currentText}>{this.props.currentWeatherData?.main?.temp}</Text>
          <Text style={styles.boldText}>{this.props.currentWeatherData?.name}</Text>
          </View>
       <FlatList
       style={{flex:1}}
       data={this.props.weatherData.filter((value, index, arr) => index > 0 && index < 6)}
       ListEmptyComponent={this.emptyComponent()}
       keyExtractor={(item) => String(item.dt)}
       renderItem={({item,index}) =>
       <View style={styles.row}>
          <Text style={[styles.boldText,{width:'70%'}]}>{this.getDayOfWeek(index+1)}</Text>
          <Text style={[styles.boldText,{width:'20%'}]}>{item.temp.day}</Text>
          </View>
       }
       />
      </SafeAreaView>
      </View>
    )
    }
}
      }


const styles = StyleSheet.create({
  container: {
    flex:1.4,backgroundColor:'#FFF',
    justifyContent:'center',alignItems:'center'
  },
  currentText:{
    fontSize:60,
    fontWeight:'bold'
  },
  boldText:{
    fontWeight:'bold',
    fontSize:22,
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-around',
    borderTopWidth:1,
    padding:12,
    width:'100%'
  },
  button:{
    borderWidth:1,
    padding:10,
    marginTop:'20%'
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
