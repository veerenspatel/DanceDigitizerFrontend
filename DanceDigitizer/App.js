import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Login from './components/Login';
import ProfilePage from './components/ProfilePage';
import VideoComponent from './components/VideoComponent';
import VideoRecorder from './components/VideoRecorder';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [uploadVid, setUploadVid] = useState(false);
  const [recordVid, setRecordVid] = useState(false);

  const handleLog = () => {
    setLoggedIn(true);
  };

  const handleUpload = () => {
    setUploadVid(true);
  };

  const handleRecord = () => {
    setRecordVid(true);
  };

  const handleHomePress = () => {
    // Reset all states to false
    setUploadVid(false);
    setRecordVid(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loggedIn ? (
        <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>
      ) : null}

      {loggedIn ? (
        uploadVid ? (
          <VideoComponent />
        ) : recordVid ? (
          <VideoRecorder />
        ) : (
          <ProfilePage uploadVid={handleUpload} recordVid={handleRecord} />
        )
      ) : (
        <Login handleLogin={handleLog} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#purple',
  },
    homeButton: {
    position: 'absolute',
    top: 20, // Adjust this value to move the button lower
    right: 10,
    padding: 20,
    backgroundColor: '#3498db',
    borderRadius: 8,
  },
  homeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
