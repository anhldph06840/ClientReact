
import React,{useEffect,useState} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,TextInput,Alert,
  Text,Image,
  View,FlatList,Picker, RefreshControl,TouchableOpacity,KeyboardAvoidingView ,

} from 'react-native';
const db = SQLite.openDatabase("db.db");
import { SQLite } from "expo-sqlite";
import Spinner from 'react-native-loading-spinner-overlay';


export default function BuyScreen(props)  {
  const[fullname,setFullname]=useState()
  const[email,setEmail]=useState()
  const[numberphone,setNumberphone]=useState()
  const[address,setAddress]=useState()
    const[valuepik,setValuepik]=useState()
    const [load,setLoad]=useState(false)




    var id=props.navigation.getParam('id', 'NO-NAME');
    var name=props.navigation.getParam('name', 'NO-NAME');
    var price=props.navigation.getParam('price', 'NO-NAME');
    var sl=props.navigation.getParam('sl', 'NO-NAME');
    var url=props.navigation.getParam('url', 'NO-NAME');

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
   var  time='lúc'+hours + ' giờ :' + min +' phút -'+date + '/' + month + '/' + year 



  function delteteProduct(id){
    db.transaction(
      tx => {
        tx.executeSql(`delete from carta where id = ?;`, [id]);
      },
    )
  }


function showwaring(text){
  Alert.alert(text)
  
}

  async function pushBuy(){
  if(valuepik==null){
    showwaring('Vui lòng chọn một màu')
 
   
  }else if(fullname==undefined){
      showwaring('không để trống email')
    
     
  }else if(numberphone==undefined){
showwaring('không để trống sđt')
return false;
  }else if(email==undefined){
      showwaring('khống email')
  
  }
  else if(address==undefined){
    showwaring('không để trống address')
  
  }else{
 setLoad(true)
      
    let details = {
      nameproduct:name,
      sumprice:price*sl,
      color:valuepik,
      fullname:fullname,
      email:email,
      numberphone:numberphone,
      address:address,
      status: 'Đặt hàng thành công',
      payment:'Thanh toán tại nhà',
      datebuy:time,
      url:url
  };

  let formBody = [];

  for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
    fetch('https://tuan-nodejs.herokuapp.com/bill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: formBody,
    }).then((response) =>{  setLoad(false)
      setLoad(false)
      buysucsses()
  })
     .then((responseData) => {})
     .catch((err) => { console.log(err); });

  }

  
    
  }
  function buysucsses(){
    delteteProduct(id)
    props.navigation.navigate('Cart');
   
 
  }
          return(
            <KeyboardAvoidingView style={{flex:1}}  behavior='height' >
              <Spinner visible={load}
color='blue'

></Spinner>
            <View style={{flex:1,backgroundColor:'#fff'}}>
               
              <ScrollView style={{flex:1}}>
                <View style={{width:'100%', alignItems:'center'}}>
                <Text style={{marginTop:10}}>Sản phẩm :{name}</Text>
                <Text style={{marginTop:10}}>Số lượng :{sl}</Text>
                <Text style={{marginTop:10}}>Đơn giá :{price}</Text>
                <Picker
       selectedValue={valuepik}
    style={{height: 30, width: 200,fontSize:18,marginBottom:Platform.OS==='ios'?60:0}}
    onValueChange={(itemValue, itemIndex) =>
    setValuepik(itemValue)
  }>
      <Picker.Item label="Chọn một màu" />
     <Picker.Item label="xanh" value="xanh" />
     <Picker.Item label="đỏ" value="đỏ" />
     <Picker.Item label="vàng" value="vàng" />
     </Picker>
        <TextInput value={fullname}   onChangeText={(text) => setFullname(text)}  style={{marginTop:100, width:'70%', borderColor: 'gray', borderWidth: 1,
      height: 50}}   placeholder='Tên người mua'></TextInput>
      
        <TextInput keyboardType='numeric'  onChangeText={(text) => setNumberphone(text)}  style={styles.textinput}  placeholder='số điện thoại' ></TextInput>
          
         <TextInput onChangeText={(text) => setEmail(text.toLocaleLowerCase())}   style={styles.textinput}  placeholder='Email' ></TextInput>
              
          <TextInput onChangeText={(text) => setAddress(text)}  style={styles.textinput} placeholder='Địa chỉ' ></TextInput>
        
          <Text style={{marginTop:10,fontWeight:'bold',fontSize:20}}>Thành Tiền :{sl*price}</Text>
             
            </View>
            </ScrollView>
            <TouchableOpacity style={{width:'100%',alignItems:'center' }}
              
              onPress={()=>{
                Alert.alert(
                  '',
                  ' Bạn có muốn mua không ?',
                  [
                      
                      {
                          text: 'Cancel',
                          style: 'cancel',
                      }, {
                          text: 'OK',
                          onPress: () =>  {  pushBuy()}
                      }
                  ]
                )

                 

              }}
              
              >
                  <Text style={styles.textbtn}>Hoàn Tất</Text>
        
            </TouchableOpacity>
           
           </View>
           </KeyboardAvoidingView>
          );

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: '#fff',
    },
    textbtn:{
        textAlignVertical:'center'
        ,textAlign:'center',backgroundColor:'red',
        color:'#fff',height:55,width:'90%',fontSize:20,
        paddingTop:Platform.OS==='ios'?20:0,marginTop:20
    },textinput:{
      width:'70%', borderColor: 'gray', borderWidth: 1,
      height: 50,marginTop:4
    }
  });


