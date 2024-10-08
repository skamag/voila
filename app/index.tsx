import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native"
import Voice from "@react-native-voice/voice" // Import the library

const HomeScreen = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [recognizedText, setRecognizedText] = useState("")

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults // Event when speech is recognized
    Voice.onSpeechError = onSpeechError // Event when there’s an error
    return () => {
      Voice.destroy().then(Voice.removeAllListeners) // Clean up listeners on unmount
    }
  }, [])

  const onSpeechResults = (result: any) => {
    setRecognizedText(result.value[0]) // Get the first recognized result
  }

  const onSpeechError = (error: any) => {
    console.error(error)
    Alert.alert(
      "Error",
      "There was an issue with speech recognition. Try again."
    )
  }

  const startRecognition = async () => {
    try {
      await Voice.start("en-US") // Start listening for English (US)
      setIsRecording(true)
    } catch (e) {
      console.error(e)
    }
  }

  const stopRecognition = async () => {
    try {
      await Voice.stop() // Stop listening
      setIsRecording(false)
    } catch (e) {
      console.error(e)
    }
  }

  const handleMicPress = () => {
    isRecording ? stopRecognition() : startRecognition()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {recognizedText || "Press the mic and start speaking..."}
      </Text>
      <Text
        style={[
          styles.recordingStatus,
          { color: isRecording ? "red" : "#333" },
        ]}
      >
        {isRecording ? "Listening..." : "Tap the mic to speak"}
      </Text>
      <TouchableOpacity
        style={[styles.translateButton, isRecording && styles.recordingButton]}
        onPress={handleMicPress}
      >
        <Image
          style={styles.micImage}
          source={require("../assets/images/icons8-microphone-96.png")}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
    color: "#333",
    textAlign: "center",
  },
  recordingStatus: {
    fontSize: 16,
    marginBottom: 20,
  },
  translateButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    width: 200,
    backgroundColor: "grey",
    borderColor: "black",
    borderWidth: 7,
    borderRadius: 107,
  },
  recordingButton: {
    backgroundColor: "red", // Change color when recording
  },
  micImage: {
    position: "absolute",
  },
})

export default HomeScreen
