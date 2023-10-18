import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image, ScrollView, Linking } from 'react-native';
import { colors } from '../Theme/theme';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { formatMoneyNey } from '../utils/utils';

export const ItemCarinhoScreen = () => {

    const navigation = useNavigation()
    const { cartItems, addToCart, removeFromCart, getTotalItems } = useContext(CartContext)

    const cartItemsArray = Object.values(cartItems);

    const renderProducts = ({ item }) => {

        const productInfo = cartItems[item.id] || { quantidade: 0 };

        return (
            <>
                <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 14 }}>
                    <Image
                        source={item.image}
                        style={styles.cardImage}
                    />
                    <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10 }}>
                        <Text style={styles.textName}>{item.name}</Text>
                        <Text style={styles.textPrice}>{formatMoneyNey(item.price)}</Text>
                    </View>
                    <View style={{ flex: 0.9, flexDirection: 'row-reverse', alignItems: 'center' }}>
                        <View style={styles.cardAdd}>
                            <TouchableOpacity onPress={() => addToCart(item)}>
                                <Ionicons name="md-add" size={18} color="black" />
                            </TouchableOpacity>
                            <Text>{productInfo.quantidade || 0}</Text>
                            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                                <Ionicons name="md-remove" size={18} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.line}></View>
            </>
        )
    }

    const total = cartItemsArray.reduce((total, item) => {
        return total + item.price * item.quantidade;
    }, 0);

    return (
        <View style={styles.container}>
            <Header title={'Carinho'} funcaoVoltar={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.text}>Pronto! Agora é so enviar seu pedido para Whatsapp</Text>
                    <View style={{ marginRight: 35, marginTop: 20 }}>
                        <FontAwesome name="whatsapp" size={35} color={colors.whats} />
                    </View>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Continuar comprando</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={cartItemsArray}
                    keyExtractor={item => item.id}
                    renderItem={renderProducts}
                    showsVerticalScrollIndicator={false}
                />
                <View style={styles.total}>
                    <Text style={styles.textTotal}>Total</Text>
                    <Text style={styles.textTotal}>{formatMoneyNey(total)}</Text>
                </View>
                <TouchableOpacity style={styles.whats} onPress={() => Linking.openURL(`https://wa.me/5551995134258`)}>
                    <Text style={styles.textWhats}>Enviar pedido pelo Whatsapp</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    text: {
        fontSize: 20,
        marginHorizontal: 14,
        maxWidth: 280,
        marginTop: 20,
        color: colors.whats
    },
    button: {
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.placeHolder,
        borderRadius: 25,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 15,
        color: '#b48ccf',
        fontWeight: 'bold',
    },
    cardImage: {
        width: 60,
        height: 70,
        resizeMode: 'contain'
    },
    cardAdd: {
        borderRadius: 15,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#c0c0c0',
        borderWidth: 1,
        width: 100,
        paddingHorizontal: 5,
        height: 30,
        alignItems: 'center'
    },
    line: {
        height: 1.5,
        backgroundColor: colors.placeHolder,
        width: '60%',
        alignSelf: 'center',
    },
    textName: {
        fontSize: 16,
        color: colors.black,
        fontWeight: 'bold',
    },
    textPrice: {
        fontSize: 15,
        color: colors.black,
        opacity: 0.4
    },
    total: {
        width: '90%',
        height: 50,
        backgroundColor: '#f5f5f5',
        alignSelf: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.placeHolder,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 20
    },
    textTotal: {
        fontSize: 16,
        color: colors.black,
        fontWeight: 'bold',
        marginHorizontal: 14,
        marginTop: 13
    },
    whats: {
        width: '90%',
        height: 50,
        backgroundColor: colors.whats,
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 20
    },
    textWhats: {
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginHorizontal: 14,
        marginTop: 13,
        textAlign: 'center'
    }
})