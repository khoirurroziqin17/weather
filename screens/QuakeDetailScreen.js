import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import QuakeDetail from "../components/QuakeDetail";

export default function QuakeDetailScreen({ route }) {
  return (
    <View style={styles.container}>
      <QuakeDetail data={route.params.data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
  },
});
