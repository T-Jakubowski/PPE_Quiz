import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Modal, ScrollView } from "react-native";
import { Button } from "@react-native-material/core";
import OwnTextInput from "../components/TextInput";
import axios from "axios";
import { BASE_API } from "@env";
import DisplayQuizzes from "../components/DisplayQuizzes";

const Gestion_User = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [users, setUsers] = useState();

  const [usersIdToUpdate, setUsersIdToUpdate] = useState("");
  const [userFirstNameToUpdate, setUserFirstNameToUpdate] = useState("");
  const [userLastNameToUpdate, setUserLastNameToUpdate] = useState("");

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

  const onPressAdd = async () => {
    const url = `${BASE_API}/users/create`;
    console.log(url);
    const body = `lastName=${lastName}&firstName=${firstName}`;
    const response = await axios
      .post(url, body)
      .catch((error) => console.log(error));
    console.log(response.data);
    getUsers();
    setIsVisibleAdd(false);
  };

  const onPressDelete = async (id) => {
    const url = `${BASE_API}/users/delete/${id}`;
    const response = await axios
      .delete(url)
      .catch((error) => console.log(error));
    getUsers();
  };

  const onPressUpdate = async () => {
    const url = `${BASE_API}/users/update/${usersIdToUpdate}`;
    console.log(url);
    const body = `firstName=${userFirstNameToUpdate}&lastName=${userLastNameToUpdate}`;
    const response = await axios
      .patch(url, body)
      .catch((error) => console.log(error));
    getUsers();
    setIsVisibleUpdate(false);
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
                    onPressDelete={() => onPressDelete(quiz._id)}
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

      <Modal animationType="slide" transparent={true} visible={isVisibleAdd}>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <OwnTextInput label="Theme" onChangeText={setFirstName} />
          <OwnTextInput label="Name" onChangeText={setLastName} />
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
            onChangeText={setUserLastNameToUpdate}
            value={userLastNameToUpdate}
          />
          <OwnTextInput
            label="Name"
            onChangeText={setUserFirstNameToUpdate}
            value={userFirstNameToUpdate}
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
export default Gestion_User;
