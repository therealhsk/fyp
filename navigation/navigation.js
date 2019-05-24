import {
    createStackNavigator, createAppContainer,
    createBottomTabNavigator, createMaterialTopTabNavigator,
    createSwitchNavigator
} from 'react-navigation'


import LoginScreen from '../screens/LoginScreen.js'
import SignUpScreen from '../screens/SignUpScreen.js'
import ChatScreen from '../screens/ChatScreen.js'
import RecentsScreen from '../screens/RecentsScreen'
import SettingsScreen from '../screens/SettingsScreen'
import LandmarksScreen from '../screens/LandmarksScreen'


// first tab stack

const ChatStack = createStackNavigator(
    {
        Recents: RecentsScreen,


        // for future advancements
        // Profile: ProfileScreen
    },
    {
        initialRouteName: "Recents",
        headerMode: "none",
        navigationOptions: {
            headerTintColor: "grey",
            headerVisible: false,
            headerStyle: {
                backgroundColor: "#fff"
            }
        }
    }
);

//second tab stack
const SettingsStack = createStackNavigator(
    {
        Settings: SettingsScreen,
    },
    {
        initialRouteName: "Settings",
        headerMode: "none",
        navigationOptions: {
            headerTintColor: "grey",
            headerVisible: false,
            headerStyle: {
                backgroundColor: "#fff"
            }
        }
    }
);

//third tab stack
const LandmarksStack = createStackNavigator(
    {
        Landmarks: LandmarksScreen,
    },
    {
        initialRouteName: "Landmarks",
        headerMode: "none",
        navigationOptions: {
            headerTintColor: "grey",
            headerVisible: false,
            headerStyle: {
                backgroundColor: "#fff"
            }
        }
    }
);



//Tabs
const MainTabs = createMaterialTopTabNavigator(
    {
        Chats: ChatStack,
        Settings: SettingsStack,
        Landmarks: LandmarksStack
    },{
    tabBarOptions: {
        labelStyle:{
            fontSize: 14,
            fontWeight: 'bold'
        },
        activeTintColor: "#fff",
        style: {
            backgroundColor: 'grey',
        },
        indicatorStyle:{
            backgroundColor: '#FB9AAC',

        }
    },
}
);

MainTabs.navigationOptions={
    headerLeft: null,
    headerStyle: {
            backgroundColor: 'grey'
        },
    }

//initial Stack

const MainSwitch = createStackNavigator({
    Login: LoginScreen,
    SignUp: SignUpScreen,
    Main: MainTabs,
    Chat: ChatScreen,
},
);

MainSwitch.navigationOptions ={


}

export const AppContainer = createAppContainer(MainSwitch);

