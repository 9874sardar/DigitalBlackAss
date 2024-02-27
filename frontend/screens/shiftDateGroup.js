import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShiftCard from './shiftCard';

const ShiftDateGroup = ({ date, shifts, bookShift, cancelShift, formatTime }) => (
  <View style={styles.container}>
    <Text style={styles.date}>{date}</Text>
    {shifts.map((shift, shiftIndex) => (
      <View key={shiftIndex}>
        <ShiftCard
          shift={shift}
          bookShift={bookShift}
          cancelShift={cancelShift}
          formatTime={formatTime}
        />
        <View style={styles.divider} />
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
      width:"100%"
    },
    dateText: {
      padding: 10,
      backgroundColor: "#f0f0f0",
      fontWeight: "bold",
      color: "#4F6C92",
    },
    hr: {
      height: 1,
      backgroundColor: "#ccc",
      marginHorizontal: 10,
    },
  });

export default ShiftDateGroup;
