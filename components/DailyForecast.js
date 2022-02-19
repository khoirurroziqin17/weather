import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import useFahrenheitToCelcius from "../utils/useFahrenheitToCelcius";
import weatherIcon from "../utils/weatherIcon";

export default function DailyForecast({ data, tempUnit }) {
  const items = data && data.DailyForecasts;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ramalan Cuaca 3 Hari</Text>
      {items &&
        items.map((item) => (
          <ForecastItem key={item.EpochDate} data={item} tempUnit={tempUnit} />
        ))}
    </View>
  );
}

function ForecastItem({ data, tempUnit }) {
  const listDay = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
  ];
  const listMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Ags",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const tminF = data.Temperature.Minimum.Value;
  const tmaxF = data.Temperature.Maximum.Value;
  const tmin = useFahrenheitToCelcius(tminF);
  const tmax = useFahrenheitToCelcius(tmaxF);
  const day = new Date(data.Date).getDay();
  const date = new Date(data.Date).getDate();
  const month = new Date(data.Date).getMonth();

  return (
    <View style={styles.forecastItem}>
      <Text
        style={styles.date}
      >{`${listDay[day]} · ${date} ${listMonth[month]}`}</Text>
      <Text style={styles.temp}>
        {tempUnit == "Metric"
          ? tmin + "-" + tmax + " °C"
          : tminF + "-" + tmaxF + " °F"}
      </Text>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: weatherIcon(data.Day.Icon),
          }}
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    color: "#322e5a",
    paddingBottom: 2,
  },
  forecastItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 6,
    borderRadius: 6,
    backgroundColor: "skyblue",
  },
  date: {
    flex: 1,
    fontFamily: "Roboto_400Regular",
    fontSize: 15,
    color: "#333",
  },
  temp: {
    flex: 1,
    fontFamily: "Roboto_500Medium",
    textAlign: "center",
    fontSize: 18,
    color: "#333",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 48,
    height: 48,
  },
});
