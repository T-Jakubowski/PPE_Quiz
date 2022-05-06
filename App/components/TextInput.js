import { StyleSheet, TextInput, Text, View } from "react-native";
import React, { useState } from "react";

export default OwnTextInput = ({
  value,
  placeholder,
  onChangeText,
  style,
  label,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={styles.view}>
      <Text>{label}</Text>
      <TextInput
        style={[isFocus ? styles.inputFocus : null, styles.input, style]}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 12,
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
