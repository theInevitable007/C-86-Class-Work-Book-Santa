import React from 'react';
import WelcomeScreen from './Screens/WelcomeScreen';
import {AppTabNavigator} from './Components/AppTabNavigator';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {AppDrawerNavigator} from './Components/AppDrawNavigator';

export default function App() {
  return (
    <AppContainer></AppContainer>   
  );
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen : {screen : WelcomeScreen},
  Drawer: {screen : AppDrawerNavigator},
  BottomTab : {screen : AppTabNavigator}
});

const AppContainer = createAppContainer(switchNavigator);