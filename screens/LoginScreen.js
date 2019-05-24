import React from 'react';
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import bpImage from '../assets/background.jpg'
import logo from '../assets/logo.png'
import Icon from 'react-native-vector-icons/Ionicons'
import * as firebase from 'firebase'

import styles from '../global/styles'

import NavigationService from '../global/NavigationService';

export default class LoginScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      showPass: true,
      press: false,
      email: '',
      password: ''
    }
  }

  static navigationOptions = {
    header: null
  }

  _navSignUpScreen = () => {
    this.props.navigation.navigate("SignUp");
  };

  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true })
    }
    else {
      this.setState({ showPass: true, press: false })
    }
  }

  loginUser = () => {
    try {
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(function (user) {
          console.log(user);
          NavigationService.navigate('Main', {email : user.user.email});
          firebase.database().ref('users/' + user.user.uid).set({name: user.user.displayName});
        })
    } catch (error) {
      console.log(error.toString());
    }
  }

  render() {
    return (
      <ImageBackground source={bpImage} style={styles.backgroundContainer}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.logoText}>TOURIST GUIUDANCE WITH LANGUAGE INTERPRETER</Text>
        </View>

        <KeyboardAvoidingView behavior="padding">
          <View style={styles.inputContainer}>
            <Icon name={'ios-person'} size={23} color={'rgba(0,0,0,1.0)'}
              style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={'Username'}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name={'ios-lock'} size={23} color={'rgba(0,0,0,1)'}
              style={styles.inputIcon} />
            <TextInput
              placeholder={'Password'}
              style={styles.input}
              secureTextEntry={this.state.showPass}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />

            <TouchableOpacity style={styles.btnEye} onPress={this.showPass}>
              <Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'} size={26} color={'rgba(255,255,255,0.7)'} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.btnLogin} onPress={this.loginUser}>
          <Text style={styles.textbtn}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnLogin} onPress={this._navSignUpScreen}>
          <Text style={styles.textbtn}>CREATE ACCOUNT</Text>
        </TouchableOpacity>

      </ImageBackground>
    );
  }
}

