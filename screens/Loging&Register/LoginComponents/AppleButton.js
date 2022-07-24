import * as AppleAuthentication from "expo-apple-authentication";

export function AppleButton() {
  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={5}
      style={{ width: 250, height: 40, justifyContent: "flex-start" }}
      onPress={async () => {
        try {
          const credential = await AppleAuthentication.signInAsync({
            requstedOperations:
              AppleAuthentication.AppleAuthenticationOperation.LOGIN,
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            ],
          });
          // signed in
        } catch (e) {
          console.log(e);
          if (e.code === "ERR_CANCELED") {
            // handle that the user canceled the sign-in flow
          } else {
            // handle other errors
          }
        }
      }}
    />
  );
}
