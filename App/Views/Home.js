import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

export default function Home( {navigation} ) {

    const goToQuiz = () =>{
        navigation.navigate('Quiz');
    }

    const goToManageQuiz = () =>{
        navigation.navigate('Gestion des quiz');
    }

    const goToManageRole = () => {
        navigation.navigate('Gestion des roles');
    }

    const goToManageUser = () => {
        navigation.navigate('Gestion des users');
    }

    const styles = StyleSheet.create({
        lien: {
            borderWidth:3 , 
            borderColor: '#808EFF',
            backgroundColor: '#9DA7F5', 
            height: 60, borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center', justifyContent : 'space-between',
            paddingHorizontal: 20,
            marginVertical:10
        }
      });

  return (
    <View>
        <TouchableOpacity style={styles.lien} onPress={goToQuiz}>
            <Text>Quiz</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.lien} onPress={goToManageQuiz}>
            <Text>Gestion des quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.lien} onPress={goToManageRole}>
            <Text>Gestion des roles</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.lien} onPress={goToManageUser}>
            <Text>Gestion des users</Text>
        </TouchableOpacity>
    </View>
  );
}

