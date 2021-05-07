import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Transactionscreen from './screens/transactionscreen';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

export default function App(){
  return(
    <AppContainer/>
  )
}

const TabNavigator = createBottomTabNavigator({
  Transaction: {screen:Transactionscreen}
})

const AppContainer = createAppContainer(TabNavigator)