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
      <View style={styles.notesContainer}>
        <View style={styles.note}>
          <TouchableOpacity>
            <Text style={styles.noteText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.note}>
          <TouchableOpacity>
            <Text style={styles.noteText}>
              Lorem Ipsum is simply dummy text
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.note}>
          <TouchableOpacity>
            <Text style={styles.noteText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View>
          <Text style={styles.text}>
            {recognizedText || "Listen to a note by pressing it or..."}
          </Text>
          <Text
            style={[
              styles.recordingStatus,
              { color: isRecording ? "red" : "#333" },
            ]}
          >
            {isRecording ? "Listening..." : "Tap the mic to record a new note"}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.translateButton,
            isRecording && styles.recordingButton,
          ]}
          onPress={handleMicPress}
        >
          <Image
            style={styles.micImage}
            source={require("../assets/images/icons8-microphone-96.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 50,
    marginVertical: 50,
    marginHorizontal: 25,
    backgroundColor: "#fff",
  },
  notesContainer: {
    flex: 1,
    width: "100%",
    gap: 10,
  },
  note: {
    // flex: 1,
    width: "100%",
    height: "auto",
    borderRadius: 10,
    backgroundColor: "#FFF6C6",
    overflow: "hidden",
  },
  noteText: {
    marginVertical: 25,
    marginHorizontal: 25,
    fontSize: 16,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    textAlign: "center",
  },
  translateButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 160,
    width: 160,
    backgroundColor: "grey",
    borderColor: "black",
    borderWidth: 7,
    borderRadius: 107,
  },
  recordingButton: {
    backgroundColor: "red", // Change color when recording
  },
  micImage: {
    zIndex: 100,
  },
})

export default HomeScreen
