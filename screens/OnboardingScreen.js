import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OnboardingScreen(prop) {
  const startButton = async () => {
    await AsyncStorage.setItem("FirstOpenApp", "true");
    await AsyncStorage.setItem("LocId", "208996");
    await AsyncStorage.setItem("TempUnit", "Metric");
    await AsyncStorage.setItem("SpeedUnit", "Metric");
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image
        source={require("../assets/images/onboard.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Cuaca & GempaBumi</Text>
        <Text style={styles.caption}>
          Tersedia daftar perkiraan cuaca yang bersumber dari Accuweather dan
          gempa bumi dari data BMKG.
        </Text>
      </View>
      <TouchableHighlight
        style={styles.button}
        underlayColor="#023e8a"
        onPress={() => {
          startButton();
          prop.firstInstall();
        }}
      >
        <Text style={styles.buttonText}>Mulai</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#48cae4",
    padding: 16,
  },
  image: {
    width: "70%",
    flex: 1,
    alignSelf: "center",
  },
  textContainer: {
    height: "30%",
  },
  title: {
    fontFamily: "Roboto_700Bold",
    fontSize: 28,
    color: "#03045e",
  },
  caption: {
    color: "#0077b6",
    fontSize: 18,
  },
  button: {
    alignSelf: "center",
    justifyContent: "flex-end",
    backgroundColor: "#0077b6",
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 8,
    marginBottom: 36,
  },
  buttonText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 15,
    color: "white",
  },
});
