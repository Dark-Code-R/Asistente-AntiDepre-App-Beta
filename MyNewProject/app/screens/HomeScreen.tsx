import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const { user, conversationName } = route.params;
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const handleDialogCancel = () => setSelectedEmotion(null);

  const handleDialogOk = () => {
    let initialMessage = '';
    if (selectedEmotion === 'happy') {
      initialMessage = `Me alegra saber que tu día estuvo bien, ${user}. ¿Qué fue lo mejor de tu día?`;
    } else if (selectedEmotion === 'sad') {
      initialMessage = `Lamento que tu día no haya sido el mejor, ${user}. ¿Qué ocurrió hoy?`;
    } else if (selectedEmotion === 'mad') {
      initialMessage = `Lo siento, ${user}. ¿Qué te hizo enojar hoy?`;
    } else if (selectedEmotion === 'stressed') {
      initialMessage = `Lamento que estés estresado, ${user}. ¿Qué te está preocupando?`;
    } else if (selectedEmotion === 'bored') {
      initialMessage = `¿Qué has estado haciendo hoy, ${user}? Quizás pueda sugerirte algo para hacer.`;
    }

    navigation.navigate('Chat', {
      emotion: selectedEmotion!,
      user,
      initialMessage,
      conversationId: uuidv4(),
      conversationName,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hola, {user}</Text>
        <Text style={styles.headerSubText}>¿Cómo te sientes hoy?</Text>
      </View>
      <View style={styles.emotionsContainer}>
        <TouchableOpacity onPress={() => setSelectedEmotion('happy')} style={styles.emotionButton}>
          <Image source={require('../../assets/images/feliz.jpg')} style={styles.emotionImage} />
          <Text style={styles.emotionText}>Feliz</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedEmotion('mad')} style={styles.emotionButton}>
          <Image source={require('../../assets/images/enojado.jpg')} style={styles.emotionImage} />
          <Text style={styles.emotionText}>Enojado</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedEmotion('stressed')} style={styles.emotionButton}>
          <Image source={require('../../assets/images/estresado.jpg')} style={styles.emotionImage} />
          <Text style={styles.emotionText}>Estresado</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedEmotion('sad')} style={styles.emotionButton}>
          <Image source={require('../../assets/images/triste.jpg')} style={styles.emotionImage} />
          <Text style={styles.emotionText}>Triste</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedEmotion('bored')} style={styles.emotionButton}>
          <Image source={require('../../assets/images/aburrido.jpg')} style={styles.emotionImage} />
          <Text style={styles.emotionText}>Aburrido</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.startChatButton} onPress={handleDialogOk}>
        <Text style={styles.startChatButtonText}>INICIAR NUEVO CHAT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSubText: {
    fontSize: 18,
    color: '#aaa',
    textAlign: 'center',
  },
  emotionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  emotionButton: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  emotionImage: {
    width: 60,
    height: 60,
    marginBottom: 5,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
  },
  emotionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  startChatButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  startChatButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
