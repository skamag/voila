import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native"
import Voice from "@react-native-voice/voice"
// import Voice from '@react-native-voice/voice/dist/voice';
import * as Speech from "expo-speech"

const HomeScreen = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [recognizedText, setRecognizedText] = useState("")
  const [notes, setNotes] = useState<String[]>([
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "Lorem Ipsum is simply dummy text",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  ])

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults
    Voice.onSpeechError = onSpeechError
    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  const onSpeechResults = (result: any) => {
    setRecognizedText(result.value[0])
    console.log("test")
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
      await Voice.start("en-US")
      setIsRecording(true)
    } catch (e) {
      console.error(e)
    }
  }

  const stopRecognition = async () => {
    try {
      await Voice.stop()
      setIsRecording(false)

      let newNote =
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."

      setNotes((oldNotes) => [...oldNotes, newNote])
    } catch (e) {
      console.error(e)
    }
  }

  const handleMicPress = () => {
    isRecording ? stopRecognition() : startRecognition()
  }

  const readNoteAloud = (note: any) => {
    Speech.speak(note, {
      language: "en-US",
      pitch: 1.0,
      rate: 1.0,
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.notesContainer}
        ref={(ref) => {
          this.scrollView = ref
        }}
        onContentSizeChange={() =>
          this.scrollView.scrollToEnd({ animated: true })
        }
      >
        {notes.map((note, index) => (
          <View style={styles.note} key={index}>
            <TouchableOpacity onPress={() => readNoteAloud(note)}>
              <Text style={styles.noteText}>{note}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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
    overflow: "hidden",
  },
  note: {
    // flex: 1,
    width: "100%",
    height: "auto",
    borderRadius: 10,
    marginBottom: 10,
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
    backgroundColor: "red",
  },
  micImage: {
    zIndex: 100,
  },
})

export default HomeScreen
