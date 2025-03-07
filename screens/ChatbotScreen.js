import React, {useState} from 'react';
import {View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native'; 

export default function ChatbotScreen ({ navigation }){
    const [messages, setMessages] = useState([{id: '1', text: 'Hello! How can I assist you today?', sender: 'bot'}]);

    const messages1 = [
        {id: '1', text: 'Hello! How can I assist you today?', sender: 'bot'},
        {id: '2', text: 'I need some help.', sender: 'user'},
    ];
    const [inputText, setInputText] = useState('');

    const handleSend = () => {
      if(inputText.trim()){
        setMessages([...messages, {text: inputText, sender: 'user'}]);
        setInputText('');
      }
    };

    const renderItem = ({ item }) => (
      <View style={[styles.messageContainer, item.sender==='user' ? styles.userMessage : styles.botMessage]}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
    
    return (
      <ImageBackground source={require('../assets/background3.png')} style={styles.background}>
        <View style={styles.container}>
            <Text style={styles.title}>Chat with Surgi</Text>
            <FlatList 
                data={messages} 
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.messagesContainer}
            />

            <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.input}
                  value={inputText}
                  onChangeText={setInputText} 
                  placeholder="Type a message..." 
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
      </ImageBackground>
    );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },  
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
},
  container: {
      flex: 1,
      padding: 10,
      paddingTop: 80,
    },
    messagesContainer: {
      flexGrow: 1,
      justifyContent: 'flex-end',
    },
    messageContainer: {
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
      maxWidth: '80%',
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#007bff',
    },
    botMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#a6a49d',
    },
    messageText: {
      color: '#fff',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderTopWidth: 1,
      borderColor: '#ddd',
      paddingBottom: 60
    },
    input: {
      flex: 1,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 20,
      marginRight: 10,
      backgroundColor: 'white'
    },
    sendButton: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 20,
    },
    sendButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });