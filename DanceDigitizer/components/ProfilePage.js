import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ProfilePage = ({ uploadVid, recordVid }) => {
  // Example user data
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    favoriteVideos: [
      { id: '1', title: 'Video 1' },
      { id: '2', title: 'Video 2' },
      { id: '3', title: 'Video 3' },
    ],
  };

  const renderVideoCard = ({ item }) => (
    <View style={styles.videoCard}>
      <Text style={styles.videoTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {userData.firstName} {userData.lastName}!</Text>
      </View>

      <Text style={styles.favoriteVideosText}>Favorite Videos:</Text>
      <FlatList
        data={userData.favoriteVideos}
        keyExtractor={(item) => item.id}
        renderItem={renderVideoCard}
        contentContainerStyle={styles.videoList}
      />

      {/* Buttons at the bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={uploadVid}>
          <Text style={styles.buttonText}>Upload a Video</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={recordVid}>
          <Text style={styles.buttonText}>Record</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  favoriteVideosText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  videoList: {
    marginTop: 8,
  },
  videoCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    elevation: 3,
  },
  videoTitle: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfilePage;
