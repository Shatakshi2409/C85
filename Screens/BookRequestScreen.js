import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/myHeader';

export default class BookRequestScreen extends React.Component{
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            bookName:'',
            reasonToRequest:''

        }
    }
    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }
    addRequest=(bookName,reasonToRequest)=>{
var userId=this.state.userId
var randomRequestId=this.createUniqueId()
db.collection('requested_books').add({
    'user_Id':userId,
    'book_name':bookName,
    'request_Id':randomRequestId
})
this.setState({
    bookName:'',
    reasonToRequest:''
})
return Alert.alert('Book Requested successfully')
    }
    render(){
        return(
            <View>
                <MyHeader title='requestBook'></MyHeader>
                <KeyboardAvoidingView>
                    <TextInput
                    placeholder='enterBookName'
                    onChangeText={(text)=>{
                        this.setState({
                            bookName:text
                        })
                    }}
                    ></TextInput>
                      <TextInput
                    placeholder='reasonToRequest'
                    onChangeText={(text)=>{
                        this.setState({
                            reasonToRequest:text
                        })
                    }}
                    ></TextInput>
                    <TouchableOpacity
                    onPress={()=>{this.addRequest(this.state.bookName, this.state.reasonToRequest)}}
                    ><Text>Request</Text></TouchableOpacity>
                </KeyboardAvoidingView>
                </View>


        )
    }
}