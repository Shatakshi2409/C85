
import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import {db} from '../config'
import firebase from 'firebase'
import {Card, Icon, ListItem} from 'react-native-elements'

export default class MyDonationScreen extends React.Component{
    static navigationOption={header:null};
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            allDonations:[]
        }
        this.requestref=null
    }
    getAllDonations=()=>{
        this.requestref=db.collection('all_donations').where('donor_id','==',this.state.userId)
        .onSnapshot(snapshot=>{
            var allDonations=snapshot.docs.map(document.data())
            this.setState({
                allDonations:allDonations
            })
        })
    }
    sendBooks=(bookDetails)=>{
        if(bookDetails.request_status==='book sent'){
            var request_status='donor interested'
            db.colllection('all_donations').doc(bookDetails.doc_Id).update({
                'request_status':'donor interested'
            })
            this.sendNotification(bookDetails,requestStatus)
        }
        else{ var request_status='book sent'
        db.colllection('all_donations').doc(bookDetails.doc_Id).update({
            'request_status':'donor interested'
        })
        this.sendNotification(bookDetails,requestStatus)}
    }
    sendNotification=(bookDetails,requestStatus)=>{
        var requestId=bookDetails.requestId
        var donorId=bookDetails.donorId
        db.collection('all_notification')
        .where('requestId','==',requestId)
        .where('donorId','==',donorId)
        .get()
        .then(snapshot=>{
            snapshot.forEach(doc => {
                var message=''
                if (requestStatus==='book sent'){
                    message=this.state.donorName+'sent you book'
                }
                else{
                    message=this.state.donorName+'has shown interest in donating a book'
                }
                db.collection('all_notification').doc(doc.id).update({
                    'message':message,'notification_status':'unread',
                    'date':firebase.firestore.FieldValue.serverTimestamp()
                })
            });
        })
    }
    keyExtractor=(index,item)=>index.toString()
    renderItem=({item,i})=>(
        <ListItem 
        key={i}
        title={item.book_Name}
        subtitle={'requestedBy'+item.requested_by+'\n status'+item.request_status}
        leftElement={<Icon name='book' type='font-awesome' color='grey'></Icon>}
        rightElement={
            <TouchableOpacity
            onPress={()=>{this.sendBook(Item)}}
        ><Text>{item.request_status==='book sent' ? 'book sent':'send the book'}</Text></TouchableOpacity>
        }
        bottomDivider
        ></ListItem>
    )
    render(){
        return(
<View><MyHeader navigation={this.props.navigation} title='myDonation'></MyHeader><View>
    {this.state.allDonations.length===0
    ?(
        <View><Text>List of all book donations</Text></View>
    )
    :(
        <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.allDonations}
        renderItem={this.state.renderItem}
        />
    )
    }
    </View></View>
        )
    }
}