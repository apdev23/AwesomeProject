import React from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { toggleWishlist } from '../../redux/slice/WishlistSlice';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const SPACING = 10;
const NUM_COLUMNS = 2;
const CARD_WIDTH = (width - SPACING * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

const WishlistScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  const renderProductItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity onPress={() => dispatch(toggleWishlist(item))} style={styles.removeButton}>
            <Icon name="trash-outline" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {wishlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items in wishlist</Text>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProductItem}
          numColumns={NUM_COLUMNS}
          columnWrapperStyle={styles.column}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
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
  removeButton: {
    alignSelf: 'flex-end',
  },
});

export default WishlistScreen;
