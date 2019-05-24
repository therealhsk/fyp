import React from 'react'
import {Text,Image,View,TouchableOpacity,Alert,Platform,PermissionsAndroid} from 'react-native'


import {ImagePicker,Permissions} from 'expo'
import Icon from 'react-native-vector-icons/Ionicons'
import myAcc from '../assets/user.png'
import bpImage from '../assets/background.jpg'
import styles from '../global/styles'
import * as firebase from 'firebase'

export default class SettingsScreen extends React.Component {
    constructor(props){
        super(props)
        var User= firebase.auth().currentUser
        this.state={
            user: {
                name: User.displayName,
                phone: User.uid,
                photoURL: User.photoURL
        }
    }
}

onChooseImagePress = async () => {
    const res = await Promise.all([
        Permissions.askAsync(Permissions.CAMERA),
        Permissions.askAsync(Permissions.CAMERA_ROLL)
    ]);
    if(res){
        let result = await ImagePicker.launchCameraAsync();
        //let result = await ImagePicker.launchImageLibraryAsync();
    
        if (!result.cancelled) {
          this.uploadImage(result.uri, "test-image1.jpeg")
            .then(() => {
              Alert.alert("Success");
            })
            .catch((error) => {
              Alert.alert(error);
            });
    }
}}

uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var metaData={
        contentType: 'image/jpeg'
    }


    var ref = firebase.storage().ref().child("images/" + imageName);
    return ref.put(blob,metaData);

}

    render(){
        return(
            <View style={styles.backgroundContainer}>
            <View style={styles.logoContainer}>
            <Image source={myAcc} style={styles.accountPicture}/>
            <Text style={styles.logoText}>My Account</Text>
            <Text>{this.state.user.name}</Text>
            <Text>{this.state.user.phone}</Text>
            <TouchableOpacity style={styles.btnLogin} onPress={this.onChooseImagePress}>
            <Text style={styles.textbtn}>CHANGE PICTURE</Text>
            </TouchableOpacity>            
            </View>
            </View>
        )
    }
}
