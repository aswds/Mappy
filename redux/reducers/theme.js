import { DarkTheme } from "@react-navigation/native";
import { theme } from "../../components/theme";
import { SWITCH_THEME } from "../constans";

const intialState = {
  theme: theme,
};

export const themeReducer = (state = intialState, action) => {
  switch (action.type) {
    case SWITCH_THEME:
      return { ...state, theme: action.theme };
    default:
      return state;
  }
};
