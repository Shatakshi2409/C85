import React from 'react';
import firebase from 'firebase';
import SantaAnimation from '../components/santaclaus'
import db from '../config'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Modal,Alert } from 'react-native';


export default class WelcomeScreen extends React.Component {
  constructor(){
    super();
this.state={
  emailId:'',
  password:'',
isModalVisible:'false',
firstname:'',
lastname:'',
address:'',
contact:'',
confirmpassword:''
}
    
  }
  showModal=()=>{
    return(
      <Modal
      animationType='fade' transparent={true} visisble={this.state.isModalVisible}
      >
        <View>
          <ScrollView>
            <KeyboardAvoidingView>
              <Text>Registration</Text>
              <TextInput
              placeholder={'firstname'}
              maxLength={8}
              onChangeText={(text)=>{
                this.setState({
                  firstname:text

                })
              }}
              ></TextInput>
               <TextInput
              placeholder={'lastname'}
              maxLength={8}
              onChangeText={(text)=>{
                this.setState({
                  lastname:text
                  
                })
              }}
              ></TextInput>
               <TextInput
              placeholder={'contact'}
              maxLength={10}
              keyboardType={'numeric'}
              onChangeText={(text)=>{
                this.setState({
                  contact:text
                  
                })
              }}
              ></TextInput>
               <TextInput
              placeholder={'address'}
              multiline={true}
              onChangeText={(text)=>{
                this.setState({
                  address:text
                  
                })
              }}
              ></TextInput>
               <TextInput
              placeholder={'email'}
              keyboardType={'email-address'}
              onChangeText={(text)=>{
                this.setState({
                  email:text
                  
                })
              }}
              
              ></TextInput>
               <TextInput
              placeholder={'password'}
              secureTextEntry={true}
              onChangeText={(text)=>{
                this.setState({
                  password:text
                  
                })
              }}
              ></TextInput>
               <TextInput
              placeholder={'confirmpassword'}
              secureTextEntry={true}
              onChangeText={(text)=>{
                this.setState({
                  confirmpassword:text
                  
                })
              }}
              ></TextInput>
              <TouchableOpacity
              onPress={()=>this.userSignup(this.state.emailId,this.state.password,this.state.confirmpassword)}
              >
                <Text>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={()=>this.setState({isModalVisible:'false'})}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    )
  }
  userSignup=(emailId,password,confirmpassword)=>{
    if(password!==confirmpassword){
      return alert('password does not match please check your password')
    }
    else{
    firebase.auth().createUserWithEmailAndPassword(emailId,password)
    .then(response=>{
      return alert('user added successfully')
    })
    .catch(function(error){
      var errorcode=error.code;
      var errormessage=error.message;
      return alert(errormessage)
    })
    db.collection('Users').add({
      first_name:this.state.firstname,
      last_name:this.state.lastname,
      mobile_number:this.state.contact,
      username:this.state.emailId,
      address:this.state.address
    })
  }
}
  userLogin=(emailId,password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId,password)
    .then(()=>{
     this.props.navigation.navigate('Donate')
    })
    .catch(function(error){
      var errorcode=error.code;
      var errormessage=error.message;
      return alert(errormessage)
    })
  }
  render(){
  return (
 <View>
   
   <View>
  <View>{this.showModal()}</View>

   <Text>BookSanta</Text>
   </View>
   <View>
     <TextInput
     placeholder='Email Address'
    keyboardType='email-address'
    onChangeText={(Text)=>{
      this.setState({
        emailId:Text
      })
    }}
     ></TextInput>
     <TextInput
     placeholder='Password'
    secureTextEntry={true}
    onChangeText={(Text)=>{
      this.setState({
        password:Text
      })
    }}
     ></TextInput>
     <TouchableOpacity
     onPress={()=>{
       this.userLogin(this.state.emailId,this.state.password)
     }}
     ><Text>Login</Text></TouchableOpacity>
      <TouchableOpacity
     onPress={()=>{
      this.userSignup(this.state.emailId,this.state.password)
    }}
     ><Text>Sign-Up</Text></TouchableOpacity>
   </View>
 </View>
  );
}
}
