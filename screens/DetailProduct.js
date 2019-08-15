
import React,{useEffect,useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  View,FlatList, RefreshControl

} from 'react-native';
import Constants from "expo-constants";
import { SQLite } from "expo-sqlite";
import axios from 'axios';
const db = SQLite.openDatabase("db.db");
export default function DetailProduct(props)  {
  const [check,setCheck]=useState(true)
  function add(nameid,price,url) {
    create()
 
    db.transaction(
      tx => {
        tx.executeSql("select * from carta where name=? ", [nameid], (_, { rows:{_array} }) =>
         
        {
        if(_array&&_array.length>0){
       Alert.alert('Sản phẩm đã có trong giỏ hàng')
       setCheck(false)
      return false
        }
        addproduct(nameid,price,url) 
        }
        );
      },
     
    );


}
function addproduct(nameid,price,url){
  if(check==true){
    db.transaction(
       tx => {
         tx.executeSql('insert into carta (name,price,url,sl) values (?,?,?,?)', [nameid,price,url,1]);
         tx.executeSql('select * from carta', [], (_, { rows }) =>
         
           {Alert.alert('Sản phẩm đã thêm vào giỏ')
         console.log(rows)
         }
         );
       },
     );
   }
}
  async function create(){
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists carta (id integer primary key not null,  name text,price int,url text,sl int);"
      );
    });
  }

useEffect(()=>{

})
  var url=props.navigation.getParam('url', 'NO-NAME');
  var name=props.navigation.getParam('name', 'NO-NAME');
  var price=props.navigation.getParam('price', 'NO-NAME');
  var description=props.navigation.getParam('description', 'NO-NAME');


          return(
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <ScrollView style={{marginTop:20,height:'90%'}}>
                  <View style={{alignItems:'center'}}>
                <Image style={{width:'80%',height:250,marginTop:30}} source={{uri:url}}></Image>
                <Text style={{fontSize:20}} >{name}</Text>
                <Text style={{fontWeight:'bold',marginTop:10}}>{price} đ</Text>  
                <Text style={{marginTop:10}}>{description}</Text>  
                </View>
                </ScrollView>
                <TouchableOpacity style={{alignItems:'center',justifyContent:'center',borderRadius:10}} onPress={()=>{
                 add(name,price,url)
                }}>
                  <Text style={{backgroundColor:'green',color:'#fff',paddingTop:10,fontSize:18,height:40,width:'100%',textAlign:'center'}} >Thêm vào giỏ</Text>
                </TouchableOpacity>
          </View>
          );

}



