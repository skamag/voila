import {
  View,
  StyleSheet,
  Platform,
  Text,
  Image,
  TextInput,
  Button,
} from "react-native"

export default function HomeScreen() {
  return (
    <>
      <View style={styles.titleContainer}>
        <Image
          source={require("@/assets/images/2905547.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Mail Voice</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Text to Speech</Text>
        <TextInput
          style={styles.input}
          // value={inputText}
          // onChangeText={setInputText}
          placeholder="Type something to speak"
        />
        <Button
          title="Press to Speak Text"
          // onPress={speakText}
        />

        <Text style={styles.title}>Speech to Text</Text>
        <Button
          title="Press to Speak"
          // onPress={startRecognition}
        />
        <Text style={styles.text}>
          Recognized Text:
          {/* {spokenText} */}
        </Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    padding: 25,
  },
  title: {
    fontSize: 30,
  },
  logo: {
    height: 50,
    width: 50,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  // title: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   marginVertical: 10,
  // },
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
