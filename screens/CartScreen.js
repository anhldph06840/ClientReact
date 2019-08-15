
import React,{useEffect,useState,} from 'react';
import { ScrollView, StyleSheet,FlatList,View,TextInput,TouchableOpacity,Platform ,Alert ,Image,Text,Button} from 'react-native';
import NumericInput from 'react-native-numeric-input'
import { ExpoLinksView } from '@expo/samples';
const db = SQLite.openDatabase("db.db");
import { SQLite } from "expo-sqlite";
export default function CartScreen (props) {
  const[listcart,setListCart]=useState()





useEffect(()=>{
  show()
})


  async function show() {


    db.transaction(
      tx => {
       
        tx.executeSql("select * from carta", [], (_, { rows:{_array} }) =>
  setListCart(_array)       
         
        );
      },
      null,
    
    );

  }
  function delteteProduct(id){
    db.transaction(
      tx => {
        tx.executeSql(`delete from carta where id = ?;`, [id]);
      },
    ),show()
  }
 
function update(id,value){
  db.transaction(
    tx => {
      tx.executeSql(`update carta set sl = ${value} where id = ?;`, [id]);
    },
 
  ), show()
}
function buy(name,price,sl,id,url){
props.navigation.navigate('Buys',{name:name,price:price,sl:sl,id:id,url:url})
}
  return (
    <ScrollView style={styles.container}>
    <FlatList 
  contentContainerStyle={{
 
   marginTop:5
}}

data={listcart}
renderItem={({item}) =>
<View  style={{flexDirection:'column', }}>
<View style={{flexDirection:'row',marginTop:4}}>
  <Image style={{width:80,height:60}} source={{uri:item.url}}></Image>
  <View style={{flexDirection:'column',justifyContent:'center'}}>
  <Text> {item.name} </Text>
  <Text style={{fontWeight:'bold'}}> {item.price} đ </Text>
  <View style={{flexDirection:'row' ,justifyContent:'center',marginTop:2}}> 
  <Text style={{textAlign:'center',paddingTop:9}}>Sô lượng:</Text>
  <NumericInput  minValue={1} totalWidth={100}  totalHeight={35} value={item.sl} onChange={value => { update(item.id,value)}} />
  {/* <TouchableOpacity  onPress={()=>{
buy(item.name,item.price,item.sl,item.id,item.url)
}}>
  <Text style={{width:80,height:35,backgroundColor:'blue',textAlign:'center',textAlignVertical:'center',paddingTop:Platform.OS==='ios'?10:0,color:'#fff'}}>Đặt Mua</Text>
</TouchableOpacity> */}
  </View>
 
  </View >

<View style={{height:'100%',width:Platform.OS==='ios'?'20%':'10%',flexDirection:'row-reverse'}}>
  <TouchableOpacity onPress={()=>{

Alert.alert(
  '',
  'bạn muốn xóa không ?',
  [
      
      {
          text: 'Cancel',
          style: 'cancel',
      }, {
          text: 'OK',
          onPress: () =>  {  delteteProduct(item.id)}
      }
  ]
)
  
  }}>
  <Image style={{width:30,height:30}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/test-8ca79.appspot.com/o/icon%2Fdeletex.png?alt=media&token=beba72ed-607e-4dfe-8d6d-1437ef4cab74'}}></Image>
  </TouchableOpacity>
  </View>
</View>
<View style={{backgroundColor:'gray',marginTop:5,height:0.4}}/>
</View>
}
keyExtractor={item =>String( item.id)}
/>
<TouchableOpacity  onPress={()=>{
     Alert.alert(
      '',
      'Xác nhận đặt mua',
      [
          
          {
              text: 'Cancel',
              style: 'cancel',
          }, {
              text: 'OK',
              onPress: () => props.navigation.navigate('Home')
              //  {  delteteProduct(item.id)}
          }
      ]
    )

      }}>
        <Text style={{width:80,height:35,backgroundColor:'blue',textAlign:'center',textAlignVertical:'center',paddingTop:Platform.OS==='ios'?10:0,color:'#fff'}}>Đặt Mua</Text>
      </TouchableOpacity>
    </ScrollView>
   
  );
}

CartScreen.navigationOptions = {
  title: 'Giỏ hàng',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
