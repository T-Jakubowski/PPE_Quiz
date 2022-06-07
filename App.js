import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
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

export default function App() {
  const Drawer = createDrawerNavigator();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [can, setCan] = useState(false);

  const auth = async () => {
    const url = `${BASE_API}/users/login`;
    console.log(url);
    const passwordHash = stringMd5(password);
    const body = `password=${passwordHash}&login=${login}`;
    const response = await axios
      .post(url, body)
      .then((response) => { if(response.data.length > 0){setCan(true)} console.log(response.data) })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {can ? (
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Login">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Quiz" component={Quiz} />
            <Drawer.Screen name="Gestion des quiz" component={Gestion_Quiz} />
            <Drawer.Screen name="Gestion des roles" component={Gestion_Role} />
            <Drawer.Screen
              name="Gestion_Question"
              component={Gestion_Question}
              options={{
                drawerItemStyle: { display: "none" },
              }}
            />
            <Drawer.Screen name="Gestion des users" component={Gestion_User} />
          </Drawer.Navigator>
        </NavigationContainer>
      ) : (
        <View>
          <OwnTextInput label="Login" onChangeText={setLogin} />
          <OwnTextInput label="Password" onChangeText={setPassword} />
          <Button
            variant="outlined"
            title="Connection"
            style={styles.button}
            onPress={auth}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginBottom: 24,
  },
});
