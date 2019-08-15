
import React,{useEffect,useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,FlatList, RefreshControl,TouchableOpacity

} from 'react-native';



export default function FlatListsearch(props)  {

          return(
            <View style={{width:'50%',height:200,backgroundColor:'#fff'}}>
                <View style={{alignItems:'center'}}>
                <Image style={{width:'90%',height:'80%'}} source={{uri:props.image}}></Image>
                <Text>{props.name}</Text>
                </View>
          </View>
          );

}



