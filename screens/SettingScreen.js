import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingScreen(prop) {
  const [tempUnit, setTempUnit] = useState(null);
  const [speedUnit, setSpeedUnit] = useState(null);
  const [modalTempVisible, setModalTempVisible] = useState(false);
  const [modalSpeedVisible, setModalSpeedVisible] = useState(false);

  const getLocalData = async () => {
    try {
      const temp = await AsyncStorage.getItem("TempUnit");
      const speed = await AsyncStorage.getItem("SpeedUnit");
      if (temp != null || speed != null) {
        setTempUnit(temp);
        setSpeedUnit(speed);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLocalData();
  }, []);

  return (
    <View style={styles.containerSatuan}>
      <Text style={styles.title}>Satuan</Text>
      <View style={styles.divider} />
      <OptionItem
        label="Suhu"
        satuan={tempUnit == "Metric" ? "°C" : "°F"}
        onPress={() => setModalTempVisible(true)}
      />
      <ModalOption
        modalVisible={modalTempVisible}
        onRequestClose={() => setModalTempVisible(!modalTempVisible)}
        onPressOuterModal={() => setModalTempVisible(false)}
      >
        <OptionSelectItem
          label="°C"
          onPress={() => {
            AsyncStorage.setItem("TempUnit", "Metric");
            getLocalData();
            setModalTempVisible(!modalTempVisible);
            prop.route.params.getLocalData();
          }}
          isActive={tempUnit == "Metric" ? true : false}
        />
        <View style={styles.divider} />
        <OptionSelectItem
          label="°F"
          onPress={() => {
            AsyncStorage.setItem("TempUnit", "Imperial");
            getLocalData();
            setModalTempVisible(!modalTempVisible);
            prop.route.params.getLocalData();
          }}
          isActive={tempUnit == "Imperial" ? true : false}
        />
      </ModalOption>
      <View style={styles.divider} />
      <OptionItem
        label="Kecepatan Angin"
        satuan={speedUnit == "Metric" ? "km/h" : "mi/h"}
        onPress={() => setModalSpeedVisible(true)}
      />
      <ModalOption
        modalVisible={modalSpeedVisible}
        onRequestClose={() => setModalSpeedVisible(!modalSpeedVisible)}
        onPressOuterModal={() => setModalSpeedVisible(false)}
      >
        <OptionSelectItem
          label="km/h"
          onPress={() => {
            AsyncStorage.setItem("SpeedUnit", "Metric");
            getLocalData();
            setModalSpeedVisible(!modalSpeedVisible);
            prop.route.params.getLocalData();
          }}
          isActive={speedUnit == "Metric" ? true : false}
        />
        <View style={styles.divider} />
        <OptionSelectItem
          label="mi/h"
          onPress={() => {
            AsyncStorage.setItem("SpeedUnit", "Imperial");
            getLocalData();
            setModalSpeedVisible(!modalSpeedVisible);
            prop.route.params.getLocalData();
          }}
          isActive={speedUnit == "Imperial" ? true : false}
        />
      </ModalOption>
    </View>
  );
}

function OptionItem({ label, satuan, onPress }) {
  return (
    <Pressable
      style={[styles.flex, { justifyContent: "space-between" }]}
      onPress={onPress}
    >
      <Text style={styles.font}>{label}</Text>
      <View style={styles.flex}>
        <Text style={{ ...styles.font, marginRight: 6, color: "#aaa" }}>
          {satuan}
        </Text>
        <Ionicons
          name="chevron-forward"
          size={15}
          color="#aaa"
          style={{ marginTop: 2 }}
        />
      </View>
    </Pressable>
  );
}

const heightScreen = Dimensions.get("screen").height;

function ModalOption({
  modalVisible,
  onRequestClose,
  onPressOuterModal,
  children,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}
    >
      <Pressable style={styles.modalContainer} onPress={onPressOuterModal}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>Modal Title</Text>
          <View style={styles.divider} />
          {children}
          <TouchableHighlight
            onPress={onRequestClose}
            style={{ borderRadius: 8, marginTop: 12 }}
          >
            <View style={styles.modalClose}>
              <Text>Batal</Text>
            </View>
          </TouchableHighlight>
        </View>
      </Pressable>
    </Modal>
  );
}

function OptionSelectItem({ label, onPress, isActive }) {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="#eeee"
      style={{ paddingVertical: 6 }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name="chevron-forward"
          size={15}
          color={isActive ? "black" : "transparent"}
        />

        <Text
          style={{
            fontSize: 15,
            marginLeft: 4,
            color: isActive ? "black" : "#aaa",
          }}
        >
          {label}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  containerSatuan: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 15,
    color: "#999",
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#eee",
    marginVertical: 6,
  },
  font: {
    fontSize: 17,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#3333",
  },
  modalBox: {
    width: "100%",
    maxHeight: heightScreen * 0.4,
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 16,
    paddingBottom: 24,
  },
  modalTitle: {
    fontFamily: "Roboto_500Medium",
    fontSize: 15,
    textAlign: "center",
  },
  modalClose: {
    paddingVertical: 10,
    backgroundColor: "#dddd",
    alignItems: "center",
    borderRadius: 8,
  },
});
