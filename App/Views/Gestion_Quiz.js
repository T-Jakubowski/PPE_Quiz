import React, { useState } from "react";
import { Text, View, StyleSheet, Modal } from "react-native";
import { Button } from "@react-native-material/core";
import OwnTextInput from "../components/TextInput";
import axios from "axios";
import { BASE_API } from "@env";

export default function Gestion_Quiz({ navigation }) {
  const baseUrl = BASE_API;

  const [theme, setTheme] = useState("");
  const [name, setName] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  const onPress = async () => {
    const url = `${baseUrl}/quiz/create`;
    const body = `name=${name}&theme=${theme}`;
    console.log(body);
    console.log(url);
    const response = await axios
      .post(url, body)
      .catch((error) => console.log(error));
    console.log(response.data);
  };

  return (
    <View style={styles.container}>
      {/* <Text>{theme}</Text>
      <Text>{name}</Text> */}

      <Button
        variant="outlined"
        title="Modal"
        style={styles.button}
        onPress={() => {
          setIsVisible(true);
          console.log(isVisible);
        }}
      />

      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={{backgroundColor: 'white', flex: 1}}>
        <OwnTextInput label="Theme" onChangeText={setTheme} />
        <OwnTextInput label="Name" onChangeText={setName} />

        <Button
          variant="outlined"
          title="Valider"
          style={styles.button}
          onPress={onPress}
        />

        <Button
          variant="outlined"
          title="exit"
          style={styles.button}
          onPress={() => setIsVisible(false)}
        />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  input: {
    margin: 16,
  },
  button: {
    marginTop: 16,
    alignSelf: "center",
    width: "30%",
  },
});
