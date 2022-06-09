import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Button } from "@react-native-material/core";

export default DisplayQuizzes = ({
  key,
  title,
  text,
  onPressView,
  onPressDelete,
  onPressUpdate,
  textBottom,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressView} key={key}>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
          {textBottom ? (
            <Text style={styles.textRight}>{textBottom}</Text>
          ) : null}
        </View>
        <View>
          <View style={styles.buttonContainer}>
            {onPressUpdate ? (
              <Button
                onPress={onPressUpdate}
                variant="outlined"
                title="Modifier"
              />
            ) : null}
            {onPressDelete ? (
              <Button
                onPress={onPressDelete}
                variant="outlined"
                title="Supprimer"
                style={styles.button}
              />
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  container: {
    backgroundColor: "#b2c8eb",
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  textContainer: {
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    marginVertical: 8,
  },
  text: {
    paddingBottom: 4,
  },
  textRight: {
    paddingVertical: 8,
    paddingRight: 8,
  },
  buttonContainer: {
    paddingVertical: 8,
  },
  button: {
    marginTop: 4,
  },
});
