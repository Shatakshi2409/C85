import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import {DrawerItems} from 'react-navigation-drawer' 
import firebase from 'firebase'
export default class CustomSideBarMenu extends components{
    render(){
        return(
            <View><View>
                <DrawerItems {...this.props}></DrawerItems>
                </View>
                <View>
                    <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate('WelcomeScreen')
                        firebase.auth().signOut()
                    }}

                    ><Text>Logout</Text></TouchableOpacity>
                </View>
                </View>
        )
    }
}