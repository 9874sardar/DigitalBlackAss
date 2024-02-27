import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ShiftCard = ({ shift, bookShift, cancelShift, formatTime }) => (
  <View style={styles.container}>
    <Text style={styles.shiftDetails}>
      {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
    </Text>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => bookShift(shift.id)}>
        <Text style={styles.buttonText}>Book</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => cancelShift(shift.id)}>
        <Text style={[styles.buttonText,{color:"#E2006A"}]}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    width:"100%"
  },
  shiftDetails: {
    color: '#4F6C92',
    fontWeight: 'normal',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth:1,
    borderColor:"#16A64D"
  },
  cancelButton: {
    // backgroundColor: '#EED2DF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth:1,
    borderColor:"#E2006A"
  },
  buttonText: {
    color: '#16A64D',
    fontWeight: 'bold',
  },
});

export default ShiftCard;