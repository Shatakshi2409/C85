import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppTabNavigator} from './AppTabNavigator'
import CustomSideBarMenu from './CustomSideBarMenu'
import SettingScreen from '../Screens/SettingScreen'
import MyDonationScreen from '../Screens/MyDonationScreen';
import NotificationScreen from '../Screens/notificationScreen'

export const AppDrawerNavigator=createDrawerNavigator({
    home:{
        screen:AppTabNavigator
    },
    myDonation:{screen:MyDonationScreen},
    notification:{screen:notificationScreen},
Setting:{
    screen:SettingScreen
},

},
{createComponent:CustomSideBarMenu},
{initialRouteName:'home'}
)