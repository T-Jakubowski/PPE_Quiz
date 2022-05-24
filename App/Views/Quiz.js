import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
import Question from "../Models/Question";
import axios from "axios";
import { BASE_API } from "@env";
import DisplayQuizzes from "../components/DisplayQuizzes";

export default function Quiz({ navigation }) {
  const [quizzes, setQuizzes] = useState();
  const urlGetQuiz = `${BASE_API}/quiz/readall`;
  const getQuizzes = async () =>
    await axios
      .get(urlGetQuiz)
      .then((response) => setQuizzes(response.data))
      .catch((error) => console.log(error)).data;

  useEffect(() => {
    getQuizzes();
  }, []);

  const [show, setShow] = useState(true);
  const [allQuestions, setAllQuestions] = useState([]);
  const [CurrentQuestionIndex, SetCurrentQuestionIndex] = useState(0);
  const [CurrentOptionSelected, SetCurrentOptionSelected] = useState(null);
  const [CorrectOption, SetCorrectOption] = useState(null);
  const [IsOptionDisabled, SetIsOptionDisabled] = useState(false);
  const [Score, SetScore] = useState(0);
  const [ShowNextButton, SetShowNextButton] = useState(false);
  const [ShowScore, SetShowScore] = useState(false);
  const [ShouldShow, SetShouldShow] = useState(false);

  const validateAnswer = (selectedOption) => {
    let correct_option = allQuestions[CurrentQuestionIndex]["correct_option"];
    SetCurrentOptionSelected(selectedOption);
    SetCorrectOption(correct_option);
    SetIsOptionDisabled(true);
    if (selectedOption == correct_option) {
      SetScore(Score + 1);
    }
    SetShowNextButton(true);
  };

  const renderQuestion = () => {
    return (
      <View>
        {/*Question counter*/}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              opacity: 0.6,
              marginTop: 12,
            }}
          >
            {CurrentQuestionIndex + 1}{" "}
          </Text>
          <Text style={{ color: "white", fontSize: 18, opacity: 0.6 }}>
            / {allQuestions.length}
          </Text>
        </View>

        <Text
          style={{
            color: "white",
            fontSize: 30,
          }}
        >
          {allQuestions[CurrentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };

  const renderOptions = () => {
    return (
      <View>
        {allQuestions[CurrentQuestionIndex].options.map((option) => (
          <TouchableOpacity
            onPress={() => validateAnswer(option)}
            disabled={IsOptionDisabled}
            key={option}
            style={{
              borderWidth: 3,
              borderColor:
                option == CorrectOption
                  ? "green"
                  : option == CurrentOptionSelected
                  ? "red"
                  : "blue",
              backgroundColor: "black",
              height: 60,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 20, color: "white" }}>{option}</Text>

            {option == CorrectOption ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: "green",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Vrai</Text>
              </View>
            ) : option == CurrentOptionSelected ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: "red",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Faux</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const retry = () => {
    SetShowScore(false);

    SetCurrentQuestionIndex(0);
    SetScore(0);

    SetCurrentOptionSelected(null);
    SetCorrectOption(null);
    SetIsOptionDisabled(false);
    SetShowNextButton(false);
    setShow(true);
    SetShouldShow(false);
  };

  const goToHome = () => {
    navigation.navigate("Home");
    retry();
  };

  const renderScore = () => {
    return (
      <Modal animationType="Slide" transparent={true} visible={ShowScore}>
        <View
          style={{
            backgroundColor: "black",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#CEC2FF",
              width: "90%",
              borderRadius: 20,
              padding: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "blue" }}>
              {Score > allQuestions.length / 2 ? "Congratulations!" : "Failed!"}
            </Text>
            <View>
              <Text>
                {Score} / {allQuestions.length}
              </Text>
              <TouchableOpacity onPress={retry}>
                <Text>Retry</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={goToHome}>
                <Text>Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const handleNext = () => {
    if (CurrentQuestionIndex == allQuestions.length - 1) {
      SetShowScore(true);
    } else {
      SetCurrentQuestionIndex(CurrentQuestionIndex + 1);
      SetCurrentOptionSelected(null);
      SetCorrectOption(null);
      SetIsOptionDisabled(false);
      SetShowNextButton(false);
    }
  };

  const renderNextButton = () => {
    if (ShowNextButton) {
      return (
        <TouchableOpacity onPress={handleNext}>
          <View
            style={{
              marginTop: 20,
              width: "100%",
              backgroundColor: "green",
              padding: 20,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>
              Next
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const showQuiz = async (idQuiz) => {
    const urlGetQuestions = `${BASE_API}/questions/readall/${idQuiz}`;
    const getQuestions = await axios
      .get(urlGetQuestions)
      .then((response) => {
        setAllQuestions(response.data);
      })
      .catch((error) => console.log(error)).data;
    setShow(false);
    SetShouldShow(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        {quizzes && show
          ? quizzes.map((quiz) => {
              return (
                <View>
                  <DisplayQuizzes
                    key={quiz._id.toString()}
                    name={quiz.name}
                    theme={quiz.theme}
                    onPressView={() => showQuiz(quiz._id)}
                  />
                </View>
              );
            })
          : null}

        {ShouldShow ? (
          <View>
            {renderQuestion()}

            {renderOptions()}

            {renderNextButton()}

            {renderScore()}
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
