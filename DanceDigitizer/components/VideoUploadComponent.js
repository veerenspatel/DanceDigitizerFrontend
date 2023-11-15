import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Button, Text,ScrollView,TouchableOpacity,TextInput } from "react-native";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { Dimensions } from 'react-native';
import NotesBox from "./NotesBox";
import StartingTimeStampSelection from "./StartingTimeStampSelection.js"; // Import NotesBox component

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const VideoUploadComponent = () => {
  const [updatePlaybackStatus, setUpdatePlaybackStatus] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [startingTimeStamp, setStartingTimeStamp] = useState()
  const video = useRef(null);
  

  const [timeStamps,setTimeStamps] = useState()



  const [timeStampCount, setTimeStampCount] = useState(0);
  const data = [
    { count:"1.2",time: "1000", note: "Flex your arms" },
    { count:"3.2",time: "30000", note: "look up" },
    { count:"2.2",time: "20000", note: "add nakhra here" },
    // Add more data as needed
  ];

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);


  const handleUploadVideo = async () => {
    console.log(startingTimeStamp)
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      let selectedVideoUri;
  
      if (!result.canceled) {
        selectedVideoUri = result.uri;
      } else {
        selectedVideoUri = "/Users/veerenpatel/DanceDigitizer/assets/sample3.mp4";
      }
      
      
  
    } catch (err) {
      console.error('Error selecting/uploading video:', err);
    }
    setSelectedVideo(require("/Users/veerenpatel/DanceDigitizer/assets/sample3.mp4"))

  };


  const uploadVideo = async (videoUri,startingStamp) => {
    try {
      const formData = new FormData();
      console.log(videoUri)
      formData.append('video', {
        uri: "/Users/veerenpatel/DanceDigitizer/assets/sample3.mp4",
        type: 'video/mp4',
        name: 'test.mp4',
      });
      formData.append('startingStamp',startingStamp)
  
      const response = await fetch('http://127.0.0.1:5000/process_mp3', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Response status:', response.status);
  
      if (response.ok) {
        const data = await response.json();
        console.log('Video uploaded successfully!');
        console.log('Data:', data);
        setTimeStamps(data.result);
      } else {
        console.error('Error uploading video:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const seekTo = (timestamp) => {
    // Assuming VideoPlayer.seekTo is a function to seek to a specific timestamp
    console.log("here")
    console.log(timestamp)
    video.current?.setPositionAsync(parseInt(timestamp));
  };
  

  const handleNextCount = () => {
    setUpdatePlaybackStatus(false)
    console.log("next " + timeStampCount);
    if (timeStampCount === timeStamps.length - 1) {
      setTimeStampCount(0);
      video.current?.setPositionAsync(timeStamps[0]*1000);
    } else {
      setTimeStampCount(prevCount => prevCount + 1);
      video.current?.setPositionAsync(timeStamps[timeStampCount + 1] * 1000);
    }
    
  };

  const handlePreviousCount = () => {
    setUpdatePlaybackStatus(false)
    console.log("prev " + timeStampCount);
    if (timeStampCount === 0) {
      return;
    }
    else{
      setTimeStampCount(prevCount => prevCount - 1);
      video.current?.setPositionAsync(timeStamps[timeStampCount - 1] * 1000);
    }
    
    
  };

  const handleVideoStatusUpdate = (status) => {
    if(!updatePlaybackStatus){
      setUpdatePlaybackStatus(true)
      return;
    }
   
   

    if (status.positionMillis !== undefined) {
      const currentPosition = status.positionMillis;
      let closestIndex = 0;
      let minDiff = Math.abs(timeStamps[0] * 1000 - currentPosition);
  
      for (let i = 1; i < timeStamps.length; i++) {
        const diff = Math.abs(timeStamps[i] * 1000 - currentPosition);
        if (diff < minDiff) {
          closestIndex = i;
          minDiff = diff;
          
        }
      }
      console.log(closestIndex)
      setTimeStampCount(closestIndex);
    }
  };

  const getTimeStampCount=()=>{
    const formattedCount = Math.floor((timeStampCount ) / 8) + 1;
    const subCount = (timeStampCount ) % 8+1 ;
    return `${formattedCount}.${subCount}`;
  }

  const handleStartingTimeStamp=async(timeStamp)=>{
    console.log(timeStamp)
      // Call the function to handle the POST request
    await uploadVideo(selectedVideo,timeStamp);
    setStartingTimeStamp(timeStamp) //indicates that we've completed processing

  }

  return (
  
    <View style={styles.container}>
      {!startingTimeStamp && selectedVideo  && <StartingTimeStampSelection handleGetTimeStamp = {handleStartingTimeStamp} />}
      {startingTimeStamp && selectedVideo && (
        <Video
          ref={video}
          style={styles.video}
          source={selectedVideo}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={handleVideoStatusUpdate}
        />
      ) }
      {!startingTimeStamp && !selectedVideo &&(
        <Button title="Upload Video" onPress={handleUploadVideo} />
      )}
      {startingTimeStamp && selectedVideo && <Button title="Next count" onPress={handleNextCount} />}
      {startingTimeStamp  && selectedVideo && (
        <Button title="Previous count" onPress={handlePreviousCount} />
      )}
      {/* Display the current count */}
      {startingTimeStamp && selectedVideo &&(
        
        <Text>Current Count: {getTimeStampCount()}</Text>
      )}
      

      {startingTimeStamp  && selectedVideo && (
        <View style={styles.notesBoxContainer}>
          <NotesBox data={data} onTimestampClick={seekTo} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
    width: screenWidth,  // Adjust video width to full screen
    height: screenHeight * 0.4,  // Adjust video height to 40% of screen height
  },
  notesBoxContainer: {
    marginTop: 10,  // Add some space between video and notes box
    width: screenWidth,  // Match video width
    paddingHorizontal: 20,  // Add horizontal padding
  }
});

export default VideoUploadComponent;
