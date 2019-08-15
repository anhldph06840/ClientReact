import React,{useEffect,useState} from 'react';
import { ScrollView,TouchableOpacity, StyleSheet,Button,Platform,Text ,View,Alert,FlatList ,Image} from 'react-native';
import axios from 'axios';

export default function BillScreen(props) {
  const[listbill,setListbill]=useState()


  var avatar=props.navigation.getParam('avatar', 'NO-NAME');
  var username=props.navigation.getParam('username', 'NO-NAME');
  var email=props.navigation.getParam('email', 'NO-NAME');


// lấy Thông tin email đã đặt hàng
  async function  getBillWithEmail() {
    const result = await axios(
      'https://tuan-nodejs.herokuapp.com/bill/detail?email='+email,
    );
    console.log(result.data)
    setListbill(result.data);
  }
  useEffect(()=>{
    getBillWithEmail()
  },[])

  //deleitem
  async function deleteBill(id){
  
      const result = await axios(
        'https://tuan-nodejs.herokuapp.com/bill/delete?id='+id,
      );
  getBillWithEmail()
  }
  return (
  
       <View  style={{flex:1,backgroundColor:'#fff1`'}}>
<View style={{width:'100%',height:'25%',justifyContent:'center',marginTop:80,alignItems:'center'}}>
     <Image style={{height:'100%',width:'30%',borderRadius:30}} source={{uri:avatar}}></Image>
     <Text style={{marginTop:10}}>Xin chào {username}</Text>
  
     <Text style={{marginTop:10}}>Hóa đơn của bạn</Text>
     <View style={{marginTop:10,height:0.5,backgroundColor:'#ccc'}}/>
     </View>
     <FlatList 
  contentContainerStyle={{
    width:'100%',
   marginTop:40
}}

data={listbill}
renderItem={({item}) =>
<View  style={{flexDirection:'column'}}>
<View style={{flexDirection:'row',marginTop:10,alignContent:'center'}}>
  <Image style={{width:80,height:90}} source={{uri:item.url}}></Image>
  <View style={{flexDirection:'column',justifyContent:'center'}}>
  <Text> Sản phẩm {item.nameproduct} </Text>
  <Text> Tổng tiền {item.sumprice} </Text>
  <Text> Địa chỉ {item.address} </Text>
  <Text> Trạng thái {item.status} </Text>
  <Text> Hình thức thanh toán {item.payment} </Text>
  <Text> Thời gian đặt {item.datebuy} </Text>

  </View >

<View style={{height:'100%',width:Platform.OS==='ios'?'10%':'7%',flexDirection:'row-reverse'}}>
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
          onPress: () =>  { deleteBill(item._id)}
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
keyExtractor={item => item._id}
/>

          </View>
     
  
  );
}

BillScreen.navigationOptions = {
  title: 'Bill',
};
