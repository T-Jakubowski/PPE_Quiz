import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./App/Views/Home";
import Quiz from "./App/Views/Quiz";
import Gestion_Quiz from "./App/Views/Gestion_Quiz";
import Gestion_Role from "./App/Views/Gestion_Role";
import Gestion_User from "./App/Views/Gestion_User";
import Gestion_Question from "./App/Views/Gestion_Question";

export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
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
  );
}

/*import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { FlatList } from 'react-native-web';
import {TabNavigator} from 'react-navigation';
import Home from './App/Views/Home';

export default function App() {

  const Tabs = TabNavigator({
    Home: {screen: Home}
  })


  return (
    <View>
      <Tabs/>
    </View> 
  );
}*/
