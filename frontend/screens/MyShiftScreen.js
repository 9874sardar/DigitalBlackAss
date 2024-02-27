import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export function MyShifts() {
  const bookedShifts = useSelector((state) => state.bookedShifts);
  const dispatch = useDispatch();

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
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

  return (
    <View style={styles.container}>
      {bookedShifts.map((shift, index) => (
        <View key={index} style={styles.shiftContainer}>
          <Text style={styles.dayText}>
            {new Date(shift.startTime).toLocaleDateString([], {
              weekday: "long",
            })}
          </Text>
          <View style={styles.shiftDetails}>
            <View style={styles.timeAreaContainer}>
              <Text style={styles.timeText}>
                {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
              </Text>
              <Text style={styles.areaText}>{shift.area}</Text>
            </View>
            <Button
              title="Cancel"
              onPress={() => cancelShift(shift.id)}
              color="#E2006A"
            />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  shiftContainer: {
    padding: 4,
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
shadowRadius: 3.84,
    elevation: 5,
  },
  dayText: {
    padding: 4,
    backgroundColor: '#4F6C92',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  shiftDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
    color: '#004FB4',
    fontWeight: 'bold',
  },
  shiftInfo: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#DE93B3',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cancelButtonText: {
    color: '#E2006A',
    fontWeight: 'bold',
  },
});

export default MyShifts;