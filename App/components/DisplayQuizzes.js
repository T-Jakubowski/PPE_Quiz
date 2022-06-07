import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Button } from "@react-native-material/core";

export default DisplayQuizzes = ({
  key,
  theme,
  name,
  onPressView,
  onPressDelete,
  onPressUpdate,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressView} key={key}>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.theme}>{theme}</Text>
          <Text>{name}</Text>
        </View>

        <View style={styles.row}>
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
            />
          ) : null}
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
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  textContainer: {
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  theme: {
    fontWeight: "bold",
    fontSize: 16,
  },
  onPressDelete: {},
});
