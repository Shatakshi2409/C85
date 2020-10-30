import React from 'react';
import {View, Text, Animated, Dimensions, StyleSheet, TouchableHighlight} from 'react-native';
import {ListItem,Icon } from 'react-native-elements'
import {SwipeListView} from 'react-native-swipe-list-view'
import db from '../config'
export default class SwipableFlatList extends React.Components{
    constructor(props){
        super(props)
        this.state={
            allNotifications:this.props.allNotifications
        }
    }
    onSwipeValueChange=swipeData=>{
        var allNotifications=this.state.allNotifications
        const {key,value}=swipeData
        if (value<Dimensions.get('window').width){
            const newData=[...allNotifications]
            const prevIndex=allNotifications.findIndex(item=>item.key===key);
            this.updateMarkasRead(allNotifications[prevIndex])
            newData.splice(prevIndex,1);
            this.setState({allNotifications:newData})
        }
    }
    updateMarkasRead=(Notification)=>{
        db.collection('all_notifications').doc(notification.doc_id).update({
            'notification_status': 'read'
        })
    }
    renderItem=data=>(
        <Animated.View>
            <ListItem
            LeftElement={<Icon name='book' type='font-awesome' color='grey'></Icon>}
            title={data.item.book_name}
            subtitle={data.item.message}
            bottomDivider
            ></ListItem>
        </Animated.View>
    )
    renderHiddenItem=()=>{
        <View><Text></Text></View>
    }
    render(){
return(
    <View>
        <SwipeListView 
        disableRightSwipe
        data={this.state.allNotifications}
        renderItem={this.renderItem}
        renderHiddenItem={this.renderHiddenItem}
        rightOpenValue={-Dimensions.get('window').width}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onSwipeValueChange={this.onSwipeValueChange}
        ></SwipeListView>
    </View>
)
    }
}
