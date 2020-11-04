import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import NetInfo from "@react-native-community/netinfo";
import Geolocation from '@react-native-community/geolocation';



export default class App extends Component {

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
        },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  }

  render() {
    return (
      <View>
        <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          
        </ScrollView>
      </SafeAreaView>
      </View>
    )
}
      }


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

