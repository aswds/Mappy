import TicketsScreen from "../../screens/TicketsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const TicketNav = createNativeStackNavigator();

export const TicketStack = (props) => {
  return (
    <TicketNav.Navigator>
      <TicketNav.Screen
        component={TicketsScreen}
        name="TicketsStack"
        options={{ headerShown: false }}
      />
    </TicketNav.Navigator>
  );
};
