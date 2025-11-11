import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { getProductById } from '../api/products';

export default function DetailScreen({ route }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Detail mounted');
    loadProduct();
    return () => console.log('Detail unmounted');
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
    <View style={styles.container}>
<Image
  source={
    product.thumbnail
      ? { uri: product.thumbnail }
      : { uri: 'https://via.placeholder.com/200x200?text=No+Image' }
  }
  style={styles.image}
/>
      <Text style={styles.title}>{product.title}</Text>
      <Text>{product.description}</Text>
      <Text>💰 Price: ${product.price}</Text>
      <Text>⭐ Rating: {product.rating}</Text>
      <Text>🏷️ Category: {product.category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: { width: '100%', height: 200, resizeMode: 'contain', marginBottom: 15 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
  empty: { textAlign: 'center', marginTop: 20 },
});