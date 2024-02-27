import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import { useDispatch } from "react-redux";
import { formatTime, groupShiftsByDate } from "../utils/utils";
import ShiftDateGroup from "./shiftDateGroup";

function AvailableShiftsScreen() {
  const [myShifts, setMyShifts] = useState([]);
  const [activeArea, setActiveArea] = useState("Helsinki");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllRestaurantList = async () => {
      try {
        const res = await axios.get("http://192.168.1.5:8080/shifts");
        console.log("res", res);
        setMyShifts(res.data);
        console.log("Available DATA", res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllRestaurantList();
  }, []);

  const bookShift = async (shiftId) => {
    try {
      const res = await axios.get(
        `http://192.168.1.5:8080/shifts/${shiftId}/book`
      );
      console.log("Shift booked:", res.data);
      dispatch({ type: "BOOK_SHIFT", payload: res.data });
    } catch (err) {
      console.error("Error booking shift:", err);
    }
  };

  const cancelShift = async (shiftId) => {
    try {
      const res = await axios.get(
        `http://192.168.1.5:8080/shifts/${shiftId}/cancel`
      );
      console.log("Shift canceled:", res.data);
      dispatch({ type: "CANCEL_SHIFT", payload: { id: shiftId } });
    } catch (err) {
      console.error("Error cancelling shift:", err);
    }
  };

  const uniqueAreas = [...new Set(myShifts.map((shift) => shift.area))];
  const groupedShifts = groupShiftsByDate(myShifts, activeArea);

  const renderShiftDateGroup = ({ item }) => (
    <ShiftDateGroup
      date={item.date}
      shifts={item.shifts}
      bookShift={bookShift}
      cancelShift={cancelShift}
      formatTime={formatTime}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {uniqueAreas.map((area, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              area === activeArea ? styles.activeTab : null
            ]}
            onPress={() => setActiveArea(area)}
          >
            <Text style={[styles.tabText,{fontSize:18,fontWeight:"600"}]}>{area} ({area.length})</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={Object.keys(groupedShifts).map((date) => ({
          date,
          shifts: groupedShifts[date],
        }))}
        renderItem={renderShiftDateGroup}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop:20,
    width:"100%",
    justifyContent:"space-between",
    fontWeight:"800",
    paddingBottom:10,
    borderBottomWidth:1,
    
  },
  tab: {
    paddingHorizontal: 10,
    paddingBottom: 4,
    fontWeight: "bold",
  },
  activeTab: {
    color: "#004FB4"
  },
  tabText: {
    color: "#A4B8D3"
  },
});

export default AvailableShiftsScreen;
