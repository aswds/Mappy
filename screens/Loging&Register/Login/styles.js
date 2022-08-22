import { Dimensions, StyleSheet } from "react-native";
import { actuatedNormalize } from "../../../components/actuaterNormalize";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    height: "25%",
    alignItems: "center",
  },
  registerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  errorMsg: {
    color: "red",
  },
  loginContainer: {
    width: Dimensions.get("window").width / 1,
    // backgroundColor: "yellow",
    height: Dimensions.get("window").height * 0.25,
    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    alignItems: "center",
    paddingBottom: 20,
    marginBottom: 30,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    fontVariant: ["small-caps"],
  },
  imageStyle: {
    flex: 1,
    overflow: "hidden",
  },
  innerText: {
    alignItems: "center",
  },
  textStyle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  userInput: {
    flexDirection: "row",
    backgroundColor: "#E2E2E2",
    marginTop: 30,
    width: "85%",
    height: actuatedNormalize(55),
    justifyContent: "flex-start",
    paddingLeft: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  inputField: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
    justifyContent: "center",
  },
  linearGradientStyle: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "#121212",
  },
  imageContainer: {
    height: 90,
    width: 85,
    shadowOpacity: 0.4,
    shadowOffset: { height: 2, width: 0 },
  },
  animationStyle: {
    alignItems: "flex-start",
    width: Dimensions.get("window").width / 1.6,
    height: 20,
    marginVertical: 5,
  },
  styledButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
    alignSelf: "center",
    paddingVertical: 30,
    width: "85%",
  },
  styledButton: {
    height: actuatedNormalize(50),
    marginTop: 20,
    backgroundColor: "grey",
    borderRadius: 10,
  },
});
