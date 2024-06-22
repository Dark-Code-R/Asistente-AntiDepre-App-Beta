import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type IntroductionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Introduction'>;
type IntroductionScreenRouteProp = RouteProp<RootStackParamList, 'Introduction'>;

type Props = {
  navigation: IntroductionScreenNavigationProp;
  route: IntroductionScreenRouteProp;
};

const IntroductionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { user } = route.params;

  const handleContinue = () => {
    navigation.navigate('Home', { user, conversationName: '' });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/hola.gif')} style={styles.gif} />
      <Text style={styles.title}>¡Hola, {user}!</Text>
      <Text style={styles.text}>
        Soy Nova, tu asistente virtual. Estoy aquí para ayudarte a mantener un diario emocional. Puedes hablar conmigo sobre tus emociones y recibiré tu apoyo.
        Juntos exploraremos tus sentimientos y te proporcionaré consejos y compañía.
      </Text>
      <Button title="Continuar" onPress={handleContinue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000', // Cambiar el fondo a negro
  },
  gif: {
    width: '80%',  // Ajusta el ancho del GIF al 80% del contenedor
    height: 200,    // Ajusta la altura del GIF a 200px (puedes cambiarlo según sea necesario)
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff', // Cambiar el color del texto a blanco
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#ddd', // Cambiar el color del texto a un gris claro
  },
  button: {
    backgroundColor: '#3498db', // Color del botón
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default IntroductionScreen;
