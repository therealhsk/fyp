import React from 'react'
import {Text,StyleSheet} from 'react-native'

export default class LandmarksScreen extends React.Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    
    render(){
        return(
            <Text>Landmarks Screen</Text>
        )
    }
}

const styles = StyleSheet.create({
    text:{
        justifyContent:'center',
        alignItems: 'center'
    }
})