import React from 'react';

import * as firebase from 'firebase'
import { AppContainer } from './navigation/navigation'

import NavigationService from './global/NavigationService'

export default class App extends React.Component {

  //firebase INIT
  componentWillMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyC2IkEx8Z_XQ8sKWcDR0Fn_4dm48sPv4FI',
      authDomain: ' cedfypc31-19690.firebaseapp.com ',
      databaseURL: "https://cedfypc31-19690.firebaseio.com",
      storageBucket:"gs://cedfypc31-19690.appspot.com"
    }
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }} />
    );
  }
}
