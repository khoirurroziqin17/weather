import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function SearchScreen({ navigation }) {
  const inputRef = useRef();
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);

  const search = (input) => {
    fetch(
      `https://dataservice.accuweather.com/locations/v1/cities/search?q=${input}&apikey=q9dD5FdOpfToD7evYdWWUwHcOOWwJrTC&language=id-id`
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.searchContainer}>
        <TextInput
          ref={inputRef}
          style={styles.inputText}
          placeholder="Cari kota"
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={() => search(input)}
        />
        <Ionicons name="close" size={24} onPress={() => setInput("")} />
      </View>
      {data &&
        (data.length === 0 ? (
          <View style={styles.notFound}>
            <Text>Lokasi tidak ditemukan</Text>
          </View>
        ) : (
          <ScrollView style={styles.listItem}>
            {data.map((item) => (
              <ItemData key={item.Key} item={item} navigation={navigation} />
            ))}
          </ScrollView>
        ))}
    </View>
  );
}

function ItemData({ item, navigation }) {
  const keyword = item.LocalizedName;
  const province = item.AdministrativeArea.LocalizedName;
  const cityObject = item.SupplementalAdminAreas.filter(
    (item) => item.Level == 2
  );
  let city = "";

  if (cityObject.length > 0) {
    city = cityObject[0]?.LocalizedName + ", ";
  }

  const selectItem = async (value) => {
    try {
      await AsyncStorage.setItem("LocId", value);
      navigation.navigate("Home", { keyID: value });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => selectItem(item.Key)}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.itemKey}>{item.Key}</Text>
        <Text
          style={styles.itemLocation}
        >{`${keyword}, ${city}${province}`}</Text>
      </View>
      <View style={styles.itemPosition}>
        <Ionicons name="locate" size={14} color="gray" />
        <Text
          style={styles.geoPosition}
        >{`${item.GeoPosition.Latitude}, ${item.GeoPosition.Longitude}`}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  inputText: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 8,
  },
  listItem: {
    marginHorizontal: 12,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingBottom: 8,
    paddingTop: 12,
    paddingHorizontal: 4,
  },
  itemKey: {
    fontFamily: "Roboto_500Medium",
    fontSize: 13,
  },
  itemLocation: {
    fontSize: 15,
  },
  itemPosition: {
    flexDirection: "row",
    alignItems: "center",
  },
  geoPosition: {
    marginLeft: 4,
  },
  notFound: {
    alignItems: "center",
    paddingTop: 16,
  },
});
