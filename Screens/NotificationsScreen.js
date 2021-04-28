import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ToastAndroid, Alert, FlatList, Modal, ScrollView, Button} from "react-native";
import db from '../Config';
import firebase from 'firebase';
import MyHeader from '../Components/MyHeader';
import { ListItem } from "react-native-elements";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SwipableFlatList from '../Components/SwipableFlatList';

export default class MyDonationScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            allNotifications: [],
            userID: firebase.auth().currentUser.email,
        }
        this.requestRef = null;
    }
    getAllNotifications = ()=>{
        this.requestRef = db.collection('allNotifications').where('targetedUserID','==', this.state.userID).where('nofificationStatus', '==', 'Unread').onSnapshot((snapshot)=>{
        var allNotifications = [];
        snapshot.docs.map((doc)=>{
            var notification = doc.data();
            notification['docID'] = doc.id;
            allNotifications.push(notification);
        })
            this.setState({
                allNotifications: allNotifications
            });
        });
    }
    componentDidMount(){
        this.getAllNotifications();
    }
    componentWillUnmount(){
        this.requestRef = null;
    }
    keyExtractor = (item,index)=>index.toString();
    
    renderItem = ({item, index})=>{
        return (
            <ListItem key = {index} bottomDivider>
                <ListItem.Content>
                <ListItem.Title>{item.bookName}</ListItem.Title>
                <ListItem.Subtitle>{item.message}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }

    render(){
        return (
            <SafeAreaProvider>
            <View style={{flex: 1}}>
                <MyHeader title = "My Notifications" navigation = {this.props.navigation}></MyHeader>
                <View style={{flex: 1}}>
                    {
                        this.state.allNotifications.length == 0?(
                            <View style={styles.subContainer}>
                                <Text style = {{fontSize: 20}}>No notifications</Text>
                            </View>
                        ) : (
                            <SwipableFlatList allNotifications = {this.state.allNotifications}></SwipableFlatList>
                        )

                    }
                </View>
            </View>
            </SafeAreaProvider>
        )
    }
}

const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
  });
  