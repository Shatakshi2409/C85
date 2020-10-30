import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/myHeader';
import{ListItem} from 'react-native-elements';

export default class BookDonateScreen extends React.Component{
    constructor(){
        super()
        this.state={
            requestedBookList:[]
        }
        this.requestRef=null
    }
getRequestedBookList=()=>{
    this.requestRef=db.collection('requested_books')
    onSnapshot(snapshot=>{
        var requestedBookList=snapshot.docs.map(document=>document.data());
        this.setState({
            requestedBookList:requestedBookList
        })
    })
}
componentDidMount(){
    this.requestedBookList()
}
componentWillUnmount(){
    this.requestRef()
}
keyExtractor=(item,index)=>index.toString()
renderItem=({item,i})=>{
    return(
        <ListItem
        key={i}
        title={item.book_name}
        subtitle={item.reasonToRequest}
        titlestyle={{color:'black',fontWeight:'bold'}}
        rightElement={
            <TouchableOpacity
            onPress={()=>{this.props.navigation.navigate('RecieverDetails',{'details':item})}}
            >
                <Text>View</Text>
            </TouchableOpacity>
        }
        />
    )
}
    render(){
        return(
            <View>
                <MyHeader title='donate books' navigation={this.props.navigation}></MyHeader>
                <View style={{flex:1}}>
            {
                this.state.requestedBookList.length===0
                ?(
                    <View><Text>List Of All Requested Books</Text></View>
                )
                :(
                <FlatList 
                keyExtractor={this.keyExtractor}
                data={this.state.requestedBookList}
                renderItem={this.renderItem}
                ></FlatList>
                    )
            }
                </View>
                </View>
        )
    }
}