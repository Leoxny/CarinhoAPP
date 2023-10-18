import React, { FC, useContext } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { colors } from '../Theme/theme';
import { useNavigation } from '@react-navigation/native';
import StarRating from 'react-native-star-rating-widget';
import { formatMoneyNey } from '../utils/utils';
import { CartContext } from '../context/CartContext';
import { Ionicons } from '@expo/vector-icons';

type ItemProps = {
  route: {
    params?: {
      id: string
      name: string;
      price: number;
      descricao: string;
      image: string;
      star: number;
      comentarios: number;
      desconto: number;
    };
  };
}

export const ItemCompraScreen: FC<ItemProps> = ({ route }) => {

  const { cartItems, addToCart, removeFromCart, getTotalItems } = useContext(CartContext)
  const navigation = useNavigation()
  const comentarios = `(${route.params?.comentarios})`
  const productInfo = cartItems[route.params?.id] || { quantidade: 0 };

  console.log(productInfo.quantidade)

  return (
    <View style={styles.container}>
      <Header title={route.params?.name} funcaoVoltar={() => navigation.goBack()} carinho quantidadeItens={getTotalItems()} />
      <ScrollView>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={route.params?.image}
            style={styles.cardImage}
          />
        </View>
        <View >
          <Text style={styles.title}>{route.params?.name}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <StarRating
            rating={route.params?.star}
            style={{ paddingHorizontal: 5, marginTop: 10 }}
          />
          <Text style={styles.coment}>{comentarios}</Text>
        </View>
        {route.params?.desconto ?
          <>
            <Text style={styles.priceDesconto}>{formatMoneyNey(route.params?.price)}</Text>
            <Text style={styles.price}>{formatMoneyNey(route.params?.desconto)}</Text>
          </>
          :
          <Text style={styles.price}>{formatMoneyNey(route.params?.price)}</Text>

        }
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.comentario}>{(route.params?.descricao)}</Text>
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'row', marginHorizontal: 14 }}>
          <View style={styles.cardAdd}>
            <TouchableOpacity onPress={() => addToCart(route.params)}>
              <Ionicons name="md-add" size={18} color="black" />
            </TouchableOpacity>
            <Text>{productInfo.quantidade || 0}</Text>
            <TouchableOpacity onPress={() => removeFromCart(route.params)}>
              <Ionicons name="md-remove" size={18} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ItemCarinhoScreen")}>
            <Text style={styles.textButton}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  cardImage: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
    marginTop: 10
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: colors.black,
    marginHorizontal: 14,
    marginTop: 25
  },
  coment: {
    fontSize: 20,
    top: 5,
    color: colors.black,
    opacity: 0.5
  },
  price: {
    fontSize: 25,
    marginTop: 10,
    color: colors.black,
    fontWeight: 'bold',
    marginHorizontal: 14,
  },
  priceDesconto: {
    fontSize: 14,
    marginTop: 10,
    color: colors.black,
    fontWeight: 'bold',
    marginHorizontal: 14,
    opacity: 0.6,
    textDecorationLine: 'line-through',
    textDecorationColor: colors.black,
  },
  comentario: {
    fontSize: 25,
    marginTop: 10,
    color: colors.black,
    marginHorizontal: 14,
    opacity: 0.7
  },
  cardAdd: {
    borderRadius: 15,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#c0c0c0',
    borderWidth: 1,
    width: '50%',
    paddingHorizontal: 5,
    height: 40,
    alignItems: 'center'
  },
  button: {
    width: '50%',
    height: 40,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 18,
    marginLeft: 8
  },
  textButton: {
    fontSize: 15,
    color: colors.white,
    fontWeight: 'bold',
  }
})

