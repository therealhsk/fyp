import React from 'react'
import { TextInput, Dimensions, SafeAreaView, Text, View, TouchableOpacity, FlatList, Image,KeyboardAvoidingView } from 'react-native'
import styles from '../global/styles'
import * as firebase from 'firebase'
import sendImg from '../assets/send.png'

export default class ChatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name', null)
        }
    }

    constructor(props) {
        super(props)
        var User = firebase.auth().currentUser;
        this.state = {
            user: {
                name: User.displayName,
                phone: User.uid
            },
            person: {
                name: props.navigation.getParam('name'),
                phone: props.navigation.getParam('phone')
            },
            textMessage: '',
            messageList: []
        }
    }

    componentWillMount() {
        firebase.database().ref('messages').child(this.state.user.phone).child(this.state.person.phone)
            .on('child_added', (value) => {
                this.setState((prevState) => {
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    }
                })
            })
    }

    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {
            let msgId = firebase.database().ref('messages').child(this.state.user.phone).child(this.state.person.phone).push().key;
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: this.state.user.phone
            }
            updates['messages/' + this.state.user.phone + '/' + this.state.person.phone + '/' + msgId] = message;
            updates['messages/' + this.state.person.phone + '/' + this.state.user.phone + '/' + msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({ textMessage: '' });
        }
    }

    converTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        return result;
    }

    renderRow = ({ item }) => {
        return (
            <View style={{
                flexDirection: 'column',
                width: '60%',
                alignSelf: item.from === this.state.user.phone ? 'flex-end' : 'flex-start',
                backgroundColor: item.from === this.state.user.phone ? 'grey' : '#FB9AAC',
                borderRadius: 5,
                marginBottom: 10,
            }}>
                <Text style={{ color: '#fff', padding: 7, fontSize: 16}}>
                    {item.message}
                </Text>

                <Text style={{ color: '#eee', padding: 7, fontSize: 12 }}>{this.converTime(item.time)}
                </Text>
            </View>
        )
    }


    render() {
        let { height, width } = Dimensions.get('window');
        return (
            <SafeAreaView>
                <FlatList style={{ padding: 10, height: height * 0.82 }}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />
                <KeyboardAvoidingView behavior="padding" style={{ flexDirection: 'row', marginLeft:10, paddingTop: 5, bottom:0 }}>
                    <TextInput
                        style={styles.msgInput}
                        placeholder="Type message..."
                        placeholderTextColor='rgba(255,255,255,1)'
                        value={this.state.textMessage}
                        onChangeText={textMessage => this.setState({ textMessage })}
                    />
                    <TouchableOpacity onPress={this.sendMessage}>
                        <Image source={sendImg} style={styles.sendBtn} />
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}
