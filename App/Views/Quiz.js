import * as React from 'react';
import {useState} from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, StatusBar, SafeAreaView, Modal} from 'react-native';
import Card from '../components/card';
import Question from '../Models/Question';

export default function Quiz( {navigation} ) {




  const question1 = new Question(1, 'Quelle est la surface de la terre ?',['10','20','30','40'], '10', 1);
  const question2 = new Question(1, 'Quelle est la masse de la terre ?',['10', '15','20'], '15', 1);

  const data = [question1, question2];
  const allQuestions = data;
  const [CurrentQuestionIndex, SetCurrentQuestionIndex] = useState(0);
  const [CurrentOptionSelected, SetCurrentOptionSelected] = useState(null);
  const [CorrectOption, SetCorrectOption] = useState(null);
  const [IsOptionDisabled, SetIsOptionDisabled] = useState(false);
  const [Score, SetScore] = useState(0);
  const [ShowNextButton, SetShowNextButton] = useState(false);
  const [ShowScore, SetShowScore] = useState(false);
  const [ShouldShow, SetShouldShow] = useState(false);

  const validateAnswer = (selectedOption) => {
     let correct_option = allQuestions[CurrentQuestionIndex]['correct_option'];
     SetCurrentOptionSelected(selectedOption);
     SetCorrectOption(correct_option);
     SetIsOptionDisabled(true);
     if(selectedOption==correct_option){
      SetScore(Score+1);
     }
     SetShowNextButton(true);
  }

  const renderQuestion = () =>{
    return (
      <View>
        {/*Question counter*/}
        <View style={{ 
          flexDirection : 'row',
          alignItems: 'flex-end'
        }}>
          <Text style={{color: 'white', fontSize: 20, opacity: 0.6, marginTop:12}}>{CurrentQuestionIndex+1} </Text>
          <Text style={{color: 'white', fontSize: 18, opacity: 0.6}}>/ {allQuestions.length}</Text>
        </View>

        <Text style={{
          color: 'white', fontSize:30
        }}>
          {
            allQuestions[CurrentQuestionIndex]?.question
          }
        </Text>
      </View>
    )
  }

  const renderOptions = () =>{
    return (
      <View>
        {
            allQuestions[CurrentQuestionIndex].options.map(option =>(
              <TouchableOpacity
              onPress={()=> validateAnswer(option)}
              disabled={IsOptionDisabled}
              key={option}
              style={{
                borderWidth:3 , 
                borderColor: option==CorrectOption ? 'green' : 
                option==CurrentOptionSelected ? 'red' : 'blue',
                backgroundColor: 'black', 
                height: 60, borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center', justifyContent : 'space-between',
                paddingHorizontal: 20,
                marginVertical:10
              }}
              >
                <Text style={{fontSize:20 , color: 'white'}}>{option}</Text>

                {
                  option == CorrectOption ? (
                    <View style={{ 
                      width: 30, height: 30, borderRadius: 30/2,
                      backgroundColor:'green',
                      justifyContent: 'center', alignItems: 'center'
                    }}>
                      <Text>Vrai</Text>
                    </View >
                  ) : option == CurrentOptionSelected ? (
                    <View style={{ 
                      width: 30, height: 30, borderRadius: 30/2,
                      backgroundColor:'red',
                      justifyContent: 'center', alignItems: 'center'
                    }}>
                      <Text>Faux</Text>
                    </View>
                  ) : null
                }
              </TouchableOpacity>
            ))         
        }
      </View>
    )}

  const retry = () => {
    SetShowScore(false);

    SetCurrentQuestionIndex(0);
    SetScore(0);

    SetCurrentOptionSelected(null);
    SetCorrectOption(null);
    SetIsOptionDisabled(false);
    SetShowNextButton(false);
  }

  const goToHome = () => {
    navigation.navigate('Home');
    retry();
  }

  const renderScore = () => {
    return(
      <Modal 
      animationType="Slide"
      transparent={true}
      visible={ShowScore}>
        <View style={{
          backgroundColor:'black',
          flex: 1,  
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <View style={{
            backgroundColor:'#CEC2FF',
            width: '90%',
            borderRadius: 20,
            padding: 20,
            alignItems: 'center'
            }}>
              <Text style={{fontWeight: 'bold', fontSize : 20, color:'blue'}}>{Score > (allQuestions.length/2) ? 'Congratulations!' : 'Failed!'}</Text>
              <View>
                <Text>{Score} / {allQuestions.length}</Text>
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
    )}

  const handleNext = () => {
    if(CurrentQuestionIndex == allQuestions.length-1){
      SetShowScore(true);
    }else{
      SetCurrentQuestionIndex(CurrentQuestionIndex+1);
      SetCurrentOptionSelected(null);
      SetCorrectOption(null);
      SetIsOptionDisabled(false);
      SetShowNextButton(false);
    }
  }

  const renderNextButton = () => {
    if (ShowNextButton) {
      return(
      <TouchableOpacity onPress={handleNext}>
        <View style={{marginTop:20, width:'100%', backgroundColor:'green', padding:20, borderRadius:20}}>
          <Text style={{fontSize : 20, color: 'white', textAlign:'center'}}>Next</Text>
        </View>
      </TouchableOpacity>
      )
    }
    else{
      return null;
    }   
  }

  const showQuiz = () => {
    SetShouldShow(true);
  }

  return (
    <SafeAreaView style={{ flex : 1}}>
        <View>

          <Button title="Show" onPress={showQuiz}></Button>

          {        
          ShouldShow ? (
            <View>
              {renderQuestion()}

              {renderOptions()}

              {renderNextButton()}

              {renderScore()}
            </View>
            ) : null         
        }

            
          
            
        </View>
    </SafeAreaView>
  );
}


