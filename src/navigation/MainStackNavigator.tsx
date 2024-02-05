import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FILE_UPLOAD_SCREEN } from "./ScreenNames";

import { FileUpload } from "screens";

const MainStack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <MainStack.Navigator
      initialRouteName={FILE_UPLOAD_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name={FILE_UPLOAD_SCREEN} component={FileUpload} />
    </MainStack.Navigator>
  );
}
