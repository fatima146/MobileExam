import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { getAllProducts } from '../api/products';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data.products);
      setFiltered(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    const results = products.filter(p =>
      p.title.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(results);
  };

  const sortByName = () => {
    setFiltered([...filtered].sort((a, b) => a.title.localeCompare(b.title)));
  };

  const sortByPrice = () => {
    setFiltered([...filtered].sort((a, b) => a.price - b.price));
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  if (error) return <Text style={styles.error}>Error: {error}</Text>;
  if (!filtered.length) return <Text style={styles.empty}>No results found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products</Text>

      <TextInput
        style={styles.input}
        placeholder="Search products..."
        value={search}
        onChangeText={handleSearch}
        placeholderTextColor="#9c8e8b"
      />

      <View style={styles.sortContainer}>
        <TouchableOpacity onPress={sortByName} style={styles.button}>
          <Text style={styles.buttonText}>Sort by Name</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={sortByPrice} style={styles.button}>
          <Text style={styles.buttonText}>Sort by Price</Text>
        </TouchableOpacity>
      </View>

      <FlashList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={100}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail', { id: item.id })}
            style={styles.card}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF4F0',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#C47C7C',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E8A2A2',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 12,
    color: '#3E3E3E',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#E8A2A2',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3E3E3E',
  },
  price: {
    fontSize: 15,
    color: '#C47C7C',
    marginTop: 4,
  },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
  empty: { textAlign: 'center', marginTop: 20 },
});