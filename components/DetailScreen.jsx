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
      <Image
        source={
          product.thumbnail
            ? { uri: product.thumbnail }
            : { uri: 'https://via.placeholder.com/200x200?text=No+Image' }
        }
        style={styles.image}
      />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.desc}>{product.description}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <Text style={styles.category}>Category: {product.category}</Text>
      <Text style={styles.rating}>Rating: {product.rating}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAF4F0',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: { fontSize: 22, fontWeight: '700', color: '#C47C7C', marginBottom: 10 },
  desc: { fontSize: 15, color: '#3E3E3E', lineHeight: 22, marginBottom: 10 },
  price: { fontSize: 17, color: '#C47C7C', fontWeight: '600', marginTop: 5 },
  category: { fontSize: 15, color: '#7A6B68', marginTop: 5 },
  rating: { fontSize: 15, color: '#7A6B68', marginTop: 5 },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
  empty: { textAlign: 'center', marginTop: 20 },
});