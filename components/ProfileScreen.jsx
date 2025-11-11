import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/avatar.png')} style={styles.avatar} />

      <Text style={styles.name}>Fatima Salamova</Text>
      <Text style={styles.role}>Student — Graduaat Programmeren</Text>

      <View style={styles.divider} />

      <Text style={styles.bio}>
        Passionate about mobile and web development.  
        Always learning, creating, and helping others build their skills.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📚 Skills</Text>
        <Text style={styles.cardItem}>• React Native</Text>
        <Text style={styles.cardItem}>• JavaScript / TypeScript</Text>
        <Text style={styles.cardItem}>• Web & Mobile Design</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F8F8', 
    alignItems: 'center', 
    padding: 25 
  },
  avatar: { 
    width: 140, 
    height: 140, 
    borderRadius: 70, 
    borderWidth: 3, 
    borderColor: '#B22222', 
    marginBottom: 20 
  },
  name: { 
    fontSize: 24, 
    fontWeight: '700', 
    color: '#B22222' 
  },
  role: { 
    fontSize: 16, 
    color: '#006400', 
    marginBottom: 15 
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 15,
  },
  bio: { 
    fontSize: 15, 
    textAlign: 'center', 
    color: '#333', 
    lineHeight: 22, 
    marginBottom: 20 
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 18,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#B22222',
    marginBottom: 8,
  },
  cardItem: {
    fontSize: 15,
    color: '#333',
    marginVertical: 2,
  },
});