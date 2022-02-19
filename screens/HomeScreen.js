import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  StatusBar as NativeBar,
  ScrollView,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderBar from "../components/HeaderBar";
import MainHome from "../components/MainHome";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";

export default function HomeScreen({ navigation, route }) {
  const [locId, setLocId] = useState(null);
  const [tempUnit, setTempUnit] = useState(null);
  const [speedUnit, setSpeedUnit] = useState(null);
  const [location, setLocation] = useState(null);
  const [currentCondition, setCurrentCondition] = useState(null);
  const [forecastHourly, setForecatsHourly] = useState(null);
  const [forecastDaily, setForecatsDaily] = useState(null);

  const getLocalData = async () => {
    try {
      const id = await AsyncStorage.getItem("LocId");
      const temp = await AsyncStorage.getItem("TempUnit");
      const speed = await AsyncStorage.getItem("SpeedUnit");
      if (id || temp || speed) {
        setLocId(id);
        setTempUnit(temp);
        setSpeedUnit(speed);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (route.params) {
    getLocalData();
  }

  async function getFetchData(id) {
    const fetchLocation = await fetch(
      `https://dataservice.accuweather.com/locations/v1/${id}?apikey=q9dD5FdOpfToD7evYdWWUwHcOOWwJrTC&language=id-id`
    );
    const fetchCurrentCondition = fetch(
      `http://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=q9dD5FdOpfToD7evYdWWUwHcOOWwJrTC&language=id-id&details=true`
    );
    const fetchForecastHourly = fetch(
      `https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${id}?apikey=q9dD5FdOpfToD7evYdWWUwHcOOWwJrTC&language=id-id`
    );
    const fetchForecastDaily = fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}?apikey=q9dD5FdOpfToD7evYdWWUwHcOOWwJrTC&language=id-id`
    );
    const promise = await Promise.all([
      fetchLocation,
      fetchCurrentCondition,
      fetchForecastHourly,
      fetchForecastDaily,
    ]);
    const resLocation = await promise[0].json();
    const resCurrentCondition = await promise[1].json();
    const resForecastHourly = await promise[2].json();
    const resForecastDaily = await promise[3].json();

    setLocation(resLocation);
    setCurrentCondition(resCurrentCondition);
    setForecatsHourly(resForecastHourly);
    setForecatsDaily(resForecastDaily);
  }

  useEffect(() => getLocalData(), []);

  useEffect(() => {
    if (locId) getFetchData(locId);
  }, [locId]);

  if (locId == null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#333" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      {location && (
        <>
          <HeaderBar
            navigation={navigation}
            leftIonicons="search"
            rightIonicons="settings-outline"
            text={`${location?.LocalizedName}, ${location?.AdministrativeArea?.LocalizedName}`}
            getLocalData={getLocalData}
          />
          <ScrollView>
            <MainHome
              data={currentCondition}
              tempUnit={tempUnit}
              speedUnit={speedUnit}
            />
            <HourlyForecast data={forecastHourly} tempUnit={tempUnit} />
            <DailyForecast data={forecastDaily} tempUnit={tempUnit} />
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f7fc",
    paddingTop: NativeBar.currentHeight,
  },
});
