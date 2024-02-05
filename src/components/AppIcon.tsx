import React from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../styles";
import Ionicons from "@expo/vector-icons/Ionicons";

interface InputProps {}

const AppIcon: React.FC<InputProps> = (props) => {
  return (
    <Ionicons
      style={styles.iconStyle}
      name="image"
      size={100}
      color={Colors.GREEN}
    />
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    marginVertical: "10%",
  },
});

export default AppIcon;
