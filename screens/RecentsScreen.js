import React from 'react'
import { SafeAreaView,FlatList,Text, StyleSheet, Button, View, TouchableOpacity,Image } from 'react-native'

import styles from '../global/styles'

import userImg from '../assets/user.png'

import User from '../global/User'
import * as firebase from 'firebase'

import Icon from 'react-native-vector-icons/Ionicons'

export default class ReactScreen extends React.Component {
    constructor(props) {
        super(props)
        var User = firebase.auth().currentUser;
        this.state = {
            email: '',
            users: [],
            user: {
                name: User.displayName,
                phone: User.uid
            }
        }
    }

    uid = () => {
        console.log(firebase.auth().currentUser.email)
    }

    componentWillMount() {
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val) => {
            let person = val.val();
            person.phone = val.key;
            if(person.phone===this.state.user.phone){
                this.state.user.name=person.name
            }
            this.setState((prevState) => {
                return {
                    users: [...prevState.users, person]
                }
            })
        })
    }

    renderRow = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', item)}
            style={{padding : 5, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
            <View style={{flex:1,flexDirection:'row'}}>
            <Image source={userImg} style={{height:60,width:60}}></Image>
            <Text style={{fontSize: 20, left: 10,fontWeight:'bold',color: '#FB9AAC'}}>{item.name}</Text>
            </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <SafeAreaView>
                <FlatList
                data={this.state.users}
                renderItem={this.renderRow}
                keyExtractor={(item)=> item.phone}
                />
            </SafeAreaView>
        );
    }
}
