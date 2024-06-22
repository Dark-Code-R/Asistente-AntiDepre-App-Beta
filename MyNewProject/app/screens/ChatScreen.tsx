import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Message } from '../types';
import 'react-native-get-random-values'; // Import this to support crypto.getRandomValues on mobile
import { v4 as uuidv4 } from 'uuid';

type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;
type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

type Props = {
  navigation: ChatScreenNavigationProp;
  route: ChatScreenRouteProp;
};

const ChatScreen: React.FC<Props> = ({ route }) => {
  const { emotion, user, initialMessage, conversationId, conversationName } = route.params;
  const [messages, setMessages] = useState<Message[]>([{ text: initialMessage, sender: 'assistant' }]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const newMessage: Message = { text: inputText, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');
    setIsTyping(true);

    axios.post('https://novaassistantappbackend-production-fd97.up.railway.app/chat', { user_input: inputText, user, conversationId })
      .then(response => {
        const assistantMessage: Message = { text: response.data.response, sender: 'assistant' };
        setMessages(prevMessages => [...prevMessages, assistantMessage]);
        setIsTyping(false);
      })
      .catch(error => {
        console.error(error);
        setIsTyping(false);
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={item.sender === 'user' ? styles.userMessage : styles.assistantMessage}>
            <Text style={item.sender === 'user' ? styles.userText : styles.assistantText}>{item.text}</Text>
          </View>
        )}
      />
      {isTyping && (
        <View style={styles.typingIndicator}>
          <ActivityIndicator size="small" color="#fff" />
          <Text style={styles.typingText}>Nova está escribiendo...</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Escribe tu mensaje..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#1E90FF',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#2E7D32',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  userText: {
    color: '#fff',
  },
  assistantText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#333',
    backgroundColor: '#1E1E1E',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    color: '#fff',
    backgroundColor: '#333',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 20,
    padding: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  typingText: {
    color: '#fff',
    marginLeft: 10,
  },
});

export default ChatScreen;
