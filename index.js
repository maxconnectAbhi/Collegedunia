import React from 'react';
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import {name as appName} from './app.json';
import { persistor, store } from './App/redux/store';

const Root = () => (
<Provider store={store}>
<PersistGate persistor={persistor}> 
<App/>
 </PersistGate>
   </Provider>
 )

 AppRegistry.registerComponent(appName, () => Root);
