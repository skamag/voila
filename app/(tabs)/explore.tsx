import React, { useEffect, useState } from "react"
import {
  View,
  Button,
  TextInput,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from "react-native"
import Voice from "react-native-voice" // Speech to Text
import * as Speech from "expo-speech" // Text to Speech

const ExploreScreen = () => {
  const requestMicrophonePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: "Microphone Permission",
            message:
              "This app needs access to your microphone to convert speech to text.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        )
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Microphone permission denied")
        }
      } catch (err) {
        console.warn(err)
      }
    }
  }

  useEffect(() => {
    requestMicrophonePermission()
  }, [])

  const [spokenText, setSpokenText] = useState("") // To store speech to text result
  const [inputText, setInputText] = useState("") // To store user input text

  // Function to start speech recognition
  const startRecognition = async () => {
    try {
      await Voice.start("en-US")
      Voice.onSpeechResults = (result: any) => {
        setSpokenText(result.value[0]) // Capture first result
      }
    } catch (error) {
      console.error("Speech Recognition Error:", error)
    }
  }

  // Function to convert text to speech
  const speakText = () => {
    if (inputText.trim()) {
      Speech.speak(inputText, {
        language: "en-US", // Set the language
        pitch: 1.0, // Default pitch
        rate: 1.0, // Default rate (speed)
      })
    } else {
      alert("Please enter some text to convert to speech")
    }
  }

  return (
    <View style={styles.container}>
      {/* Text-to-Speech Section */}
      <Text style={styles.title}>Text to Speech</Text>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Type something to speak"
      />
      <Button title="Press to Speak Text" onPress={speakText} />

      {/* Speech-to-Text Section */}
      <Text style={styles.title}>Speech to Text</Text>
      <Button title="Press to Speak" onPress={startRecognition} />
      <Text style={styles.text}>Recognized Text: {spokenText}</Text>
    </View>
  )
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
})

export default ExploreScreen
