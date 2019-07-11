import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import {default as Feed} from './feed';
import {default as Notifications} from '../components/notifications';
import {default as Settings} from './settings';


const MainNavigator = createBottomTabNavigator({
  feed: Feed,
  notifications: Notifications,
  settings: Settings
});

export default createAppContainer(MainNavigator);
