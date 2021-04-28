import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ToastAndroid, Alert, FlatList, Modal, ScrollView, Button} from "react-native";
import db from '../Config';
import firebase from 'firebase';
import {Header, Icon, Card} from 'react-native-elements';

export default class ReceiverDetailsScreen extends React.Component{
    constructor(props){
        super(props);
      this.state = {
          userID: firebase.auth().currentUser.email,
          receiverID: this.props.navigation.getParam('Details')['userID'],
          requestID: this.props.navigation.getParam('Details')['requestID'],
          bookName: this.props.navigation.getParam('Details')['bookName'],
          reasonToRequest: this.props.navigation.getParam('Details')['reasonToRequest'],
          receiverName: '',
          receiverContact: '',
          receiverAddress: '',
          receiverRequestDocID: '',
          userName: ''
      }
    }
    getReceiverDetails(){
        db.collection('users').where('emailID', '==', this.state.receiverID).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    receiverName: doc.data().firstName,
                    receiverContact: doc.data().contact,
                    receiverAddress: doc.data().address,
                });
            });
        });
        db.collection('requestedBooks').where('requestID', '==', this.state.requestID).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    receiverRequestDocID: doc.id
                });
            });
        });
    }
    updateBookRequest = ()=>{
        db.collection('allDonations').add({
            bookName: this.state.bookName,
            requestID: this.state.requestID,
            requestedBy: this.state.receiverName,
            donorID: this.state.userID,
            requestStatus: 'Donor interested'
        });
    }
    componentDidMount(){
        this.getReceiverDetails();
        this.getUserDetails(this.state.userID);
    }

    getUserDetails = (userID) => {
        db.collection('users').where('emailID','==', userID).get().then((snapshot) => {
            snapshot.forEach((doc)=>{
                this.setState({
                    userName: doc.data().firstName + ' ' + doc.data().lastName
                });
            });
        });
    }
    addNotifications = () => {
        var message = this.state.userName + ' has shown interest in donating the book';
        db.collection('allNotifications').add({
            bookName: this.state.bookName,
            targetedUserID: this.state.receiverID,
            requestID: this.state.requestID,
            donorID: this.state.userID,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            nofificationStatus: 'Unread',
            message: message
        });
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{flex: 0.1}}>
                    <Header leftComponent = {<Icon name = 'arrow-left' type = 'feather' color = '#696969' onPress = {()=>{
                        this.props.navigation.goBack();
                    }}></Icon>} centerComponent = {{text: 'Donate books', style: {color: '#90A5A9', fontSize: 20, fontWeight: 'bold'}}} backgroundColor = '#EAF8FE'></Header>
                </View>
                <View style = {{flex: 0.3}}>
                    <Card title = 'Book information'titleStyle = {{fontSize: 20}}>
                        <Card>
                            <Text style = {{fontWeight: 'bold'}}>Name: {this.state.bookName}</Text>
                        </Card>
                        <Card>
                            <Text style = {{fontWeight: 'bold'}}>Reason: {this.state.reasonToRequest}</Text>
                        </Card>
                    </Card>
                </View>

                <View style = {{flex: 0.3}}>
                    <Card title = 'Receiver information' titleStyle = {{fontSize: 20}}>
                        <Card>
                            <Text style = {{fontWeight: 'bold'}}>Name: {this.state.receiverName}</Text>
                        </Card>
                        <Card>
                            <Text style = {{fontWeight: 'bold'}}>Contact: {this.state.receiverContact}</Text>
                        </Card>
                        <Card>
                            <Text style = {{fontWeight: 'bold'}}>Address: {this.state.receiverAddress}</Text>
                        </Card>
                    </Card>
                </View>
                <View style = {styles.formContainer}>
                    {
                        this.state.receiverID != this.state.userID ? (
                            <TouchableOpacity style = {styles.button} onPress = {()=>{
                            this.addNotifications()
                            this.updateBookRequest()
                            this.props.navigation.navigate('MyDonations')}}>
                            <Text>I want to donate</Text>
                            </TouchableOpacity>
                        ): null
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
      flex: 1
     
    },
    formContainer:{
      flex: 0.3,
      alignItems: 'center',
      justifyContent: 'center'
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
  
