import React from 'react';
import {View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity} from 'react-native'; 

export default function ChatbotScreen ({ navigation }){
    const messages = [
        {id: '1', text: 'Hello! How can I assist you today?', sender: 'bot'},
        {id: '2', text: 'I need some help.', sender: 'user'},
    ];
    
    return (
        <View style={styles.container}>
            {/* Chat messages */}
            <FlatList 
                data={messages} 
                keyExtractor={(item) => item.id.toString()} 
                renderItem={({item}) => (
                <View style={[styles.messageContainer, item.sender === 'bot' ? styles.botMessage : styles.userMessage]}>
                    <Text style={styles.messageText}>{item.text}</Text>
                </View>
            )}
            />
            {/* Input container */}
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Type a message..." />
                <TouchableOpacity style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f5f5f5',
    },
    messageContainer: {
      padding: 10,
      marginVertical: 5,
      borderRadius: 10,
      maxWidth: '80%',
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#007bff',
    },
    botMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#e0e0e0',
    },
    messageText: {
      color: '#fff',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderColor: '#ddd',
    },
    input: {
      flex: 1,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 20,
      marginRight: 10,
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