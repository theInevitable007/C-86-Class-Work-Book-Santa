import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSidebarMenu from './CustomSidebarMenu';
import SettingsScreen from '../Screens/SettingsScreen';
import MyDonationScreen from '../Screens/MyDonationScreen';
import NotificationsScreen from '../Screens/NotificationsScreen';

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {screen: AppTabNavigator},
    Setting: {screen: SettingsScreen},
    MyDonations: {screen: MyDonationScreen},
    NotificationsScreen: {screen: NotificationsScreen}

}, 
{
    contentComponent: CustomSidebarMenu
},
{initialRouteName: 'Home' 
})