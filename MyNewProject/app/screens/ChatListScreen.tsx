import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Text, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Conversation } from '../types';
import { v4 as uuidv4 } from 'uuid';

type ChatListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChatList'>;
type ChatListScreenRouteProp = RouteProp<RootStackParamList, 'ChatList'>;

type Props = {
  navigation: ChatListScreenNavigationProp;
  route: ChatListScreenRouteProp;
};

const ChatListScreen: React.FC<Props> = ({ navigation, route }) => {
  const { user } = route.params;
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const fetchConversations = async () => {
    try {
      const response = await axios.post('http://192.168.1.5:5000/chat/conversations', { user });
      setConversations(response.data.conversations);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleNewChat = () => {
    Alert.prompt(
      'Nombre de la conversación',
      'Por favor, ingresa un nombre para esta conversación:',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: (conversationName: string | undefined) => {
            if (conversationName) {
              navigation.navigate('Home', { user, conversationName });
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Button title="START NEW CHAT" onPress={handleNewChat} />
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.conversationItem}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  conversationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ChatListScreen;
