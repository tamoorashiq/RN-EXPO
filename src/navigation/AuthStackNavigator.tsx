import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LOGIN_SCREEN } from "./ScreenNames";

import { Login } from "screens";

const AuthStack = createNativeStackNavigator();

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName={LOGIN_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name={LOGIN_SCREEN} component={Login} />
    </AuthStack.Navigator>
  );
}
