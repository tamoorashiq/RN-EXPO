import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { logout } from "store/auth";
import { useDispatch } from "react-redux";
import { Colors, Typography } from "styles";
import { AppIcon, Button } from "components";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "store/uploadSlice";
import { useAppSelector, useAppDispatch } from "./../../hooks";

export default function FileUpload() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const pickAndUplaodImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });
      if (result.assets) {
        const formData: FormData = new FormData();

        const fileData = {
          uri: result?.assets[0]?.uri,
          type: result?.assets[0]?.type || "image/jpg",
          name: result?.assets[0]?.fileName || "file",
        };

        formData.append("file", fileData as unknown as File);

        await dispatch(uploadImage(formData)).unwrap();
      }
    } catch (error) {
      Alert.alert("Something went wrong try again");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
        <AppIcon />
        <Text style={styles.textStyle}>Please upload Image</Text>
      </View>
      <View style={{ marginBottom: "5%" }}>
        <Button
          borderType="outlined"
          bordered={true}
          borderColor={Colors.BLACK}
          backgroundColor={Colors.GREEN}
          onPress={() => pickAndUplaodImage()}
        >
          Send File/Image
        </Button>
      </View>

      <View style={{ marginBottom: "5%" }}>
        <Button
          borderType="outlined"
          bordered={true}
          borderColor={Colors.BLACK}
          backgroundColor={Colors.BLACK}
          onPress={() => handleLogout()}
        >
          Log out
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
  textStyle: {
    marginVertical: "10%",
    color: Colors.GREEN,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    fontSize: Typography.FONT_SIZE_30,
  },
});
