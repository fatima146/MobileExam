import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
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

  // ✅ Ensure the image URL is always valid
  if (typeof product?.thumbnail !== 'string') {
    product.thumbnail = 'https://via.placeholder.com/200x200?text=No+Image';
  }

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

      {/* Elegant title and price section */}
      <View style={styles.detailHeader}>
        <Text style={styles.detailTitle}>{product.title}</Text>
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>${product.price}</Text>
        </View>
      </View>

      {/* Product details */}
      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>⭐ Rating: <Text style={styles.value}>{product.rating}</Text></Text>
        <Text style={styles.infoText}>🏷️ Category: <Text style={styles.value}>{product.category}</Text></Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderRadius: 12,
    marginBottom: 15,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#B22222', // deep red
    flex: 1,
    flexWrap: 'wrap',
  },
  priceTag: {
    backgroundColor: '#006400', // deep green
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  priceText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    marginVertical: 10,
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 10,
  },
  infoText: {
    fontSize: 15,
    color: '#444',
    marginVertical: 4,
  },
  value: {
    fontWeight: 'bold',
    color: '#006400',
  },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
  empty: { textAlign: 'center', marginTop: 20 },
});