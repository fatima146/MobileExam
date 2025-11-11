import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={require('../assets/avatar.png')} style={styles.avatar} />
        <Text style={styles.name}>Fatima Salamova</Text>
        <Text style={styles.role}>Student - Graduaat Programmeren</Text>
        <Text style={styles.bio}>
          Passionate about mobile and web development.
          Wanna buy some fun tech stuff.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 16,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 20,
  },
  name: { fontSize: 22, fontWeight: 'bold', color: '#222' },
  role: { fontSize: 16, color: '#555', marginVertical: 4 },
  bio: {
    fontSize: 15,
    textAlign: 'center',
    color: '#444',
    marginTop: 10,
    lineHeight: 22,
  },
});
