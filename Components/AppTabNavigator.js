import BookDonateScreen from '../Screens/BookDonateScreen';
import BookRequestScreen from '../Screens/BookRequestScreen';
import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {AppStackNavigator} from './AppStackNavigator';

export const AppTabNavigator = createBottomTabNavigator({
    DonateBooks: {screen: AppStackNavigator, navigationOptions:{tabBarIcon : <Image source={require('../assets/BookDonation.jpeg')} style={{width:20, height:20}}></Image>, tabBarLabel: 'Donate Books'}},
    BookRequest: {screen: BookRequestScreen, navigationOptions:{tabBarIcon : <Image source={require('../assets/BookRequest.png')} style={{width:20, height:20}}></Image>, tabBarLabel: 'Book Request'}}
});