import React, {Component} from 'react';
import {Header, Icon, Badge} from 'react-native-elements';
import db from '../Config';
import {View} from 'react-native';
import firebase from 'firebase';

export default class MyHeader extends Component{
    constructor(props){
        super(props);

        this.state = {
            userID : firebase.auth().currentUser.email,
            Value: 0,
        }
    }
    getNumberOfUnreadNotifications(){
        db.collection('allNotifications').where('nofificationStatus', '==', 'Unread').where('targetedUserID', '==', this.state.userID).onSnapshot((snapshot) =>{
            var unreadNotifications = snapshot.docs.map(document=>document.data());
            console.log(unreadNotifications);
            this.setState({
                Value: unreadNotifications.length,
            });
        });
    }

    componentDidMount(){
        this.getNumberOfUnreadNotifications();
        
    }

    bellIconWithBadge = ()=> {
        return(
            <View>
                <Icon name = 'bell' type = 'font-awesome' color = '#696969' size = {25} onPress = {()=>{this.props.navigation.navigate('NotificationsScreen')}}></Icon>
                <Badge value = {this.state.Value} containerStyle = {{position: 'absolute', top: -4, right: -4}}></Badge>
            </View>
        )
    }

    render() {
    return(
        
        <Header leftComponent = {<Icon name = "bars" type = "font-awesome" color = "#696969" onPress = {()=>
            this.props.navigation.toggleDrawer()
        }></Icon>} rightComponent = {<this.bellIconWithBadge{...this.props}/>} backgroundColor = {'#EAF8FE'} centerComponent = {{text : this.props.title, style : {color: '#90A5A9', fontSize : 20, fontWeight: 'bold'}}}></Header>
    
    )
  }
}