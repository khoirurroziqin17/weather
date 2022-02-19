import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const window = Dimensions.get("window");

export default function QuakeDetail({ data }) {
  let jangkauan;

  if (data.Dirasakan) {
    jangkauan = data.Dirasakan.split(",");
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {data?.Shakemap && (
        <Image
          source={{
            uri: `https://data.bmkg.go.id/DataMKG/TEWS/${data.Shakemap}`,
          }}
          style={styles.image}
        />
      )}
      <View style={styles.flexContainer}>
        <View style={styles.flexItem}>
          <Ionicons name="calendar-sharp" size={20} />
          <Text style={styles.itemText}>{data.Tanggal}</Text>
        </View>
        <View style={styles.flexItem}>
          <Ionicons name="time-outline" size={20} />
          <Text style={styles.itemText}>{data.Jam}</Text>
        </View>
      </View>
      <View style={styles.flexContainer}>
        <View style={styles.flexItem}>
          <Ionicons name="locate" size={20} color="#33f" />
          <View>
            <Text style={styles.itemText}>{data.Lintang}</Text>
            <Text style={styles.itemText}>{data.Bujur}</Text>
          </View>
        </View>
        <View style={styles.flexItem}>
          <Ionicons name="pulse" size={20} color="#f55" />
          <View>
            <Text style={styles.itemTitle}>Magnitude</Text>
            <Text style={[styles.itemText, { fontSize: 16 }]}>
              {data.Magnitude}
            </Text>
          </View>
        </View>
        <View style={styles.flexItem}>
          <Image
            source={{
              uri: "https://www.bmkg.go.id/asset/img/gempabumi/kedalaman.png",
            }}
            style={{ width: 20, height: 20 }}
          />
          <View>
            <Text style={styles.itemTitle}>Kedalaman</Text>
            <Text style={[styles.itemText, { fontSize: 16 }]}>
              {data.Kedalaman}
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.flexDesc, { marginTop: 16 }]}>
        <Text style={styles.descText}>Wilayah</Text>
        <Text style={styles.wilayahText}>{data.Wilayah}</Text>
      </View>
      {data?.Potensi && (
        <View style={[styles.flexDesc, { marginTop: 16 }]}>
          <Text style={styles.descText}>Potensi</Text>
          <Text style={styles.wilayahText}>{data.Potensi}</Text>
        </View>
      )}
      {jangkauan && (
        <View style={styles.flexDesc}>
          <Text style={styles.descText}>Dirasakan</Text>
          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
            {jangkauan.map((item, index) => (
              <Text key={index} style={styles.jangkauan}>
                {item}
              </Text>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: { width: "100%", height: window.width, resizeMode: "contain" },
  flexContainer: { flexDirection: "row" },
  flexItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 8,
    margin: 4,
    borderRadius: 6,
  },
  itemText: {
    fontFamily: "Roboto_500Medium",
    marginLeft: 8,
  },
  itemTitle: {
    fontSize: 11,
    marginLeft: 8,
  },
  flexDesc: {
    flexDirection: "row",
    margin: 8,
  },
  descText: {
    width: 80,
  },
  wilayahText: {
    flex: 1,
    fontFamily: "Roboto_500Medium",
    fontSize: 15,
  },
  jangkauan: {
    fontFamily: "Roboto_500Medium",
    backgroundColor: "orange",
    color: "white",
    paddingHorizontal: 6,
    paddingVertical: 1,
    marginRight: 4,
    marginBottom: 4,
    borderRadius: 4,
  },
});
