import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { getProductById } from '../api/products';

export default function DetailScreen({ route }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  if (error) return <Text style={styles.error}>Error: {error}</Text>;
  if (!product) return <Text style={styles.empty}>No product found</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>💰 €{product.price}</Text>
      <Text style={styles.rating}>⭐ {product.rating}</Text>
      <Text style={styles.category}>🏷️ {product.category}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 10 },
  price: { fontSize: 18, color: '#007bff', marginBottom: 5 },
  rating: { fontSize: 16, color: '#444', marginBottom: 5 },
  category: { fontSize: 16, color: '#555', marginBottom: 15 },
  description: { fontSize: 15, color: '#333', lineHeight: 22 },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
  empty: { textAlign: 'center', marginTop: 20 },
});
