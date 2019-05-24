import React from 'react';
import {Alert, StyleSheet, Text, View, ImageBackground, Image, TextInput, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

import bpImage from "../assets/background.jpg"
import logo from "../assets/logo.png"
import Icon from 'react-native-vector-icons/Ionicons'

import * as firebase from 'firebase'

import NavigationService from '../global/NavigationService';


const { width: WIDTH } = Dimensions.get('window')

export default class SignUpScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      showPass: true,
      press: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      username: '',
      age: '',
      country: '',
      phone: '',
    }
  }
  static navigationOptions = {
    header: null
  }

  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true })
    }
    else {
      this.setState({ showPass: true, press: false })
    }
  }

//Sign up new user method
  SignUpUser = () => {
    try {

      if (this.state.firstName == '' || this.state.lastName == '' ||
        this.state.username == '' || this.state.age == '' || this.state.country == '') {
        Alert.alert("Fill all the fields!")
        return;
      }
      if (this.state.password.length < 6) {
        Alert.alert("Please enter atleast 6 characters");
        return;
      }
      if(this.state.phone<11){
        Alert.alert("Type a valid phone number")
      }
      var username = this.state.firstName+' ' +this.state.lastName
      var phone =this.state.phone
      var password= this.state.password

      //creating new user
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(function (user) {

          //siging in the new user to update values
          firebase.auth().signInWithEmailAndPassword(user.user.email, password)
          
          //updating display name
          var updateUser= firebase.auth().currentUser;
          updateUser.updateProfile({
            displayName: username,
          })

          //updating phone number
          
              
          //logging out the user logged in to update information
          firebase.auth().signOut()
          NavigationService.navigate('Login');
        })
    } catch (error) {
      alert(error.toString())
    }
  }

  render() {
    return (
      <ImageBackground source={bpImage} style={styles.backgroundContainer}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.logoText}> TOURIST GUIUDANCE WITH LANGUAGE INTERPRETER</Text>
        </View>

        <KeyboardAvoidingView>

          <View style={styles.inputContainer}>
            <Icon name={'ios-person'} size={23} color={'rgba(0,0,0,1.0)'}
              style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={'First Name'}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={firstName => this.setState({ firstName })}
              value={this.state.firstName}
            ></TextInput>
          </View>

          <View style={styles.inputContainer}>
            <Icon name={'ios-person'} size={23} color={'rgba(0,0,0,1.0)'}
              style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={'Last Name'}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={lastName => this.setState({ lastName })}
              value={this.state.lastName}
            ></TextInput>
          </View>

          <View style={styles.inputContainer}>
            <Icon name={'ios-person'} size={23} color={'rgba(0,0,0,1.0)'}
              style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={'Email'}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              keyboardType='email-address'
            ></TextInput>
          </View>


          <View style={styles.inputContainer}>
            <Icon name={'ios-person'} size={23} color={'rgba(0,0,0,1.0)'}
              style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={'Username'}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={username => this.setState({ username })}
              value={this.state.username}
            ></TextInput>
          </View>


          <View style={styles.inputContainer}>
            <Icon name={'ios-lock'} size={23} color={'rgba(0,0,0,1)'}
              style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={'Password'}
              secureTextEntry={this.state.showPass}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            ></TextInput>
            <TouchableOpacity style={styles.btnEye}
              onPress={this.showPass}
            >
              <Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'} size={26} color={'rgba(255,255,255,0.7)'} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Icon name={'ios-person'} size={23} color={'rgba(0,0,0,1.0)'}
              style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={'Age'}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={age => this.setState({ age })}
              value={this.state.age}
              keyboardType='number-pad'
            ></TextInput>
          </View>

          <View style={styles.inputContainer}>
            <Icon name={'ios-phone-portrait'} size={23} color={'rgba(0,0,0,1.0)'}
              style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={'Phone Number'}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={phone => this.setState({ phone })}
              value={this.state.phone}
              keyboardType='number-pad'
            ></TextInput>
          </View>


          <View style={styles.inputContainer}>
            <Icon name={'ios-person'} size={23} color={'rgba(0,0,0,1.0)'}
              style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={'Country'}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={country => this.setState({ country })}
              value={this.state.country}
            ></TextInput>
          </View>

        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.btnLogin} onPress={this.SignUpUser}>
          <Text style={styles.text}>SIGNUP</Text>
        </TouchableOpacity>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 100,
    width: 100
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.5,
    backgroundColor: 'rgba(50,50,50,0.70)',
    borderRadius: 25
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25
  },
  inputIcon: {
    position: 'absolute',
    top: 10,
    left: 45
  },
  inputContainer: {
    marginTop: 10
  },
  btnEye: {
    position: 'absolute',
    top: 8,
    right: 45
  },
  btnLogin: {
    width: WIDTH - 220,
    height: 45,
    borderRadius: 25,
    backgroundColor: 'rgba(76,76,76,0.5)',
    justifyContent: 'center',
    marginTop: 20
  },
  text: {
    color: 'rgba(255,255,255,1)',
    fontSize: 16,
    textAlign: 'center'
  }
});
