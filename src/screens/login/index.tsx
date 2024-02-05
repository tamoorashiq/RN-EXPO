import { StyleSheet, Text, View, SafeAreaView, Alert } from "react-native";
import { login } from "store/auth";
import { useDispatch } from "react-redux";
import { Input, AppIcon, Button } from "components";
import { Colors } from "styles";
import { useState } from "react";
import { isEmailValid } from "utils/validator";
import { unwrapResult } from "@reduxjs/toolkit";
export default function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleLogin = async () => {
    setEmailError("");

    if (!isEmailValid(email)) {
      setEmailError("Enter a valid email");
      return;
    }

    try {
      // Dispatch the login action
      dispatch(login({ email, password }));

      // using this just to show error message other possible way is to handle it through store api call rejection
      setTimeout(() => {
        Alert.alert(
          "Invalid credentials. Please check your email and password."
        );
      }, 1000);

      // If we reach here, the unwrap was successful
    } catch (result) {
      // If the unwrapResult throws an error, catch it here
    } finally {
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
        <AppIcon />
        <Input
          permanentHeader={true}
          onChangeText={(value) => setEmail(value)}
          width={"90%"}
          placeholder="Enter Email"
          headerText="EMAIL"
          showHeader
          error={emailError}
        />
        <Input
          permanentHeader={true}
          onChangeText={(value) => setPassword(value)}
          width={"90%"}
          placeholder="Enter Password"
          headerText="PASSWORD"
          showHeader
          secureTextEntry
        />
      </View>
      <View style={{ marginBottom: "5%" }}>
        <Button
          borderType="outlined"
          bordered={true}
          borderColor={Colors.BLACK}
          disabled={!email || !password}
          onPress={() => handleLogin()}
        >
          Sign In
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.APP_MAIN,
  },
});
