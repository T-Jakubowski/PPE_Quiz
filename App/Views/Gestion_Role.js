import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Modal, ScrollView } from "react-native";
import { Button } from "@react-native-material/core";
import OwnTextInput from "../components/TextInput";
import axios from "axios";
import { BASE_API } from "@env";
import DisplayQuizzes from "../components/DisplayQuizzes";

const Gestion_Role = ({ navigation }) => {
  const [permission, setPermission] = useState("");
  const [name, setName] = useState("");
  const [roles, setRoles] = useState();

  const [roleIdToUpdate, setRoleIdToUpdate] = useState("");
  const [roleNameToUpdate, setRoleNameToUpdate] = useState("");
  const [roleThemeToUpdate, setRoleThemeToUpdate] = useState("");

  const [isVisibleAdd, setIsVisibleAdd] = useState(false);
  const [isVisibleUpdate, setIsVisibleUpdate] = useState(false);

  const urlGetRoles = `${BASE_API}/roles/readall`;

  const getRoles = async () =>
    await axios
      .get(urlGetRoles)
      .then((response) => setRoles(response.data))
      .catch((error) => console.log(error));

  useEffect(() => {
    getRoles();
  }, []);

  const onPressAdd = async () => {
    const url = `${BASE_API}/roles/create`;
    const body = `name=${name}&permission=${permission}`;
    const response = await axios
      .post(url, body)
      .catch((error) => console.log(error));
    console.log(response.data);
    getRoles();
    setIsVisibleAdd(false);
  };

  const onPressDelete = async (id) => {
    const url = `${BASE_API}/roles/delete/${id}`;
    const response = await axios
      .delete(url)
      .catch((error) => console.log(error));
    getRoles();
  };

  const onPressUpdate = async () => {
    const url = `${BASE_API}/roles/update/${roleIdToUpdate}`;
    console.log(url);
    const body = `name=${roleNameToUpdate}&theme=${roleThemeToUpdate}`;
    const response = await axios
      .patch(url, body)
      .catch((error) => console.log(error));
    getRoles();
    setIsVisibleUpdate(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {roles
          ? roles.map((quiz) => {
              return (
                <View>
                  <DisplayQuizzes
                    key={quiz._id.toString()}
                    name={quiz.name}
                    theme={quiz.permission}
                    onPressDelete={() => onPressDelete(quiz._id)}
                    onPressUpdate={() => {
                      setIsVisibleUpdate(true);
                      setRoleIdToUpdate(quiz._id);
                      setRoleNameToUpdate(quiz.name);
                      setRoleThemeToUpdate(quiz.permission);
                    }}
                  />
                </View>
              );
            })
          : null}
      </ScrollView>

      <Button
        variant="outlined"
        title="Ajouter"
        style={styles.button}
        onPress={() => {
          setIsVisibleAdd(true);
        }}
      />

      <Modal animationType="slide" transparent={true} visible={isVisibleAdd}>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <OwnTextInput label="Permission" onChangeText={setPermission} />
          <OwnTextInput label="Name" onChangeText={setName} />
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
            />
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={isVisibleUpdate}>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <OwnTextInput
            label="Theme"
            onChangeText={setRoleThemeToUpdate}
            value={roleThemeToUpdate}
          />
          <OwnTextInput
            label="Name"
            onChangeText={setRoleNameToUpdate}
            value={roleNameToUpdate}
          />
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
};

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
export default Gestion_Role;
