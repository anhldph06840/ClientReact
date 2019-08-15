
import React,{useEffect,useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,FlatList, RefreshControl,TouchableOpacity

} from 'react-native';



export default function FlatListproduct(props)  {

          return(
            <View style={{width:'50%',height:200,backgroundColor:'#fff'}}>
              <TouchableOpacity style={{width:'100%',height:200,backgroundColor:'#fff'}}
              onPress={()=>
         props.pr.navigation.navigate('DetailProduct',{name:props.name,price:props.price,url:props.url,description:props.description})
              
              } >
                <View style={{alignItems:'center'}}>
                <Image style={{width:'90%',height:'80%'}} source={{uri:props.url}}></Image>
                <Text style={{textAlign:'center'}}>{props.name}</Text>
  
                <Text style={{fontWeight:'bold',textAlign:'center'}}>{props.price} đ</Text>
                </View>
                </TouchableOpacity>
          </View>
          );

}



