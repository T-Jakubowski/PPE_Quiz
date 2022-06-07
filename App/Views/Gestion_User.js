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
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [isVisibleDelete, setIsVisibleDelete] = useState(false);
  const [userIdDelete, setUserIdDelete] = useState(false);

  const [usersIdToUpdate, setUsersIdToUpdate] = useState("");
  const [userFirstNameToUpdate, setUserFirstNameToUpdate] = useState("");
  const [userLastNameToUpdate, setUserLastNameToUpdate] = useState("");
  const [userLoginToUpdate, setUserLoginToUpdate] = useState("");
  const [userPasswordToUpdate, setUserPasswordToUpdate] = useState("");

  const [isVisibleAdd, setIsVisibleAdd] = useState(false);
  const [isVisibleUpdate, setIsVisibleUpdate] = useState(false);

  const urlGetUsers = `${BASE_API}/users/readall`;

  const getUsers = async () =>
    await axios
      .get(urlGetUsers)
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));

  useEffect(() => {
    getUsers();
  }, []);

  const isValidUpdate = () => {
    return (
      userFirstNameToUpdate &&
      userLastNameToUpdate &&
      userLoginToUpdate &&
      userPasswordToUpdate.length > 7
    );
  };

  const isValidAdd = () => {
    return firstName && lastName && login && password.length > 7;
  };

  const onPressAdd = async () => {
    if (isValidAdd()) {
      const url = `${BASE_API}/users/create`;
      const passwordHash = stringMd5(password);
      console.log(url);
      const body = `lastName=${lastName}&firstName=${firstName}&password=${passwordHash}&login=${login}`;
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
    if (isValidUpdate()) {
      const url = `${BASE_API}/users/update/${usersIdToUpdate}`;
      const passwordHash = stringMd5(userPasswordToUpdate);
      const body = `firstName=${userFirstNameToUpdate}&lastName=${userLastNameToUpdate}&login=${userLoginToUpdate}&password=${passwordHash}`;
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
                    name={quiz.firstName}
                    theme={quiz.lastName}
                    onPressView={() =>
                      navigation.navigate("Gestion_Question", quiz)
                    }
                    onPressDelete={() => {setIsVisibleDelete(true); setUserIdDelete(quiz._id)}}
                    onPressUpdate={() => {
                      setIsVisibleUpdate(true);
                      setUsersIdToUpdate(quiz._id);
                      setUserFirstNameToUpdate(quiz.firstName);
                      setUserLastNameToUpdate(quiz.lastName);
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
          <OwnTextInput label="Login" onChangeText={setLogin} value={login} />
          <OwnTextInput
            label="Password"
            onChangeText={setPassword}
            isPassword={true}
            value={password}
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
            label="Theme"
            onChangeText={setUserLastNameToUpdate}
            value={userLastNameToUpdate}
          />
          <OwnTextInput
            label="Name"
            onChangeText={setUserFirstNameToUpdate}
            value={userFirstNameToUpdate}
          />
          <OwnTextInput
            label="Login"
            onChangeText={setUserLoginToUpdate}
            value={userLoginToUpdate}
          />
          <OwnTextInput
            label="Password"
            onChangeText={setUserPasswordToUpdate}
            isPassword={true}
            value={userPasswordToUpdate}
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
