import React from 'react';
import { StyleSheet,Dimensions} from 'react-native';

const { width: WIDTH } = Dimensions.get('window')

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
      marginBottom: 40
    },
    logoText: {
      color: 'white',
      fontSize: 20,
      fontWeight: '500',
      marginTop: 10,
      backgroundColor: 'rgba(50,50,50,0.70)',
      borderRadius: 15,
      height: 25,
      width: '90%'
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
    textbtn: {
      color: 'rgba(255,255,255,1)',
      fontSize: 16,
      textAlign: 'center'
    },
    profilePic: {
      height: 70,
      width: 70
    },
    sendBtn:{
      height:45,
      width: 45,
      marginLeft: 10
    },
    msgInput:{
      width: '80%',
      height: 45,
      borderRadius: 25,
      fontSize: 16,
      backgroundColor: 'rgba(0,0,0,0.3)',
      color: 'rgba(255,255,255,1)',
      paddingLeft: 11
    },
    accountPicture: {
      height: 160,
      width: 160
    }
  });
  

  export default styles;