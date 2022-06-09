import React, { useState, useEffect } from "react";
import { stringMd5 } from "react-native-quick-md5";

import { Text, View, StyleSheet, Modal, ScrollView } from "react-native";
import { Button } from "@react-native-material/core";
import OwnTextInput from "../components/TextInput";
import axios from "axios";
import { BASE_API } from "@env";
import DisplayQuizzes from "../components/DisplayQuizzes";
import ConfirmationModal from "../components/ConfimationModal";

const Gestion_User = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [users, setUsers] = useState();
  const [roles, setRoles] = useState();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");

  const [isVisibleDelete, setIsVisibleDelete] = useState(false);
  const [userIdDelete, setUserIdDelete] = useState(false);

  const [usersIdToUpdate, setUsersIdToUpdate] = useState(false);
  const [userFirstNameToUpdate, setUserFirstNameToUpdate] = useState("");
  const [userLastNameToUpdate, setUserLastNameToUpdate] = useState("");
  const [userLoginToUpdate, setUserLoginToUpdate] = useState("");
  const [userPasswordToUpdate, setUserPasswordToUpdate] = useState("");
  const [userRoleIdToUpdate, setUserRoleIdToUpdate] = useState("");

  const [isVisibleAdd, setIsVisibleAdd] = useState(false);
  const [isVisibleUpdate, setIsVisibleUpdate] = useState(false);

  const urlGetUsers = `${BASE_API}/users/readall`;

  const getUsers = async () =>
    await axios
      .get(urlGetUsers)
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));

  const urlGetRoles = `${BASE_API}/roles/readall`;
  const getRoles = async () =>
    await axios
      .get(urlGetRoles)
      .then((response) => setRoles(response.data))
      .catch((error) => console.log(error));

  useEffect(() => {
    getUsers();
    getRoles();
  }, []);

  const isValidUpdate = () => {
    return (
      userFirstNameToUpdate &&
      userLastNameToUpdate &&
      userPasswordToUpdate.length > 7
    );
  };

  const isSameLogin = () => {
    var verification = false;
    users.map((user) => {
      if (user._id == login) {
        verification = true;
      }
    });
    return verification;
  };

  const IsSameRole = () => {
    var verification = false;
    roles.map((role) => {
      if (role._id == roleId) {
        verification = true;
      }
    });
    return verification;
  };

  const IsSameRoleUpdate = () => {
    var verification = false;
    roles.map((role) => {
      if (role._id == userRoleIdToUpdate) {
        verification = true;
      }
    });
    return verification;
  };
  const isValidAdd = () => {
    return (
      firstName &&
      lastName &&
      login &&
      password.length > 7 &&
      IsSameRole() &&
      !isSameLogin()
    );
  };

  const onPressAdd = async () => {
    if (isValidAdd()) {
      const url = `${BASE_API}/users/create`;
      const passwordHash = stringMd5(password);
      const body = `lastName=${lastName}&firstName=${firstName}&password=${passwordHash}&_id=${login}&role_id=${roleId}`;
      console.log(body);
      const response = await axios
        .post(url, body)
        .catch((error) => console.log(error));
      console.log(response.data);
      getUsers();
      setIsVisibleAdd(false);
      setPassword("");
      setLogin("");
      setFirstName("");
      setLastName("");
      setRoleId("");
    }
  };

  const onPressDelete = async (id) => {
    const url = `${BASE_API}/users/delete/${id}`;
    const response = await axios
      .delete(url)
      .catch((error) => console.log(error));
    getUsers();
  };

  const onPressUpdate = async () => {
    if (isValidUpdate() && IsSameRoleUpdate()) {
      const url = `${BASE_API}/users/update/${usersIdToUpdate}`;
      const passwordHash = stringMd5(userPasswordToUpdate);
      const body = `firstName=${userFirstNameToUpdate}&lastName=${userLastNameToUpdate}&_id=${userLoginToUpdate}&password=${passwordHash}&role_id=${userRoleIdToUpdate}`;
      console.log(body);
      const response = await axios
        .patch(url, body)
        .catch((error) => console.log(error));
      getUsers();
      setIsVisibleUpdate(false);
      setUserFirstNameToUpdate("");
      setUserLastNameToUpdate("");
      setUserLoginToUpdate("");
      setUserPasswordToUpdate("");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {users
          ? users.map((quiz) => {
              return (
                <View>
                  <DisplayQuizzes
                    key={quiz._id.toString()}
                    text={quiz.firstName}
                    title={quiz.lastName}
                    textBottom={quiz.role}
                    onPressDelete={() => {
                      setIsVisibleDelete(true);
                      setUserIdDelete(quiz._id);
                    }}
                    onPressUpdate={() => {
                      setIsVisibleUpdate(true);
                      setUsersIdToUpdate(quiz._id);
                      setUserFirstNameToUpdate(quiz.firstName);
                      setUserLastNameToUpdate(quiz.lastName);
                      setUserRoleIdToUpdate(quiz.role_id);
                      setUserLoginToUpdate(quiz._id);
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
          onPressDelete(userIdDelete);
          setIsVisibleDelete(false);
        }}
      />

      <Modal animationType="slide" transparent={true} visible={isVisibleAdd}>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <OwnTextInput
            label="Prenom"
            onChangeText={setFirstName}
            value={firstName}
          />
          <OwnTextInput
            label="Nom"
            onChangeText={setLastName}
            value={lastName}
          />
          <OwnTextInput
            label="Login"
            onChangeText={(text) => {
              setLogin(text);
            }}
            value={login}
          />
          <OwnTextInput
            label="Password"
            onChangeText={setPassword}
            isPassword={true}
            value={password}
          />
          <OwnTextInput
            label="Role"
            onChangeText={(text) => {
              setRoleId(text);
            }}
            value={roleId}
          />
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
              onPress={() => {
                onPressAdd();
              }}
              disabled={!isValidAdd()}
            />
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={isVisibleUpdate}>
        <View style={{ backgroundColor: "white", flex: 1 }}>
        <OwnTextInput
            label="Identifiant"
            value={userLoginToUpdate}
            disable={true}
          />
          <OwnTextInput
            label="Nom"
            onChangeText={setUserLastNameToUpdate}
            value={userLastNameToUpdate}
          />
          <OwnTextInput
            label="Prenom"
            onChangeText={setUserFirstNameToUpdate}
            value={userFirstNameToUpdate}
          />
          <OwnTextInput
            label="Password"
            onChangeText={setUserPasswordToUpdate}
            isPassword={true}
            value={userPasswordToUpdate}
          />
          <OwnTextInput
            label="Role Id"
            onChangeText={setUserRoleIdToUpdate}
            value={userRoleIdToUpdate}
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
              onPress={() => {
                onPressUpdate();
              }}
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
});
export default Gestion_User;
