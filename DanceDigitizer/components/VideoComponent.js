// VideoComponent.js

import React, { useState,useRef} from "react";
import VideoUploadComponent from "./VideoUploadComponent"; // Import your video player component
import NotesBox from "./NotesBox"; // Import NotesBox component
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  WebView,
  Dimensions,
} from "react-native";
const VideoComponent = () => {
  const [currentTimestamp, setCurrentTimestamp] = useState(0);

  const seekToTimestamp = (timestamp) => {
    // Call the seek method of your video player with the specified timestamp
    console.log()

    seekTo(timestamp);
  };
  


  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ flex: 1 }}>
        {/* Render your video player here */}
        <VideoUploadComponent   />
      </View>
     
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#purple",
  },
  notesBoxContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
 
  },
});

export default VideoComponent;

/*
To do: 
video component is the entire screen right, so then we have the video player and the notebox inside that
starting at highest level, when a note box is clicked, it calls a function called onTimeStampClick which is in Video component.
that function then calls a function inside of video upload that changes the position of the video.
fix notes format

*/
