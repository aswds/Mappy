import { DarkTheme } from "@react-navigation/native";
import { SWITCH_THEME } from "../constans";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { theme } from "../../components/theme";
const isDarkTheme = () => {
  const [themeIsDark, setThemeisDark] = useState();
  useEffect(() => {
    AsyncStorage.getItem("isDark").then((value) => {
      setThemeisDark(value);
    });
  }, [themeIsDark]);
  return themeIsDark;
};
const intialState = {
  theme: isDarkTheme ? DarkTheme : theme,
};

export const themeReducer = (state = intialState, action) => {
  switch (action.type) {
    case SWITCH_THEME:
      return { ...state, theme: action.theme };
    default:
      return state;
  }
};
