import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Header, Icon, Card} from 'react-native-elements';

export default class RecieverDetailsScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            userId:firebase.auth().currentUser.email,
            recieverId:this.props.navigation.getParam('details')['user_Id'],
            requestId:this.props.navigation.getParam('details')['request_Id'],
            bookName:this.props.navigation.getParam('details')['book_name'],
            reasonToRequest:this.props.navigation.getPram('details')['reason_to_request'],
            recieverName:'',
            recieverContact:'',
            recieverAddress:'',
            recieverRequestDocId:''
        }
    }
    getRecieverDetails(){
      db.collection('users').where('email_id','==',this.state.recieverId).get()
      .then(snapshot=>{
          snapshot.forEach(doc => {
              this.setState({
recieverName:doc.data().first_name,
recieverContact:doc.data().contact,
recieverAddress:doc.data().address
              })
          });
      })  
    }
    updateBookStatus=()=>{
        db.collection('all_donations').add({
            book_name:this.state.bookName,
            request_id:this.state.requestId,
            requested_by:this.state.recieverName,
            donor_Id:this.state.userId,
            request_status:'donor interested'
        })
    }
    addNotification=()=>{
        var message=this.state.userName+'has shown interest in donating the book'
        db.collection('all_notifications').add({
            'targetedUser_id':this.state.recieverId,
            'Donor_id':this.state.userId,
            'request_id':this.state.requestId,
            'book_Name':this.state.bookName,
            'date':firebase.firestore.FieldValue.serverTimesTen(),
            'notification_status':'unread',
            'message':message
        })
    }
    componentDidMount(){
this.getRecieverDetails()
this.getUserDetails(this.state.userId)
    }
    render(){
        return(
    <View>        
<View><Card>
    <Text>Name:{this.state.recieverName}</Text>
    </Card>
    <Card>
    <Text>Contact:{this.state.recieverContact}</Text>
    </Card>
    <Card>
    <Text>Address:{this.state.recieverAddress}</Text>
    </Card>
    
    </View>
    <View>
        {
            this.state.recieverId!==this.state.userId
            ?(<TouchableOpacity onPress={()=>{this.updateBookStatus()
            this.props.navigation.navigate('myDonation')
            this.addNotification()
            }}><Text>I want to donate</Text></TouchableOpacity>)
            : null
        }
    </View>
    </View>
        )
    }
}