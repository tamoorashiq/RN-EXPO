import React, { useState, ReactNode } from "react";
import {
  Dimensions,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet,
  DimensionValue,
  TextInputProps
} from "react-native";
import { Colors, Typography, Mixins } from "../styles";

interface InputProps  extends TextInputProps {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  error?: string;
  iconHighlighted?: ReactNode;
  height?: number;
  selectedBorderColor?: string;
  isMultiLine?: boolean;
  showHeader?: boolean;
  permanentHeader?: boolean;
  iconRightClick?: () => void;
  width?: DimensionValue | undefined;
  headerText?: string;
  value?: string;
  placeholder?: string;
}

const width = Dimensions.get("window").width;

const Input: React.FC<InputProps> = (props) => {
  const {
    iconLeft = null,
    iconRight = null,
    error = "",
    iconHighlighted = null,
    height = Mixins.scaleHeight(50),
    selectedBorderColor = Colors.WHITE,
    isMultiLine = false,
    showHeader = false,
    permanentHeader = false,
    iconRightClick = () => {},
  } = props;

  const large = !props.width ? width / 1.1 : props.width;
  const [isFocused, setIsFocused] = useState(false);

  const headerVisible = () => {
    if (permanentHeader) return true;
    else if (isFocused && showHeader && props.value && props.value.length > 0)
      return true;

    return false;
  };

  return (
    <>
      <View style={[styles.container, { width: large }]}>
        {headerVisible() && (
          <Text style={styles.headerText}>{props.headerText}</Text>
        )}

        <View
          style={[
            styles.inputContainer,
            { borderColor: isFocused ? selectedBorderColor : Colors.GREY },
          ]}
        >
          {!isFocused && iconLeft && (
            <View style={styles.iconContainer}>{iconLeft}</View>
          )}

          {isFocused && iconHighlighted && (
            <View style={styles.iconContainer}>{iconHighlighted}</View>
          )}

          <TextInput
            {...props}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            style={[
              styles.input,
              {
                paddingLeft: iconLeft ? 0 : 8,
                flex: iconLeft ? (iconRight ? 0.6 : 0.8) : 1,
              },
            ]}
            multiline={isMultiLine}
            placeholderTextColor={Colors.DISABLE_TEXT}
          />
          {iconRight && (
            <TouchableOpacity
              onPress={iconRightClick}
              style={styles.iconContainer}
            >
              {iconRight}
            </TouchableOpacity>
          )}
        </View>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Mixins.scaleSize(5),
    marginBottom: Mixins.scaleSize(10),
  },
  headerText: {
    marginLeft: "2%",
    fontSize: Typography.FONT_SIZE_12,
    fontWeight: Typography.FONT_WEIGHT_500,
    color: Colors.WHITE,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    borderBottomWidth: 1,
  },
  iconContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_16,
    fontWeight: Typography.FONT_WEIGHT_400,
    marginVertical: "3%",
    alignSelf: "center",
  },
  errorText: {
    marginVertical: "2%",
    textAlign: "center",
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.RED,
  },
});

export default Input;
