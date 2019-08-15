import React from 'react';
import { createAppContainer, createSwitchNavigator,createStackNavigator } from 'react-navigation';
import Detail from '../screens/DetailProduct';

import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(
  createStackNavigator({

    DetailProduct:Detail
  })
);
