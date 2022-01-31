import * as React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../Views/Home';
import Quiz from '../Views/Quiz';
import Gestion_Quiz from '../Views/Gestion_Quiz';
import Gestion_Role from '../Views/Gestion_Role';
import Gestion_User from '../Views/Gestion_User';

const screens = createStackNavigator( {
    Home : { screen: Home},
    Quiz : { screen: Quiz},
    Gestion_Quiz : { screen: Gestion_Quiz},
    Gestion_Role : { screen: Gestion_Role},
    Gestion_User : { screen: Gestion_User}
});

export default createAppContainer(screens);