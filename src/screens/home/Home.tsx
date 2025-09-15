// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, ProductItem } from '../../redux/slice/ProductSlice';
import { fetchCategories } from '../../redux/slice/CategorySlice';
import { RootState, AppDispatch } from '../../redux/store';
import { toggleWishlist } from '../../redux/slice/WishlistSlice';
import { addToCart } from '../../redux/slice/CartSlice';
import Icon from 'react-native-vector-icons/Ionicons'; // or any icon library you prefer

const { width } = Dimensions.get('window');
const SPACING = 10;
const NUM_COLUMNS = 2;
const CARD_WIDTH = (width - SPACING * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading: productsLoading, error: productsError } = useSelector(
    (state: RootState) => state.product
  );
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector(
    (state: RootState) => state.category
  );
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const cart = useSelector((state: RootState) => state.cart.items);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredItems, setFilteredItems] = useState<ProductItem[]>([]);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.category === selectedCategory));
    }
  }, [items, selectedCategory]);

  const renderCategoryItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.categoryButtonSelected,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.categoryTextSelected,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }: { item: ProductItem }) => {
    const isWishlisted = wishlist.find(w => w.id === item.id);
    const isInCart = cart.find(c => c.id === item.id);

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => dispatch(toggleWishlist(item))}>
              <Icon
                name={isWishlisted ? "heart" : "heart-outline"}
                size={24}
                color={isWishlisted ? "red" : "gray"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(addToCart(item))}
              style={styles.cartButton}
            >
              <Text style={styles.cartText}>
                {isInCart ? "Added" : "Add to Cart"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (productsLoading || categoriesLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (productsError || categoriesError) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>{productsError || categoriesError}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.categoriesContainer}>
        <FlatList
          data={['all', ...categories]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={renderCategoryItem}
          contentContainerStyle={{ paddingHorizontal: SPACING }}
        />
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        contentContainerStyle={styles.list}
        numColumns={NUM_COLUMNS}
        columnWrapperStyle={styles.column}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoriesContainer: {
    paddingVertical: SPACING,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: SPACING,
  },
  categoryButtonSelected: {
    backgroundColor: '#000',
  },
  categoryText: {
    color: '#333',
  },
  categoryTextSelected: {
    color: '#fff',
  },
  list: {
    padding: SPACING,
  },
  column: {
    justifyContent: 'space-between',
    marginBottom: SPACING,
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    width: CARD_WIDTH,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginVertical: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartButton: {
    backgroundColor: '#000',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  cartText: {
    color: '#fff',
    fontSize: 12,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default HomeScreen;
