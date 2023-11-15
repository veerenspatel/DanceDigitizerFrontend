import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView,Image,TouchableWithoutFeedback,TouchableOpacity,WebView,Dimensions} from 'react-native';
import React, { useState, useEffect } from 'react';
import VideoUploadComponent from "./components/VideoUploadComponent"
import NotesBox from "./components/NotesBox"
import VideoComponent from './components/VideoComponent';



export default function App() {
  
  console.log("ho")
  
  return (
    <SafeAreaView style={styles.container}>
      <VideoComponent/>
      
      
      
     
      {

      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#purple',
  },
  notesBoxContainer: {
    justifyContent: 'center', alignItems: 'center' ,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
  
  },
});
