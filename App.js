import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import SettingScreen from "./screens/SettingScreen";
import QuakeLatestScreen from "./screens/QuakeLatestScreen";
import QuakeMagnitude5Screen from "./screens/QuakeMagnitude5Screen";
import QuakeDirasakanScreen from "./screens/QuakeDirasakanScreen";
import QuakeDetailScreen from "./screens/QuakeDetailScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from "./screens/OnboardingScreen";
import AppLoading from "expo-app-loading";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

export default function App() {
  const [firstOpenApp, setFirstOpenApp] = useState(null);
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  });
  function firstInstall() {
    AsyncStorage.getItem("FirstOpenApp").then((res) => setFirstOpenApp(res));
  }
  if (firstOpenApp == null) {
    firstInstall();
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {firstOpenApp == null ? (
          <Stack.Screen name="Onboarding" options={{ headerShown: false }}>
            {(props) => (
              <OnboardingScreen
                {...props}
                firstInstall={(prop) => firstInstall(prop)}
              />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="HomeTab"
              component={HomeTab}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="QuakeDetail" component={QuakeDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeTab() {
  return (
    <BottomTab.Navigator screenOptions={{ tabBarStyle: { paddingBottom: 4 } }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Cuaca",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cloud-outline" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="QuakeStack"
        component={QuakeStack}
        options={{
          headerTitle: "Gempa",
          tabBarLabel: "Gempa",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pulse" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function QuakeStack() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "#333",
        },
      }}
    >
      <TopTab.Screen
        name="QuakeLatest"
        component={QuakeLatestScreen}
        options={{ tabBarLabel: "Terbaru" }}
      />
      <TopTab.Screen
        name="QuakeMagnitude"
        component={QuakeMagnitude5Screen}
        options={{ tabBarLabel: "Magnitudo 5+" }}
      />
      <TopTab.Screen
        name="QuakeDirasakan"
        component={QuakeDirasakanScreen}
        options={{ tabBarLabel: "Dirasakan" }}
      />
    </TopTab.Navigator>
  );
}
