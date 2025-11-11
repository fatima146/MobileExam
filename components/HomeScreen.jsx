import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
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
    console.log('Home mounted');
    loadProducts();
    return () => console.log('Home unmounted');
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
    const sorted = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    setFiltered(sorted);
  };

  const sortByPrice = () => {
    const sorted = [...filtered].sort((a, b) => a.price - b.price);
    setFiltered(sorted);
  };

  const filterUnder100 = () => {
    const filteredData = products.filter(p => p.price < 100);
    setFiltered(filteredData);
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  if (error) return <Text style={styles.error}>Error: {error}</Text>;
  if (!filtered.length) return <Text style={styles.empty}>No results found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛍️ Products</Text>

      <TextInput
        style={styles.input}
        placeholder="Search products..."
        value={search}
        onChangeText={handleSearch}
        placeholderTextColor="#666"
      />

      <View style={styles.buttons}>
        <Button title="Sort by Name" color="#B22222" onPress={sortByName} />
        <Button title="Sort by Price" color="#006400" onPress={sortByPrice} />
      </View>

      <Button title="💎 Filter under $100" color="#8B0000" onPress={filterUnder100} />

      <FlashList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={100}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text
              style={styles.title}
              onPress={() => navigation.navigate('Detail', { id: item.id })}
            >
              {item.title}
            </Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#B22222',
    marginVertical: 10,
    textAlign: 'center',
    letterSpacing: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#222',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 6,
    borderLeftColor: '#B22222',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    color: '#006400',
    fontWeight: 'bold',
  },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
  empty: { textAlign: 'center', marginTop: 20 },
});