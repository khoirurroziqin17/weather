import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function QuakeMagnitude5Screen({ navigation }) {
  const [quakeMagnitude, setQuakeMagnitude] = useState([]);

  useEffect(() => {
    fetch("https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json")
      .then((res) => res.json())
      .then((data) => setQuakeMagnitude(data.Infogempa.gempa));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.itemChild}>
          <Text>Waktu</Text>
        </View>
        <View style={styles.itemChild}>
          <Text>Koordinat</Text>
        </View>
        <Text style={styles.itemChild}>Magnitudo</Text>
      </View>
      {quakeMagnitude.map((item, index) => (
        <ItemQuake key={index} item={item} navigation={navigation} />
      ))}
    </ScrollView>
  );
}

function ItemQuake({ item, navigation }) {
  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        { borderBottomWidth: 1, borderBottomColor: "#ccc" },
      ]}
      onPress={() => navigation.navigate("QuakeDetail", { data: item })}
    >
      <View style={styles.itemChild}>
        <Text>{item.Tanggal}</Text>
        <Text>{item.Jam}</Text>
      </View>
      <View style={styles.itemChild}>
        <Text>{item.Lintang}</Text>
        <Text>{item.Bujur}</Text>
      </View>
      <Text style={styles.itemChild}>{item.Magnitude}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  itemChild: {
    flex: 1,
  },
});
