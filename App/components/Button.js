import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React,{useState} from "react";


export default OwnButton = ({ text }) => {

    const [isFocus, setIsFocus] = useState(false);

  return (
    <TouchableOpacity style={isFocus ? styles.buttonFocus: styles.buttonNotFocus}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    buttonFocus: {
    backgroundColor: "blue",
    borderRadius: 16,
    height: 40,
    width: "30%",
    alignContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    textAlignVertical: 'center',
  },
  buttonNotFocus: {
    backgroundColor: "blue",
    borderRadius: 16,
    height: 40,
    width: "30%",
    alignContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    textAlignVertical: 'center',
  },
});
