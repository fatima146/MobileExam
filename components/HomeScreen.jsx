import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { getAllProducts } from '../api/products';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('alphabetical');
  const [maxPrice, setMaxPrice] = useState('');
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const applyFilters = (searchText, maxPriceValue, sortChoice) => {
    let result = [...products];

    if (searchText) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (maxPriceValue) {
      const numeric = parseFloat(maxPriceValue);
      if (!isNaN(numeric)) {
        result = result.filter((p) => p.price <= numeric);
      }
    }

    switch (sortChoice) {
      case 'alphabetical':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'priceLow':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        result.sort((a, b) => b.price - a.price);
        break;
    }

    setFiltered(result);
  };

  const handleSearch = (text) => {
    setSearch(text);
    applyFilters(text, maxPrice, sortOption);
  };

  const handleSort = (option) => {
    setSortOption(option);
    applyFilters(search, maxPrice, option);
  };

  const handlePriceFilter = (price) => {
    setMaxPrice(price);
    applyFilters(search, price, sortOption);
  };

  const toggleCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart([...cart, product]);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  if (error) return <Text style={styles.error}>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎁 MobileShop</Text>

      {/* Search */}
      <TextInput
        style={styles.input}
        placeholder="Search products..."
        value={search}
        onChangeText={handleSearch}
      />

      {/* Sort + Max price */}
      <View style={styles.filters}>
        <View style={styles.filterBox}>
          <Text style={styles.filterLabel}>Sort by:</Text>
          <View style={styles.sortButtonsRow}>
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortOption === 'alphabetical' && styles.sortButtonActive,
              ]}
              onPress={() => handleSort('alphabetical')}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortOption === 'alphabetical' && styles.sortButtonTextActive,
                ]}
              >
                A–Z
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sortButton,
                sortOption === 'priceLow' && styles.sortButtonActive,
              ]}
              onPress={() => handleSort('priceLow')}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortOption === 'priceLow' && styles.sortButtonTextActive,
                ]}
              >
                € ↑
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sortButton,
                sortOption === 'priceHigh' && styles.sortButtonActive,
              ]}
              onPress={() => handleSort('priceHigh')}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortOption === 'priceHigh' && styles.sortButtonTextActive,
                ]}
              >
                € ↓
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.filterBox}>
          <Text style={styles.filterLabel}>Max price (€):</Text>
          <TextInput
            style={styles.priceInput}
            keyboardType="numeric"
            placeholder="e.g. 100"
            value={maxPrice}
            onChangeText={handlePriceFilter}
          />
        </View>
      </View>

      {/* Cart summary */}
      <View style={styles.cartSummary}>
        <Text style={styles.cartText}>🛒 {cart.length} items</Text>
      </View>

      {/* Products */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <View style={styles.productInfo}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>€{item.price}</Text>
            </View>
            <TouchableOpacity
              onPress={() => toggleCart(item)}
              style={[
                styles.cartButton,
                cart.some((p) => p.id === item.id) && styles.cartButtonAdded,
              ]}
            >
              <Text style={styles.cartButtonText}>
                {cart.some((p) => p.id === item.id) ? '✓ Added' : 'Add'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {filtered.length === 0 && (
        <Text style={styles.empty}>No products match your filters.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f7f7f7' },
  header: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterBox: { flex: 1, marginHorizontal: 4 },
  filterLabel: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  sortButtonsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  sortButton: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  sortButtonActive: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  sortButtonTextActive: {
    color: '#fff',
  },
  priceInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    height: 40,
  },
  cartSummary: {
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  cartText: { fontWeight: '600', color: '#333' },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 6,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  productInfo: { flex: 1 },
  title: { fontWeight: '600', fontSize: 15 },
  price: { color: '#007bff', marginTop: 4 },
  cartButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  cartButtonAdded: {
    backgroundColor: '#28a745',
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
  empty: { textAlign: 'center', marginTop: 20 },
});
