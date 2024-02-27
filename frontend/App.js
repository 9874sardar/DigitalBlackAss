import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MyShifts from "./screens/MyShiftScreen";
import AvailableShiftsScreen from "./screens/AvailableShiftsScreen";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  const [activeTab, setActiveTab] = useState("myShifts");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Provider store={store}>

    <View style={styles.container}>
      {activeTab === "myShifts" ? (
        <MyShifts />
        ) : (
          <AvailableShiftsScreen />
          )}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => handleTabChange("myShifts")}
          style={[
            styles.tabButton,
            activeTab === "myShifts" && styles.activeTab,
          ]}
          >
          <Text style={[styles.tabText, activeTab === "myShifts" && styles.activeText]}>My Shifts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabChange("availableShifts")}
          style={[
            styles.tabButton,
            activeTab === "availableShifts" && styles.activeTab,
          ]}
          >
          <Text style={[styles.tabText, activeTab === "availableShifts" && styles.activeText]}>Available Shifts</Text>
        </TouchableOpacity>
      </View>
    </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    padding:10
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    // marginBottom: 20,
  },
  tabButton: {
    padding: 10,
    // borderBottomWidth: 2,
    // borderBottomColor: "#A4B8D3",
  },
  tabText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#A4B8D3",
  },
  activeTab: {
    borderBottomColor: "#004FB4",
  },
  activeText: {
    color: "#004FB4",
  },
});

export default App;
