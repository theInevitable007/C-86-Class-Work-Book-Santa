import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ToastAndroid, Alert, FlatList, Modal, ScrollView, Button} from "react-native";
import db from '../Config';
import firebase from 'firebase';
import MyHeader from '../Components/MyHeader';

export default class SettingsScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            emailID : '',
            firstName : '',
            lastName : '',
            address : '',
            contact : '',
            docID: ''            
      }
    }
    getUserDetails = () =>{
        var email = firebase.auth().currentUser.email;
        db.collection('users').where('emailID','==',email).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var data = doc.data();
                this.setState({
                    emailID: data.emailID,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    contact: data.contact,
                    docID: doc.id
                });
            });
        });
    }
    updateUserDetails = ()=>{
        db.collection('users').doc(this.state.docID).update({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            contact : this.state.contact,
            address : this.state.address
        });
        Alert.alert('Profile updated successfully');
    }
    componentDidMount(){
        this.getUserDetails();
    }
    render() {
        return (
            <View style={styles.container}>
                <MyHeader title ='settings' navigation = {this.props.navigation}></MyHeader>
                <View style={styles.formContainer}>
                <TextInput style = {styles.formTextInput} placeholder = "first name" value = {this.state.firstName} maxLength = {10} onChangeText = {(text)=>{
                    this.setState({
                        firstName : text
                    });
                }}></TextInput>
                <TextInput style = {styles.formTextInput} placeholder = "last name" value = {this.state.lastName} maxLength = {10} onChangeText = {(text)=>{
                    this.setState({
                        lastName : text
                    });
                }}></TextInput>
                <TextInput style = {styles.formTextInput} placeholder = "contact" keyboardType = {'numeric'} value = {this.state.contact} maxLength = {10} onChangeText = {(text)=>{
                    this.setState({
                        contact : text
                    });
                }}></TextInput>
                <TextInput style = {styles.formTextInput} placeholder = "address" value = {this.state.address} multiline = {true} onChangeText = {(text)=>{
                    this.setState({
                        address : text 
                    });
                }}></TextInput>
                <TouchableOpacity style = {styles.button} onPress = {()=>{this.updateUserDetails()}}>
                    <Text style = {styles.buttonText}>Save</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    formContainer:{
      flex:1,
      width:'100%',
      alignItems: 'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
    },
    buttonText:{
      fontSize:25,
      fontWeight:"bold",
      color:"#fff"
    }
  })
  
