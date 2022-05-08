import { TouchableOpacity, View, Text } from "react-native";

export const Buttons = ({ style, textStyle, onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};
