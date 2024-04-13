import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CanvasScreen from "./screens/CanvasScreen/CanvasScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar style="auto" hidden={true} />
      <Stack.Navigator initialRouteName="Canvas">
        <Stack.Screen
          name="Canvas"
          component={CanvasScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
