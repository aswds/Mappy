import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet } from "react-native";
import { DarkTheme } from "@react-navigation/native";
import { theme as DefaultTheme } from "../components/theme";
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(DefaultTheme);
  const [isLoadingTheme, setIsLoadingTheme] = useState(true);

  const findOldTheme = async () => {
    const themeIsDark = await AsyncStorage.getItem("isDark");
    if (themeIsDark !== null) {
      setTheme(themeIsDark === "true" ? DarkTheme : DefaultTheme);
      setIsLoadingTheme(false);
    }
    setIsLoadingTheme(false);
  };

  useEffect(() => {
    findOldTheme();
  }, []);

  const updateTheme = (currentThemeMode) => {
    const newTheme = currentThemeMode.dark ? DarkTheme : DefaultTheme;
    setTheme(newTheme);
    AsyncStorage.setItem("isDark", JSON.stringify(newTheme.dark));
  };

  return (
    <ThemeContext.Provider value={{ theme, isLoadingTheme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

const styles = StyleSheet.create({
  container: {},
});

export default ThemeProvider;
