import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { Button } from "@react-native-material/core";
import OwnTextInput from "./App/components/TextInput";
import axios from "axios";
import { BASE_API } from "@env";
import Home from "./App/Views/Home";
import Quiz from "./App/Views/Quiz";
import Gestion_Quiz from "./App/Views/Gestion_Quiz";
import Gestion_Role from "./App/Views/Gestion_Role";
import Gestion_User from "./App/Views/Gestion_User";
import Gestion_Question from "./App/Views/Gestion_Question";
import { stringMd5 } from "react-native-quick-md5";
import { can } from "./App/Models/Auth";

export default function App() {
  const Drawer = createDrawerNavigator();

  const [login, setLogin] = useState("");
  const [user, setUser] = useState({
    _id: "",
    login: "",
    password: "",
    firstName: "",
    lastName: "",
    role_id: "",
  });

  const [role, setRole] = useState({
    _id: "",
    name: "",
    permission: "",
  });

  const [password, setPassword] = useState("");
  const [isLog, setIsLog] = useState(false);

  const auth = async () => {
    const url = `${BASE_API}/users/login`;
    const passwordHash = stringMd5(password);
    const body = `password=${passwordHash}&_id=${login}`;
    const response = await axios
      .post(url, body)
      .then((response) => {
        if (response.data.length > 0) {
          setUser(response.data[0]);
          setIsLog(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const getPermissions = async () => {
    if (user.role_id) {
      const urlRole = `${BASE_API}/roles/read/${user.role_id}`;
      const getRole = await axios
        .get(urlRole)
        .then((response) => {
          setRole(response.data);
        })
        .catch((error) => console.log(error));
    }
  };
  useEffect(() => {
    getPermissions();
  }, [user]);

  const logOut = () => {
    setUser({
      _id: "",
      login: "",
      password: "",
      firstName: "",
      lastName: "",
      role_id: "",
    });

    setRole({
      _id: "",
      name: "",
      permission: "",
    });

    setIsLog(false);
  };

  return (
    <>
      {isLog ? (
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Login">
            <Drawer.Screen
              name="Quiz"
              component={Quiz}
              initialParams={{ user: user, role: role }}
              options={
                !can(role.permission, "user")
                  ? {
                      drawerItemStyle: { display: "none" },
                    }
                  : null
              }
            />
            <Drawer.Screen
              name="Gestion des quiz"
              component={Gestion_Quiz}
              initialParams={{ user: user, role: role }}
              options={
                !can(role.permission, "manage")
                  ? {
                      drawerItemStyle: { display: "none" },
                    }
                  : null
              }
            />
            <Drawer.Screen
              name="Gestion des roles"
              component={Gestion_Role}
              initialParams={{ user: user, role: role }}
              options={
                !can(role.permission, "admin")
                  ? {
                      drawerItemStyle: { display: "none" },
                    }
                  : null
              }
            />
            <Drawer.Screen
              name="Gestion_Question"
              component={Gestion_Question}
              initialParams={{ user: user, role: role }}
              options={{
                drawerItemStyle: { display: "none" },
              }}
            />
            <Drawer.Screen
              name="Gestion des users"
              component={Gestion_User}
              initialParams={{ user: user, role: role }}
              options={
                !can(role.permission, "admin")
                  ? {
                      drawerItemStyle: { display: "none" },
                    }
                  : null
              }
            />
            <Drawer.Screen
              name="Déconnexion"
              component={App}
              initialParams={{ user: user, role: role }}
              options={
                !can(role.permission, "user")
                  ? {
                      drawerItemStyle: { display: "none" },
                    }
                  : null
              }
              onPress={logOut}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      ) : (
        <View style={styles.container}>
          <OwnTextInput label="Login" onChangeText={setLogin} />
          <OwnTextInput
            label="Password"
            onChangeText={setPassword}
            isPassword={true}
          />
          <Button
            variant="outlined"
            title="Connection"
            style={styles.buttonContainer}
            onPress={auth}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 16,
    marginHorizontal: "20%",
  },
  container: {
    marginTop: "30%",
  },
});
