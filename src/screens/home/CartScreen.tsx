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
import { removeFromCart, clearCart } from '../../redux/slice/CartSlice';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const SPACING = 10;
const NUM_COLUMNS = 1;

const CartScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.items);

  const renderCartItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))} style={styles.removeButton}>
            <Icon name="trash-outline" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCartItem}
            numColumns={NUM_COLUMNS}
            contentContainerStyle={styles.list}
          />
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => dispatch(clearCart())} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
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
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    flexDirection: 'row',
    marginBottom: SPACING,
    padding: SPACING,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    marginLeft: SPACING,
    justifyContent: 'center',
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
  footer: {
    padding: SPACING,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: SPACING,
  },
  clearButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CartScreen;
