import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ToastAndroid, Alert, FlatList, Modal, ScrollView, Button} from "react-native";
import db from '../Config';
import firebase from 'firebase';
import MyHeader from '../Components/MyHeader';
import { ListItem } from "react-native-elements";

export default class BookDonateScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            requestedBooksList: [],
        }
        this.requestRef = null;
    }
    getRequestedBooksList = ()=>{
        this.requestRef = db.collection('requestedBooks').onSnapshot((snapshot)=>{
            var requestedBooksList = snapshot.docs.map(document=>document.data());
            this.setState({
                requestedBooksList: requestedBooksList
            });
        });
    }
    componentDidMount(){
        this.getRequestedBooksList();
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
                <ListItem.Subtitle>{item.reasonToRequest}</ListItem.Subtitle>
                <TouchableOpacity style={styles.button} onPress = {()=>{this.props.navigation.navigate('ReceiverDetails', {'Details': item})}}>
                    <Text style = {{color: 'white'}}>View</Text>
                </TouchableOpacity>
                </ListItem.Content>
            </ListItem>
        )
    }

    render(){
        return (
            <View style={{flex: 1}}>
                <MyHeader title = "Donate Books" navigation = {this.props.navigation}></MyHeader>
                <View style={{flex: 1}}>
                    {
                        this.state.requestedBooksList.length == 0?(
                            <View style={styles.subContainer}>
                                <Text style = {{fontSize: 20}}>List of all requested books</Text>
                            </View>
                        ) : (
                            <FlatList keyExtractor = {this.keyExtractor} data = {this.state.requestedBooksList} renderItem = {this.renderItem}></FlatList>
                        )

                    }
                </View>
            </View>
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
  })
  