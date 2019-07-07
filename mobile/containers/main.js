import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import {default as Feed} from 'mobile/containers/feed';
import {default as Notifications} from 'mobile/components/notifications';
import {default as Settings} from 'mobile/containers/settings';


const MainNavigator = createBottomTabNavigator({
  feed: Feed,
  notifications: Notifications,
  settings: Settings
});

export default createAppContainer(MainNavigator);
