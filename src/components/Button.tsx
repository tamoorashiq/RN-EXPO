import React, { ReactNode } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Typography, Colors, Mixins } from "./../styles";

interface ButtonProps {
  disabled?: boolean;
  btnWidth?: number;
  loading?: boolean;
  loadingColor?: string;
  children?: ReactNode;
  onPress?: () => void;
  type?: "filled" | "outlined";
  borderType?: null | "outlined";
  bordered?: boolean;
  backgroundColor?: string;
  textColor?: string;
  textFontSize?: number;
  textFontWeight?:
    | "400"
    | "500"
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "600"
    | "700"
    | "800"
    | "900"
    | undefined;
  textStyle?: StyleProp<TextStyle> | object | null;
  size?: "large" | "small";
  height?: number;
  borderColor?: string;
  borderedRadius?: number;
}

const width = Dimensions.get("window").width;

const Button: React.FC<ButtonProps> = ({
  disabled = false,
  btnWidth = width / 1.1,
  loading = false,
  loadingColor = Colors.WHITE,
  children,
  onPress,
  type = "filled",
  borderType = null,
  bordered = false,
  backgroundColor = Colors.GREEN,
  textColor = Colors.WHITE,
  textFontSize = Typography.FONT_SIZE_18,
  textFontWeight = Typography.FONT_WEIGHT_500,
  textStyle = null,
  size = "large",
  height = 45,
  borderColor = Colors.BLACK,
  borderedRadius = 10,
}) => {
  const large = btnWidth;
  const small = width / 2;
  const btnSize = size === "large" ? large : small;
  const btnBgColor = type === "filled" ? backgroundColor : "transparent";
  const btnTextColor = type === "filled" ? textColor : Colors.BLACK;
  const btnBorderRadius = bordered ? borderedRadius : 5;

  const containerCommonStyle: StyleProp<ViewStyle> = {
    justifyContent: "center",
    alignItems: "center",
    height: Mixins.scaleHeight(height),
    backgroundColor: disabled ? Colors.GREY : btnBgColor,
    width: btnSize,
    borderRadius: btnBorderRadius,
  };

  const textCommonStyle: StyleProp<TextStyle> = {
    ...textStyle,
    color: disabled ? Colors.WHITE : btnTextColor,
    fontSize: textFontSize,
    textAlign: "center",
    fontWeight: textFontWeight,
  };

  const border: StyleProp<ViewStyle> | undefined = borderType ===
    "outlined" && {
    borderColor: borderColor,
    borderWidth: disabled ? 1 : 1,
  };

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} activeOpacity={0.7}>
      <View style={[containerCommonStyle, border]}>
        {loading ? (
          <ActivityIndicator color={loadingColor} />
        ) : (
          <Text style={[textCommonStyle]}> {children} </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
