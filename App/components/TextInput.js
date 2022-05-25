import { StyleSheet, TextInput, Text, View } from "react-native";
import React, { useState } from "react";

export default OwnTextInput = ({
  key,
  value,
  placeholder,
  onChangeText,
  style,
  label,
  errorMsg,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={styles.view}>
      <Text>{label}</Text>
      <TextInput
        key={key}
        style={[isFocus ? styles.inputFocus : null, styles.input, style]}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      {errorMsg ? (<Text style={styles.errorMsg}>{errorMsg}</Text>) : null }
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 12,
  },
  errorMsg: {
    color: 'red',
  },
  input: {
    paddingLeft: 8,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
  },
  inputFocus: {
    borderColor: "#6A1B9A",
    backgroundColor: "#F3E5F5",
  },
});
