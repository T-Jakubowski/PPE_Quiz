import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button } from "@react-native-material/core";

export default ConfirmationModal = ({
  text,
  onPressNo,
  onPressYes,
  isVisible,
  style,
}) => {
  return (
    <>
      {isVisible ? (
        <View style={[style, styles.container]}>
          <Text>{text}</Text>
          <View style={styles.row}>
            <Button style={styles.button} variant="outlined" title="Non" onPress={() => onPressNo()} />
            <Button style={styles.button} variant="outlined" title="Oui" onPress={() => onPressYes()} />
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    position: "absolute",
    justifyContent: "center",
    marginLeft: "20%",
    marginTop: "50%",
    alignItems: "center",
    width: 200,
    height: 100,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    marginHorizontal: 10,
    marginTop: 16
  }
});
