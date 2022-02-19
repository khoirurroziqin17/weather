import React from "react";
import { StyleSheet, Text, View, LogBox } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HeaderBar({
  leftIonicons,
  text,
  rightIonicons,
  navigation,
  getLocalData,
}) {
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  return (
    <View style={styles.container}>
      {leftIonicons ? (
        <Ionicons
          name={leftIonicons}
          size={24}
          onPress={() => navigation.navigate("Search")}
        />
      ) : (
        <View />
      )}
      <Text style={styles.location}>{text}</Text>
      {rightIonicons ? (
        <Ionicons
          name={rightIonicons}
          size={24}
          onPress={() => navigation.navigate("Setting", { getLocalData })}
        />
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    marginHorizontal: 16,
  },
  location: {
    fontFamily: "Roboto_700Bold",
    fontSize: 17,
    color: "#322e5a",
  },
});
