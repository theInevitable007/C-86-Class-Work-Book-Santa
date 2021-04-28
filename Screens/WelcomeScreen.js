import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ToastAndroid, Alert, FlatList, Modal, ScrollView, Button} from "react-native";
import db from '../Config';
import firebase from 'firebase';

export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            emailID : '',
            password : '',
            isModalVisible : false,
            firstName : '',
            lastName : '',
            address : '',
            contact : '',
            confirmPassword : ''
      }
    }
    userLogin = (emailID, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailID, password).then(()=>{this.props.navigation.navigate('DonateBooks')}).catch((error)=>{
            var errorMessage = error.message;
            Alert.alert(errorMessage);
        })
    };

    userSignUp = (emailID, password, confirmPassword)=>{
      if(password != confirmPassword){
        return(
          Alert.alert('Passwords does not match')
        )
      }
      else{

      
        firebase.auth().createUserWithEmailAndPassword(emailID, password).then(()=>{
          db.collection('users').add({
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            emailID : this.state.emailID, 
            address : this.state.address,
            contact : this.state.contact,
            isBookRequestActive: false
          })
          return Alert.alert('Successfully Signed up', '',[{text : 'Ok', onPress : ()=>{this.setState({isModalVisible : false})}}])}).catch((error)=>{
            var errorMessage = error.message;
           Alert.alert(errorMessage);
        });
    }
  }

    showModal = ()=>{
      return(
        <Modal animationType = 'fade' transparent = {false} visible = {this.state.isModalVisible}>
          <View style = {styles.mobileContainer}>
            <ScrollView style = {{width: '100%'}}>
              <KeyboardAvoidingView style = {styles.KeyboardAvoidingView}>
                <Text style = {styles.modalTitle}>Registration</Text>
                <TextInput style = {styles.formTextInput} placeholder = "first name" maxLength = {10} onChangeText = {(text)=>{
                    this.setState({
                        firstName : text
                    });
                }}></TextInput>
                <TextInput style = {styles.formTextInput} placeholder = "last name" maxLength = {10} onChangeText = {(text)=>{
                    this.setState({
                        lastName : text
                    });
                }}></TextInput>
                <TextInput style = {styles.formTextInput} placeholder = "contact" keyboardType = {'numeric'} maxLength = {10} onChangeText = {(text)=>{
                    this.setState({
                        contact : text
                    });
                }}></TextInput>
                <TextInput style = {styles.formTextInput} placeholder = "address" multiline = {true} onChangeText = {(text)=>{
                    this.setState({
                        address : text
                    });
                }}></TextInput>
                <TextInput style = {styles.formTextInput} placeholder = "abc@example.com" keyboardType = "email-address" onChangeText = {(text)=>{
                    this.setState({
                        emailID : text
                    });
                }}></TextInput>
                <TextInput style = {styles.formTextInput} placeholder = "password" secureTextEntry = {true} onChangeText = {(text)=>{
                    this.setState({
                        password : text
                    });
                }}></TextInput>
                 <TextInput style = {styles.formTextInput} placeholder = "confirm password" secureTextEntry = {true} onChangeText = {(text)=>{
                    this.setState({
                        confirmPassword : text
                    });
                }}></TextInput>
                <View style = {styles.modalBackButton}>
                  <TouchableOpacity style = {styles.registerButton} onPress={()=>{this.userSignUp(this.state.emailID, this.state.password, this.state.confirmPassword)}}>
                    <Text style = {styles.registerButtonText}>Register</Text>
                  </TouchableOpacity>
                </View>
                <View style = {styles.modalBackButton}>
                  <TouchableOpacity style = {styles.cancelButton} onPress={()=>{this.setState({isModalVisible : false})}}>
                    <Text style = {{color : '#ff5722'}}>Cancel</Text>
                  </TouchableOpacity>
                </View>
               
               
               
                
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </Modal>
      )
    }

    render(){
        return(
            <View style = {styles.container}>
{
  this.showModal()
}
                <View>
                <Image source={require("../assets/BookSanta.png")} style={{ marginLeft : 95, width : 150, height : 200}}></Image>
                <Text style={styles.title}>Book Santa</Text>
                </View>

                <View style = {{flex:0.5}}>
                <TextInput style = {styles.loginBox} placeholder = "abc@example.com" keyboardType = "email-address" placeholderTextColor = '#ffff' onChangeText = {(text)=>{
                    this.setState({
                        emailID : text
                    });
                }}></TextInput>
                <TextInput style = {styles.loginBox} placeholder = "password" secureTextEntry = {true} placeholderTextColor = '#ffff' onChangeText = {(text)=>{
                    this.setState({
                        password : text
                    });
                }}></TextInput>

                <TouchableOpacity style = {[styles.button, {marginBottom : 20, marginTop : 20}]} onPress = {()=>{this.userLogin(this.state.emailID, this.state.password)}}><Text style = {styles.buttonText}>Login</Text></TouchableOpacity>
                <TouchableOpacity style = {styles.button} onPress = {()=>{this.setState({isModalVisible : true})}}><Text style = {styles.buttonText}>Sign Up</Text></TouchableOpacity>
                </View>

            </View>
        );
    }
}



const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'#F8BE85',
   alignItems: 'center',
   justifyContent: 'center'
 },
 profileContainer:{
   flex: 1,
   justifyContent:'center',
   alignItems:'center',
 },
 title :{
   fontSize:60,
   fontWeight:'300',
   paddingBottom : 5,
   color : '#ff3d00'
 },
 loginBox:{
   width: 300,
   height: 40,
   borderBottomWidth: 1.5,
   borderColor : '#ff8a65',
   fontSize: 20,
   margin:10,
   paddingLeft:10
 },
 KeyboardAvoidingView:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
 },
 modalTitle :{
   justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   color:'#ff5722',
   margin:50
 },
 modalContainer:{
   flex:1,
   borderRadius:20,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:"#ffff",
   marginRight:30,
   marginLeft : 30,
   marginTop:80,
   marginBottom:80,
 },
 formTextInput:{
   width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'#ffab91',
   borderRadius:10,
   borderWidth:1,
   marginTop:20,
   padding:10
 },
 registerButton:{
   width:200,
   height:40,
   alignItems:'center',
   justifyContent:'center',
   borderWidth:1,
   borderRadius:10,
   marginTop:30
 },
 registerButtonText:{
   color:'#ff5722',
   fontSize:15,
   fontWeight:'bold'
 },
 cancelButton:{
   width:200,
   height:30,
   justifyContent:'center',
   alignItems:'center',
   marginTop:5,
 },

 button:{
   width:300,
   height:50,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:25,
   backgroundColor:"#ff9800",
   shadowColor: "#000",
   shadowOffset: {
      width: 0,
      height: 8,
   },
   shadowOpacity: 0.30,
   shadowRadius: 10.32,
   elevation: 16,
   padding: 10
 },
 buttonText:{
   color:'#ffff',
   fontWeight:'200',
   fontSize:20
 }
})
