
import React,{useEffect,useState} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,Image,
  View,FlatList, RefreshControl,TouchableOpacity

} from 'react-native';

import { ActivityIndicator } from 'react-native';


export default function FlatListHorizontal(props)  {

          return(
            <View style={{margin:5, height: 170,width: 100,backgroundColor:'#fff', alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity style={{ alignItems:'center',justifyContent:'center',height: 150,width: 100,}} onPress={()=> 
         props.pr.navigation.navigate('DetailProduct',{name:props.name,price:props.price,url:props.url,description:props.description})
              }>

            <Image   source = { props.load
          ? 
          { uri: props.url } 
          : 
           require('../assets/images/default.png')} style = {{height:'80%', width: '90%', resizeMode : 'stretch'} } 
                
          style = {{height: '80%', width: '90%', } }>
            </Image>

            <Text style={{textAlign:'center'}}>{props.name}</Text>
            <Text style={{textAlign:'center'}}>{props.price} đ</Text>
            </TouchableOpacity>
           </View>
          );

}



