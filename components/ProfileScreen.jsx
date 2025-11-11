import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/avatar.png')} style={styles.avatar} />
        <Text style={styles.name}>Fatima Salamova</Text>
        <Text style={styles.role}>Student - Graduaat Programmeren</Text>
        <Text style={styles.bio}>
          Passionate about mobile and web development.
          Enjoys creating useful applications that help others.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    marginTop: 80, // 👈 this adds space from the top
    paddingHorizontal: 20,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignSelf: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  role: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 4,
  },
  bio: {
    fontSize: 15,
    textAlign: 'center',
    color: '#444',
    marginTop: 12,
    lineHeight: 22,
  },
});
