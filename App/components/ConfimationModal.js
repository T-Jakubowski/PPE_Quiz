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
            <Button variant="outlined" title="Non" onPress={() => onPressNo()} />
            <Button variant="outlined" title="Oui" onPress={() => onPressYes()} />
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "30%",
    marginVertical: "50%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
