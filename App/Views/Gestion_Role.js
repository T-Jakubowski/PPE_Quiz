import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Modal, ScrollView } from "react-native";
import { Button } from "@react-native-material/core";
import OwnTextInput from "../components/TextInput";
import axios from "axios";
import { BASE_API } from "@env";
import DisplayQuizzes from "../components/DisplayQuizzes";
import ConfimationModal from "../components/ConfimationModal";

const Gestion_Role = () => {
  const [permission, setPermission] = useState("");
  const [name, setName] = useState("");
  const [roles, setRoles] = useState();
  const [roleId, setRoleId] = useState("");

  const [isVisibleDelete, setIsVisibleDelete] = useState(false);
  const [roleIdDelete, setRoleIdDelete] = useState(false);

  const [roleIdToUpdate, setRoleIdToUpdate] = useState("");
  const [roleNameToUpdate, setRoleNameToUpdate] = useState("");
  const [roleThemeToUpdate, setRoleThemeToUpdate] = useState("");

  const [isVisibleAdd, setIsVisibleAdd] = useState(false);
  const [isVisibleUpdate, setIsVisibleUpdate] = useState(false);

  const urlGetRoles = `${BASE_API}/roles/readall`;

  const isValidAdd = () => {
    const permissionRegex = /[0-1]{8}/;
    const roleIdRegex = /^\d+$/;

    return (
      name &&
      permissionRegex.test(permission) &&
      permission.length == 8 &&
      roleIdRegex.test(roleId)
    );
  };

  const isValidUpdate = () => {
    const permissionRegex = /[0-1]{8}/;
    return (
      roleNameToUpdate &&
      permissionRegex.test(roleThemeToUpdate) &&
      roleThemeToUpdate.length == 8
    );
  };

  const getRoles = async () =>
    await axios
      .get(urlGetRoles)
      .then((response) => setRoles(response.data))
      .catch((error) => console.log(error));

  useEffect(() => {
    getRoles();
  }, []);

  const isSameId = () => {
    var verification = false;
    roles.map((role) => {
      if (role._id == roleId) {
        verification = true;
      }
    });
    return verification;
  };

  const onPressAdd = async () => {
    if (isValidAdd && !isSameId()) {
      const url = `${BASE_API}/roles/create`;
      const body = `name=${name}&permission=${permission}&_id=${roleId}`;
      const response = await axios
        .post(url, body)
        .catch((error) => console.log(error));
      console.log(response.data);
      getRoles();
      setIsVisibleAdd(false);
      setName("");
      setPermission("");
      setRoleId("");
    }
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
    const body = `name=${roleNameToUpdate}&permission=${roleThemeToUpdate}`;
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
                    key={quiz._id}
                    title={"N° " + quiz._id}
                    text={quiz.name}
                    textBottom={quiz.permission}
                    onPressDelete={() => {
                      setIsVisibleDelete(true), setRoleIdDelete(quiz._id);
                    }}
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

      <ConfirmationModal
        text={"Êtes-vous sur de vouloir le supprimer ?"}
        isVisible={isVisibleDelete}
        onPressNo={() => setIsVisibleDelete(false)}
        onPressYes={() => {
          onPressDelete(roleIdDelete);
          setIsVisibleDelete(false);
        }}
      />

      <Modal animationType="slide" transparent={true} visible={isVisibleAdd}>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <OwnTextInput label="Id" onChangeText={setRoleId} value={roleId} />
          <OwnTextInput
            label="Permission"
            onChangeText={setPermission}
            value={permission}
          />
          <OwnTextInput label="Name" onChangeText={setName} value={name} />
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
              disabled={!isValidAdd()}
            />
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={isVisibleUpdate}>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <OwnTextInput
            label="Permission"
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
              onPress={() => setIsVisibleUpdate(false)}
            />

            <Button
              variant="outlined"
              title="Valider"
              onPress={() => onPressUpdate()}
              disabled={!isValidUpdate()}
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
  button: {
    marginBottom: 16,
    marginHorizontal: '30%',
  }
});
export default Gestion_Role;
