import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
// import { WebView } from "react-native-webview"

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}></Text>
      <TouchableOpacity style={styles.translateButton}>
        <Image
          style={styles.micImage}
          source={require("../assets/images/icons8-microphone-96.png")}
        ></Image>
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
  webView: {
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
    color: "#333",
  },
  translateButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    width: 200,
    backgroundColor: "grey",
    borderColor: "black",
    borderWidth: 7,
    borderRadius: 107,
  },
  micImage: {
    position: "absolute",
  },
})

export default HomeScreen
