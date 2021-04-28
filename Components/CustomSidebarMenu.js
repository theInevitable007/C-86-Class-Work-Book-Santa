import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import firebase from 'firebase';

export default class CustomSidebarMenu extends React.Component{
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.DrawerItemContainer}>
                    <DrawerItems {...this.props}/>
                </View>
                <View style = {styles.LogoutContainer} >
                    <TouchableOpacity style = {styles.logoutButton} onPress = {()=>{
                        this.props.navigation.navigate('WelcomeScreen');
                        firebase.auth().signOut();
                        }}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1
  },
  DrawerItemContainer: {
      flex: 0.6,
      marginTop: 200
  },
  LogoutContainer: {
      flex: 0.4,
      justifyContent: 'flex-end',
      paddingBottom: 30
  },
  logoutButton: {
      height: 30,
      width: '100%',
      justifyContent: 'center',
      padding: 10
  },
  LogoutText: {
      fontSize: 30,
      fontWeight: 'bold'
  }
});