import { FontAwesome, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { Icon } from "../model/Icons";
//id, title, type, iconName
const iconSize = 50;
export const ICONS = [
  new Icon(
    "a1",
    "Travel",
    <FontAwesome name="plane" size={iconSize} color="white" />
  ),
  new Icon(
    "a2",
    "Sport",
    <MaterialIcons name="sports-soccer" size={iconSize} color="white" />
  ),
  new Icon(
    "a3",
    "Reading",
    <FontAwesome5 name="book-reader" size={iconSize} color="white" />
  ),
  new Icon(
    "a4",
    "travel",
    <FontAwesome name="plane" size={iconSize} color="white" />
  ),
  new Icon(
    "a5",
    "travel",
    <FontAwesome name="plane" size={iconSize} color="white" />
  ),
];
