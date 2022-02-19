import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import weatherIcon from "../utils/weatherIcon";

export default function MainHome({ data, tempUnit, speedUnit }) {
  const item = data && data[0];

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Image
          source={{ uri: weatherIcon(item?.WeatherIcon) }}
          style={styles.image}
        />
        <View style={styles.mainInfo}>
          <Text style={styles.weather}>{item?.WeatherText}</Text>
          <Text style={styles.temp}>
            {tempUnit == "Metric"
              ? item?.Temperature?.Metric?.Value + "°C"
              : item?.Temperature?.Imperial?.Value + "°F"}
          </Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.details}>
          <Image
            source={require("../assets/images/wind.png")}
            style={styles.detailIcon}
          />
          <View>
            <Text style={styles.windDirec}>
              {item?.Wind?.Direction?.Degrees}°
            </Text>
            <Text style={styles.windSpeed}>
              {speedUnit == "Metric"
                ? item?.Wind?.Speed?.Metric?.Value + "km/h"
                : item?.Wind?.Speed?.Imperial?.Value + "mi/h"}
            </Text>
          </View>
        </View>
        <View style={styles.details}>
          <Image
            source={require("../assets/images/humidity.png")}
            style={styles.detailIcon}
          />
          <Text style={styles.humi}>{item?.RelativeHumidity}%</Text>
        </View>
        <View style={styles.details}>
          <Image
            source={require("../assets/images/sun.png")}
            style={styles.detailIcon}
          />
          <View>
            <Text style={styles.uvText}>{item?.UVIndexText}</Text>
            <Text style={styles.uvIndex}>{item?.UVIndex}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  mainContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
  },
  image: {
    height: 200,
    width: 200,
  },
  mainInfo: {
    flex: 1,
    justifyContent: "flex-end",
    paddingLeft: 8,
  },
  weather: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    color: "#a39dc2",
  },
  temp: {
    fontFamily: "Roboto_900Black",
    fontSize: 42,
    color: "#2a286b",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 12,
    marginTop: 8,
  },
  details: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingLeft: 6,
  },
  detailIcon: {
    height: 32,
    width: 32,
    marginRight: 6,
  },
  windDirec: {
    fontFamily: "Roboto_400Regular",
  },
  windSpeed: {
    fontFamily: "Roboto_500Medium",
    fontSize: 15,
  },
  humi: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
  },
  uvText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 12,
  },
  uvIndex: {
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});
