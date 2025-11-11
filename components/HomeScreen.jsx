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

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  if (error) return <Text style={styles.error}>Error: {error}</Text>;
  if (!filtered.length) return <Text style={styles.empty}>No results found</Text>;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search products..."
        value={search}
        onChangeText={handleSearch}
      />

      <View style={styles.buttons}>
        <Button title="Sort by Name" onPress={sortByName} />
        <Button title="Sort by Price" onPress={sortByPrice} />
      </View>

      <FlashList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={100}
        renderItem={({ item }) => (
          <Text
            style={styles.item}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
          >
            {item.title} - ${item.price}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  item: { padding: 10, borderBottomWidth: 1 },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
  empty: { textAlign: 'center', marginTop: 20 },
});