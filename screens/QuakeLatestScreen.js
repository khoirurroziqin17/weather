import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import QuakeDetail from "../components/QuakeDetail";

export default function QuakeLatestScreen() {
  const [quakeLatest, setQuakeLatest] = useState(null);

  useEffect(() => {
    fetch("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json")
      .then((res) => res.json())
      .then((data) => setQuakeLatest(data.Infogempa.gempa));
  }, []);

  return (
    quakeLatest && (
      <View style={styles.container}>
        <QuakeDetail data={quakeLatest} />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 8,
  },
});
