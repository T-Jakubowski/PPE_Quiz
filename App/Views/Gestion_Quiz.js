import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Modal, ScrollView } from "react-native";
import { Button } from "@react-native-material/core";
import OwnTextInput from "../components/TextInput";
import axios from "axios";
import { BASE_API } from "@env";
import DisplayQuizzes from "../components/DisplayQuizzes";
import ConfirmationModal from "../components/ConfimationModal";

const Gestion_Quiz = ({ navigation }) => {
  const [theme, setTheme] = useState("");
  const [name, setName] = useState("");
  const [quizzes, setQuizzes] = useState();

  const [errorMsg, setErrorMsg] = useState("");

  const [quizIdToUpdate, setQuizIdToUpdate] = useState("");
  const [quizNameToUpdate, setQuizNameToUpdate] = useState("");
  const [quizThemeToUpdate, setQuizThemeToUpdate] = useState("");

  const [quizIdDelete, setQuizIdDelete] = useState();

  const [isVisibleAdd, setIsVisibleAdd] = useState(false);
  const [isVisibleUpdate, setIsVisibleUpdate] = useState(false);
  const [isVisibleDelete, setIsVisibleDelete] = useState(false);

  const urlGetQuizzes = `${BASE_API}/quiz/readall`;

  const getQuizzes = async () =>
    await axios
      .get(urlGetQuizzes)
      .then((response) => setQuizzes(response.data))
      .catch((error) => console.log(error));

  useEffect(() => {
    getQuizzes();
  }, []);

  const IsValidAdd = () => {
    return theme.length > 0 && name.length > 0;
  };

  const IsValidUpdate = () => {
    return quizThemeToUpdate.length > 0 && quizNameToUpdate.length > 0;
  };

  const onPressAdd = async () => {
    if (IsValidAdd()) {
      const url = `${BASE_API}/quiz/create`;
      const body = `name=${name}&theme=${theme}`;
      const response = await axios
        .post(url, body)
        .catch((error) => console.log(error));
      console.log(response.data);
      getQuizzes();
      setName("");
      setTheme("");
      setIsVisibleAdd(false);
    } else {
      setErrorMsg("Un champ n'est pas rempli !");
    }
  };

  const onPressDelete = async (id) => {
    const urlQuiz = `${BASE_API}/quiz/delete/${id}`;
    const responseQuiz = await axios
      .delete(urlQuiz)
      .catch((error) => console.log(error));
    const urlQuestions = `${BASE_API}/questions/deleteall/${id}`;
    const responseQuestions = await axios
      .delete(urlQuestions)
      .catch((error) => console.log(error));
    getQuizzes();
  };

  const onPressUpdate = async () => {
    if (IsValidUpdate()) {
      const url = `${BASE_API}/quiz/update/${quizIdToUpdate}`;
      const body = `name=${quizNameToUpdate}&theme=${quizThemeToUpdate}`;
      const response = await axios
        .patch(url, body)
        .catch((error) => console.log(error));
      getQuizzes();
      setIsVisibleUpdate(false);
    } else {
      setErrorMsg("Un champ n'est pas rempli !");
    }
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
                    text={quiz.name}
                    title={quiz.theme}
                    onPressView={() =>
                      navigation.navigate("Gestion_Question", quiz)
                    }
                    onPressDelete={() => {
                      setQuizIdDelete(quiz._id);
                      setIsVisibleDelete(true);
                    }}
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
      <ConfirmationModal
        text={"Êtes-vous sur de vouloir le supprimer ?"}
        isVisible={isVisibleDelete}
        onPressNo={() => setIsVisibleDelete(false)}
        onPressYes={() => {
          onPressDelete(quizIdDelete);
          setIsVisibleDelete(false);
        }}
      />
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
          <OwnTextInput label="Theme" onChangeText={setTheme} value={theme} />
          <OwnTextInput label="Name" onChangeText={setName} value={name} />
          <View style={styles.buttonContainer}>
            <Button
              variant="outlined"
              title="exit"
              style={styles.button}
              onPress={() => {
                setIsVisibleAdd(false);
                setErrorMsg("");
              }}
            />

            <Button
              variant="outlined"
              title="Valider"
              style={styles.button}
              onPress={() => onPressAdd()}
              disabled={!IsValidAdd()}
            />
          </View>
          {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
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
              onPress={() => {
                setIsVisibleUpdate(false);
                setErrorMsg("");
              }}
            />

            <Button
              variant="outlined"
              title="Valider"
              onPress={() => onPressUpdate()}
              disabled={!IsValidUpdate()}
            />
          </View>
          {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
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
  errorMsg: {
    color: "red",
    alignSelf: "center",
  },
  button: {
    marginBottom: 16,
    marginHorizontal: '30%',
  }
});
export default Gestion_Quiz;
