import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NotesBox = ({ data, onTimestampClick }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {data.map((item, index) => (
        <TouchableOpacity
          onPress={() => onTimestampClick(item.time)}
          style={styles.timeStamp}
          key={index}
        >
          <Text style={styles.timeStampText}>{item.count}</Text>
          <Text style={styles.note}>{item.note}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingVertical: 10,
    paddingHorizontal: 50
  },
  timeStamp: {
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
  timeStampText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 16,
  },
});

export default NotesBox;
