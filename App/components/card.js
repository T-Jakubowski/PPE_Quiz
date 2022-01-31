import react from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-web';

export default function Card(props, test) {

  const validateAnswer = (selectedAnswer) =>{
    console.log(selectedAnswer);
  }

  return (
    <TouchableOpacity onPress={validateAnswer(test.children)}>
        <View style={styles.card}>
            <Text>{props.children}</Text>
        </View>
    </TouchableOpacity>
  );

  
}




const styles = StyleSheet.create({
    card: {
        borderWidth: 3, borderColor: '#424FE0',
        backgroundColor: '#6370FF',
        height: 60, borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    cardContent: {

    }
});