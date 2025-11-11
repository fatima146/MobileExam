import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/avatar.png')} style={styles.avatar} />
      <Text style={styles.name}>Fatima Salamova</Text>
      <Text style={styles.role}>Student - Graduaat Programmeren</Text>
      <Text style={styles.bio}>
        Passionate about mobile and web development.
        Enjoys creating useful applications that help others.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#222' },
  role: { fontSize: 16, color: 'gray', marginVertical: 4 },
  bio: { fontSize: 14, textAlign: 'center', marginTop: 10, paddingHorizontal: 20 },
});