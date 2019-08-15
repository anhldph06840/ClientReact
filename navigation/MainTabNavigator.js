import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import UserScreen from '../screens/UserScreen';
import Detail from '../screens/DetailProduct';
import Search from '../screens/Search';
import BuyScreen from '../screens/BuyScreen';
import BillScreen from '../screens/BillScreen';



const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

 
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,DetailProduct:Detail,Searchproduct:Search
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : ''}`
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const CartStack = createStackNavigator(
  {
    Cart: CartScreen, Buys:BuyScreen
  },
  config
);

CartStack.navigationOptions = {
  tabBarLabel: 'Cart',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'} />
  ),
};

CartStack.path = '';

// const UserStack = createStackNavigator(
//   {
//     Users: UserScreen,Bills:BillScreen
//   },
//   config
// );

// UserStack.navigationOptions = {
//   tabBarLabel: 'User',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'} />
//   ),
// };

// UserScreen.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  CartStack,
  // UserStack,
});

tabNavigator.path = '';

export default tabNavigator;
