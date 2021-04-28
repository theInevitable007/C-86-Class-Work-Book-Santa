import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ToastAndroid, Alert, FlatList, Modal, ScrollView, Button} from "react-native";
import db from '../Config';
import firebase from 'firebase';
import MyHeader from '../Components/MyHeader';
import { ListItem } from "react-native-elements";
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class MyDonationScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            allDonations: [],
            userID: firebase.auth().currentUser.email,
        }
        this.requestRef = null;
    }
    getAllDonations = ()=>{
        this.requestRef = db.collection('allDonations').where('donorID','==', this.state.userID).onSnapshot((snapshot)=>{
            var allDonations = snapshot.docs.map(document=>document.data());
            this.setState({
                allDonations: allDonations
            });
        });
    }
    componentDidMount(){
        this.getAllDonations();
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
                <ListItem.Subtitle>{'Requested by' + item.requestedBy + '\n status: ' + item.requestStatus}</ListItem.Subtitle>
                <TouchableOpacity style={styles.button}>
                    <Text style = {{color: 'white'}}>Send Book</Text>
                </TouchableOpacity>
                </ListItem.Content>
            </ListItem>
        )
    }

    render(){
        return (
            <SafeAreaProvider>
            <View style={{flex: 1}}>
                <MyHeader title = "My Donations" navigation = {this.props.navigation}></MyHeader>
                <View style={{flex: 1}}>
                    {
                        this.state.allDonations.length == 0?(
                            <View style={styles.subContainer}>
                                <Text style = {{fontSize: 20}}>List of all donations</Text>
                            </View>
                        ) : (
                            <FlatList keyExtractor = {this.keyExtractor} data = {this.state.allDonations} renderItem = {this.renderItem}></FlatList>
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
  