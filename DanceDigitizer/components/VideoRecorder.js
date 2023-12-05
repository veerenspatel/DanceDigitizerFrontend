import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const VideoRecorder = () => {
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    // Mock function for starting recording
    console.log('Mock: Recording started');
  };

  const stopRecording = () => {
    // Mock function for stopping recording
    console.log('Mock: Recording stopped');
    setIsRecording(false);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
      setIsRecording(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Mocked Camera View */}
      <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 18 }}>Camera Preview</Text>
      </View>

      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity onPress={toggleRecording} style={{ padding: 20 }}>
          <Text style={{ fontSize: 20, marginBottom: 10, color: isRecording ? 'red' : 'white' }}>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoRecorder;
