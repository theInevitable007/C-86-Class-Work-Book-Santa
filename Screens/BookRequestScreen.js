import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ToastAndroid, Alert, FlatList, Modal, ScrollView, Button} from "react-native";
import db from '../Config';
import firebase from 'firebase';
import MyHeader from '../Components/MyHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class BookRequestScreen extends React.Component{
    constructor() {
        super()
        this.state = {
            userID : firebase.auth().currentUser.email,
            bookName : "",
            reasonToRequest : "",
            isBookRequestActive : '', 
            requestedBookName : '',
            bookStatus : '',
            requestID : '',
            userDocID : '',
            docID : ''
         }
    }
    createUniqueID() {
        return Math.random().toString(36).substring(7);
    }

    getBookRequest = () => {
        var bookRequest = db.collection('requestedBooks').where('userID', '==', this.state.userID).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                if(doc.data().bookStatus != 'received'){
                    this.setState({
                        requestID : doc.data().requestID,
                        requestedBookName : doc.data().bookName, 
                        bookStatus : doc.data().bookStatus,
                        docID : doc.id
                    });
                }
            });
        });
    }
    addRequest = async (bookName, reasonToRequest)=>{
        var userID = this.state.userID;
        var randomRequestID = this.createUniqueID();
        db.collection('requestedBooks').add({ 
            userID: userID,
            bookName: bookName,
            reasonToRequest: reasonToRequest,
            requestID : randomRequestID
        }); 
        await this.getBookRequest()
        db.collection('users').where('emailID', '==', userID).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                db.collection('users').doc(doc.id).update({
                    isBookRequestActive : true
                });
            });
        });
        this.setState({
            bookName: '',
            reasonToRequest: '',
            requestID : randomRequestID
        });
        return Alert.alert('Book requested successfully');
    }

    getIsBookRequestActive() {
        db.collection('users').where('emailID', '==', this.state.userID).onSnapshot((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    isBookRequestActive : doc.data().isBookRequestActive,
                    userDocID : doc.id
                });
            });
        });
    }

    sendNotification = () =>{
        db.collection('users').where('emailID', '==', this.state.userID).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var name = doc.data().firstName;
                var lastName = doc.data().lastName;

                db.collection('allNotifications').where('requestID', '==', this.state.requestID).get().then((snapshot)=>{
                    snapshot.forEach((doc)=>{
                        var donorID = doc.data().donorID;
                        var bookName = doc.data().bookName;
                        
                        db.collection('allNotifications').add({
                            targetedUserID : donorID, 
                            message : name + ' ' + lastName + 'received the book' + bookName,
                            nofificationStatus : 'unread',
                            bookName : bookName
                        });
                    });
                });
            });
        });
    }

    updateBookRequestActive = () =>{
        db.collection('requestedBooks').doc(this.state.docID).update({
            bookStatus : 'received'
        });
        db.collection('users').where('emailID', '==', this.state.userID).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                db.collection('users').doc(doc.id).update({
                    isBookRequestActive : false
                });
            });

        });
    }

    receivedBooks = (bookName) =>{
        var userID = this.state.userID;
        var requestID = this.state.requestID;

        db.collection('receivedBooks').add({
            userID : userID,
            bookName : bookName, 
            requestID : requestID,
            bookStatus : 'received'
        });
    }
    
    componentDidMount() {
        this.getBookRequest();
        this.getIsBookRequestActive();
    }

    render() {
        if(this.state.isBookRequestActive === true){
            return(
                <View style = {{flex : 1, justifyContent : 'center'}}>
                    <View style = {{backgroundColor : 'orange', borderWidth : 2, justifyContent : 'center', alignItems : 'center', padding : 10, margin : 10}}>
                        <Text>Book Name</Text>
                        <Text>{this.state.requestedBookName}</Text>
                    </View>

                    <View style = {{backgroundColor : 'orange', borderWidth : 2, justifyContent : 'center', alignItems : 'center', padding : 10, margin : 10}}>
                        <Text>Book Status</Text>
                        <Text>{this.state.bookStatus}</Text>
                    </View>
                    <TouchableOpacity style = {{borderWidth : 1, borderColor : 'orange', backgroundColor : 'orange', width : 300, alignSelf : 'center', alignItems : 'center', height : 30, margintop : 30}} onPress = {()=>{
                        this.sendNotification();
                        this.updateBookRequestActive();
                        this.receivedBooks(this.state.requestedBookName);
                    }}>
                        <Text>I received the book</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
        return (
            <SafeAreaProvider>
            <View style = {{flex: 1}}>
                <MyHeader title = 'Request Book' navigation = {this.props.navigation}></MyHeader>
                <KeyboardAvoidingView style = {styles.keyBoardStyle}></KeyboardAvoidingView>
                <TextInput style = {styles.formTextInput} placeholder = "Enter book name" value = {this.state.bookName} onChangeText = {(text)=>{
                    this.setState({
                        bookName: text
                    });
                }}></TextInput>
                <TextInput style = {[styles.formTextInput, {height: 300}]} placeholder = "Reason to request" value = {this.state.reasonToRequest} multiline numberOfLines = {8} onChangeText = {(text)=>{
                    this.setState({
                        reasonToRequest: text
                    });
                }}></TextInput>

                <TouchableOpacity style = {styles.button} onPress = {()=>{this.addRequest(this.state.bookName, this.state.reasonToRequest)}}>
                    <Text>Request</Text>
                </TouchableOpacity>
            </View>
            </SafeAreaProvider>
        )
    }
}
}

const styles = StyleSheet.create({
    keyBoardStyle : {
      flex: 0.5,
      alignItems:'center',
      justifyContent:'center'
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
      marginTop:20,
      marginLeft: 50
      },
    }
  )