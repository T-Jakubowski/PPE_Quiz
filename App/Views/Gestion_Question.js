import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Modal } from "react-native";
import { Button } from "@react-native-material/core";
import OwnTextInput from "../components/TextInput";
import axios from "axios";
import { BASE_API } from "@env";
import DisplayQuizzes from "../components/DisplayQuizzes";

export default function test({ route, navigation }) {
  const [idQuiz, setIdQuiz] = useState(route.params._id);
  const [questions, setQuestions] = useState("");
  const [questionAdd, setQuestionAdd] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [reponsesAdd, setReponsesAdd] = useState(["", ""]);
  const [isVisibleAdd, setIsVisibleAdd] = useState(false);

  const [reponsesUpdate, setReponsesUpdate] = useState(["", ""]);
  const [questionUpdate, setQuestionUpdate] = useState("");
  const [correctAnswerUpdate, setCorrectAnswerUpdate] = useState("");
  const [questionIdToUpdate, setQuestionIdToUpdate] = useState("");
  const [isVisibleUpdate, setIsVisibleUpdate] = useState(false);

  const urlGetQuestions = `${BASE_API}/questions/readall/${idQuiz}`;

  const getQuestions = async () =>
    await axios
      .get(urlGetQuestions)
      .then((response) => setQuestions(response.data))
      .catch((error) => console.log(error)).data;

  useEffect(() => {
    getQuestions();
  }, []);

  const question = () => {
    let input = [];
    for (let index = 1; index < reponsesAdd.length + 1; index++) {
      input.push(
        <OwnTextInput
          label={`Reponse ${index}`}
          key={`Reponse ${index}`}
          onChangeText={(text) => {
            setReponsesAdd(() => {
              let array = [];
              for (let i = 1; i < reponsesAdd.length + 1; i++) {
                if (i == index) {
                  array.push(text);
                } else {
                  array.push(reponsesAdd[i - 1]);
                }
              }
              return array;
            });
            getQuestions();
          }}
        />
      );
    }
    return input;
  };

  const questionUpdateShow = () => {
    let input = [];
    for (let index = 1; index < reponsesUpdate.length + 1; index++) {
      input.push(
        <OwnTextInput
          label={`Reponse ${index}`}
          value={reponsesUpdate[index - 1]}
          key={`Reponse ${index}`}
          onChangeText={(text) => {
            setReponsesUpdate(() => {
              let array = [];
              for (let i = 1; i < reponsesUpdate.length + 1; i++) {
                if (i == index) {
                  array.push(text);
                } else {
                  array.push(reponsesUpdate[i - 1]);
                }
              }
              
              return array;
            });
            getQuestions();
          }}
        />
      );
    }
    return input;
  };

  const onPressDelete = async (id) => {
    console.log(id);
    const url = `${BASE_API}/questions/delete/${id}`;
    const response = await axios
      .delete(url)
      .catch((error) => console.log(error));
    getQuestions();
  };

  const onPressUpdate = async () => {
    let urlArray = ``;
    for (let i = 0; i < reponsesUpdate.length; i++) {
      urlArray += `&options[${i}]=${reponsesUpdate[i]}`;
    }
    const url = `${BASE_API}/questions/update/${questionIdToUpdate}`;
    const body = `question=${questionUpdate}&correct_option=${correctAnswerUpdate}${urlArray}&quiz_id=${idQuiz}`;
    const response = await axios
      .patch(url, body)
      .catch((error) => console.log(error));
    getQuestions();
    setIsVisibleUpdate(false);
  };

  const onPressAdd = async () => {
    const urlAddQuestions = `${BASE_API}/questions/create`;
    let urlArray = ``;
    for (let i = 0; i < reponsesAdd.length; i++) {
      urlArray += `&options[${i}]=${reponsesAdd[i]}`;
    }
    const body = `question=${questionAdd}&correct_option=${correctAnswer}${urlArray}&quiz_id=${idQuiz}`;
    console.log(body);
    await axios.post(urlAddQuestions, body).catch((error) => console.log(error))
      .data;
    getQuestions();
    setIsVisibleAdd(false);
  };

  const isDisabled = () => {
    for (let i = 0; i < reponsesAdd.length; i++) {
      return !reponsesAdd[i] || !correctAnswer || !questionAdd;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {questions
          ? questions.map((question) => {
              return (
                <View>
                  <DisplayQuizzes
                    key={question._id.toString()}
                    name={question.question}
                    theme={question.correct_option}
                    onPressDelete={() => onPressDelete(question._id)}
                    onPressUpdate={() => {
                      setIsVisibleUpdate(true);
                      setQuestionIdToUpdate(question._id);
                      setQuestionUpdate(question.question);
                      setCorrectAnswerUpdate(question.correct_option);
                      setReponsesUpdate(question.options);
                    }}
                  />
                </View>
              );
            })
          : null}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          variant="outlined"
          title="Retour"
          style={styles.button}
          onPress={() => navigation.navigate("Gestion des quiz")}
        />
        <Button
          variant="outlined"
          title="Ajouter"
          style={styles.button}
          onPress={() => setIsVisibleAdd(true)}
        />
      </View>

      <Modal animationType="slide" transparent={true} visible={isVisibleAdd}>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <OwnTextInput label="Question" onChangeText={setQuestionAdd} />
          <OwnTextInput
            label="Réponse Correct"
            onChangeText={setCorrectAnswer}
          />
          {question()}

          <View style={styles.buttonContainer}>
            <Button
              variant="outlined"
              title="-"
              style={styles.button}
              onPress={() => {
                setReponsesAdd(() => {
                  if (reponsesAdd.length > 2) {
                    let array = [];
                    for (let i = 0; i < reponsesAdd.length - 1; i++) {
                      array.push(reponsesAdd[i]);
                    }
                    return array;
                  }
                  return reponsesAdd;
                });
              }}
            />

            <Button
              variant="outlined"
              title="+"
              style={styles.button}
              onPress={() => {
                setReponsesAdd([...reponsesAdd, ""]);
              }}
            />
          </View>

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
              disabled={isDisabled()}
            />
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={isVisibleUpdate}>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <OwnTextInput
            label="Question"
            onChangeText={setQuestionUpdate}
            value={questionUpdate}
          />
          <OwnTextInput
            label="Reponse Correct"
            onChangeText={setCorrectAnswerUpdate}
            value={correctAnswerUpdate}
          />
          {questionUpdateShow()}

          <View style={styles.buttonContainer}>
            <Button
              variant="outlined"
              title="-"
              style={styles.button}
              onPress={() => {
                setReponsesUpdate(() => {
                  if (reponsesUpdate.length > 2) {
                    let array = [];
                    for (let i = 0; i < reponsesUpdate.length - 1; i++) {
                      array.push(reponsesUpdate[i]);
                    }
                    return array;
                  }
                  return reponsesUpdate;
                });
              }}
            />

            <Button
              variant="outlined"
              title="+"
              style={styles.button}
              onPress={() => {
                setReponsesUpdate([...reponsesUpdate, ""]);
              }}
            />
          </View>

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
}
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
