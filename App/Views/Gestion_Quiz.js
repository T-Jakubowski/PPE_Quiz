import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Modal, ScrollView } from "react-native";
import { Button } from "@react-native-material/core";
import OwnTextInput from "../components/TextInput";
import axios from "axios";
import { BASE_API } from "@env";
import DisplayQuizzes from "../components/DisplayQuizzes";

const Gestion_Quiz = ({ navigation }) => {
  const [theme, setTheme] = useState("");
  const [name, setName] = useState("");
  const [quizzes, setQuizzes] = useState();

  const [quizIdToUpdate, setQuizIdToUpdate] = useState("");
  const [quizNameToUpdate, setQuizNameToUpdate] = useState("");
  const [quizThemeToUpdate, setQuizThemeToUpdate] = useState("");

  const [isVisibleAdd, setIsVisibleAdd] = useState(false);
  const [isVisibleUpdate, setIsVisibleUpdate] = useState(false);

  const urlGetQuizzes = `${BASE_API}/quiz/readall`;

  const getQuizzes = async () =>
    await axios
      .get(urlGetQuizzes)
      .then((response) => setQuizzes(response.data))
      .catch((error) => console.log(error));

  useEffect(() => {
    getQuizzes();
  }, []);

  const onPressAdd = async () => {
    const url = `${BASE_API}/quiz/create`;
    const body = `name=${name}&theme=${theme}`;
    const response = await axios
      .post(url, body)
      .catch((error) => console.log(error));
    console.log(response.data);
    getQuizzes();
    setIsVisibleAdd(false);
  };

  const onPressDelete = async (id) => {
    const url = `${BASE_API}/quiz/delete/${id}`;
    const response = await axios
      .delete(url)
      .catch((error) => console.log(error));
    getQuizzes();
  };

  const onPressUpdate = async () => {
    const url = `${BASE_API}/quiz/update/${quizIdToUpdate}`;
    const body = `name=${quizNameToUpdate}&theme=${quizThemeToUpdate}`;
    const response = await axios
      .patch(url, body)
      .catch((error) => console.log(error));
    getQuizzes();
    setIsVisibleUpdate(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {quizzes
          ? quizzes.map((quiz) => {
              return (
                <View>
                  <DisplayQuizzes
                    key={quiz._id.toString()}
                    name={quiz.name}
                    theme={quiz.theme}
                    onPressView={() =>
                      navigation.navigate("Gestion_Question", quiz)
                    }
                    onPressDelete={() => onPressDelete(quiz._id)}
                    onPressUpdate={() => {
                      setIsVisibleUpdate(true);
                      setQuizIdToUpdate(quiz._id);
                      setQuizNameToUpdate(quiz.name);
                      setQuizThemeToUpdate(quiz.theme);
                    }}
                  />
                </View>
              );
            })
          : null}
      </ScrollView>

      <Button
        variant="outlined"
        title="Ajouter"
        style={styles.button}
        onPress={() => {
          setIsVisibleAdd(true);
        }}
      />

      <Modal animationType="slide" transparent={true} visible={isVisibleAdd}>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <OwnTextInput label="Theme" onChangeText={setTheme} />
          <OwnTextInput label="Name" onChangeText={setName} />
          <View style={styles.buttonContainer}>
            <Button
              variant="outlined"
              title="exit"
              style={styles.button}
              onPress={() => setIsVisibleAdd(false)}
            />

            <Button
              variant="outlined"
              title="Valider"
              style={styles.button}
              onPress={() => onPressAdd()}
            />
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={isVisibleUpdate}>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <OwnTextInput
            label="Theme"
            onChangeText={setQuizThemeToUpdate}
            value={quizThemeToUpdate}
          />
          <OwnTextInput
            label="Name"
            onChangeText={setQuizNameToUpdate}
            value={quizNameToUpdate}
          />
          <View style={styles.buttonContainer}>
            <Button
              variant="outlined"
              title="exit"
              style={styles.button}
              onPress={() => setIsVisibleUpdate(false)}
            />

            <Button
              variant="outlined"
              title="Valider"
              style={styles.button}
              onPress={() => onPressUpdate()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    justifyContent: "space-between",
  },
  input: {
    margin: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginBottom: 24,
  },
  backButton: {
    marginTop: 16,
    width: "30%",
  },
});
export default Gestion_Quiz;
