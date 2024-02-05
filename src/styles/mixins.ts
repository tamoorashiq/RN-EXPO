import { Dimensions, PixelRatio } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const WINDOW_WIDTH = Dimensions.get("window").width;
const guidelineBaseWidth = 375;

export const scaleSize = (size: number) =>
  (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const scaleHeight = (size: number) => verticalScale(size);

export const scaleWidth = (size: number) => scale(size);

export const scaleFont = (size: number) => size * PixelRatio.getFontScale();