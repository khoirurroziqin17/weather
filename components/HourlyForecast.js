import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import weatherIcon from "../utils/weatherIcon";

export default function HourlyForecast({ data, tempUnit }) {
  const items = data != null && data;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cuaca Hari Ini</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.listForecast}
      >
        {items.length > 0 &&
          items.map((item) => (
            <ForecastBox
              key={item.EpochDateTime}
              item={item}
              tempUnit={tempUnit}
            />
          ))}
        <View style={{ marginRight: 24 }} />
      </ScrollView>
    </View>
  );
}

function ForecastBox({ item, tempUnit }) {
  const time = new Date(item.DateTime);
  const temp = Math.round(((item.Temperature.Value - 32) * 5) / 9);

  return (
    <View style={styles.forecastBox}>
      <Text style={styles.time}>{time.getHours()}.00</Text>
      <Image
        style={styles.image}
        source={{ uri: weatherIcon(item.WeatherIcon) }}
      />
      <Text style={styles.temp}>
        {tempUnit == "Metric" ? temp + " °C" : item.Temperature.Value + " °F"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  title: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    color: "#322e5a",
    marginHorizontal: 16,
  },
  listForecast: {
    marginTop: 8,
    paddingLeft: 16,
  },
  forecastBox: {
    alignItems: "center",
    backgroundColor: "#39cbf7",
    padding: 6,
    marginRight: 12,
    borderRadius: 4,
    width: 80,
  },
  time: {
    fontFamily: "Roboto_500Medium",
    color: "#eee",
  },
  image: {
    width: 36,
    height: 36,
    marginVertical: 4,
  },
  temp: {
    fontFamily: "Roboto_500Medium",
    color: "white",
    fontSize: 16,
  },
});
