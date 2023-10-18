import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { colors } from '../Theme/theme';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { formatMoneyNey } from '../utils/utils';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';

export const HomeScreen = () => {

    const { cartItems, addToCart, removeFromCart, getTotalItems } = useContext(CartContext)
    const [products, setProducts] = useState([
        {
            id: '1',
            name: "Coca cola",
            price: 12,
            description: "Coca-Cola sabor original contém água gaseificada, açúcar, extrato de noz de cola, cafeína,corante caramelo IV, acidulante ácido fosfórico e aroma natural. Cada 200ml contém 85kcal e 10mg de sódio",
            image: require('../assets/coca-cola.png'),
            star: 5,
            comentarios: 16,
            desconto: 8
        },
        {
            id: '2',
            name: "Chocolate",
            price: 6.50,
            description: "Chocolate é uma mistura de derivados de cacau com outros ingredientes, desde que tenha no mínimo 25% de cacau. Se quiser, a norma brasileira da Anvisa. Ingredientes sempre são listados em ordem decrescente de quantidade (o ingrediente presente em maior quantidade é o primeiro da lista).",
            image: require('../assets/chocolate.jpg'),
            star: 3,
            comentarios: 15
        },
        {
            id: '3',
            name: "Queijo 500g",
            price: 15,
            description: "É valioso por ser de fácil transporte, ter longa durabilidade e alto teor de gordura, proteína, cálcio e fósforo. O queijo é uma forma mais compacta de nutrição e tem uma validade mais longa que a do leite do qual ele é feito.",
            image: require('../assets/queijo.png'),
            star: 4,
            comentarios: 4
        },
        {
            id: '4',
            name: "Batata frita",
            price: 23.90,
            description: "Batata frita um termo que refere-se a um alimento processado, produto da preparação culinária de batata cortada previamente em: tiras, palitos finíssimos (batata palha), rodelas ou folhas e, que posteriormente são fritas.",
            image: require('../assets/batata.jpg'),
            star: 4.5,
            comentarios: 25,
            desconto: 20
        },
        {
            id: '5',
            name: "Guarana lata",
            price: 6.00,
            description: "O guaraná é uma fruta típica da Amazônia, encontrada no Brasil e Venezuela. É pequena e vermelha, semelhante à pitanga, possui uma substância parecida com a cafeína (guaraína), em virtude dessa propriedade estimulante é utilizada para a fabricação de xaropes, barras, pós e refrigerantes.",
            image: require('../assets/guarana.png'),
            star: 4,
            comentarios: 10,
            desconto: 4
        },
        {
            id: '6',
            name: "Doritos",
            price: 10,
            description: "O Salgadinho Doritos é a compra ideal para garantir o lanche e dar um up em qualquer hora do dia. É feito com farinha de milho, fonte de energia, além de ser assado e estar sempre crocante. Sua variedade de tamanhos é ideal para dividir com a galera e também para preparar nachos deliciosos.",
            image: require('../assets/doritos.jpg'),
            star: 3.5,
            comentarios: 7,
            descontos: 8
        },
        {
            id: '7',
            name: "Heineken",
            price: 6.00,
            description: "Heineken é uma cerveja lager Puro Malte, refrescante e de cor amarelo-dourado, produzida com ingredientes 100% naturais: água, malte e lúpulo. Durante o processo de fermentação da Heineken, a exclusiva Levedura A é responsável pelo sabor característico e bem equilibrado, com notas frutadas sutis.",
            image: require('../assets/breja.png'),
            star: 5,
            comentarios: 20
        },
        {
            id: '8',
            name: "Pizza congelada",
            price: 20.00,
            description: "Pizza ou piza é uma preparação culinária que consiste em um disco de massa fermentada de farinha de trigo, coberto com molho de tomate e os ingredientes variados que normalmente incluem algum tipo de queijo, carnes preparadas ou defumadas e ervas, normalmente orégano ou manjericão, tudo assado em forno.",
            image: require('../assets/pizza.jpg'),
            star: 4,
            comentarios: 5
        },
    ])
    const isFocused = useIsFocused()
    const navigation = useNavigation()

    useEffect(() => {
        if (isFocused) {
            getProducts()
        }
    }, [isFocused]);

    const getProducts = () => {
        try {

            const response = products;

            setProducts(response)

        } catch (err) {
            console.log(err);
        }
    }

    const renderProducts = ({ item }) => {

        const productInfo = cartItems[item.id] || { quantidade: 0 };

        return (
            <View style={{ marginTop: 10, marginBottom: 5, marginLeft: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('ItemCompraScreen',
                        {
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            descricao: item.description,
                            image: item.image,
                            star: item.star,
                            comentarios: item.comentarios,
                            desconto: item.desconto
                        })
                    }>
                        <Image source={item.image} style={styles.cardImage} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                        <Text style={styles.titleName}>{item.name}</Text>
                        <Text style={styles.titlePrice}>{formatMoneyNey(item.price)}</Text>
                    </View>
                    <View style={{ flex: 0.8, flexDirection: 'row-reverse' }}>
                        <View style={styles.cardAdd}>
                            <TouchableOpacity onPress={() => addToCart(item)}>
                                <Ionicons name="md-add" size={18} color="black" />
                            </TouchableOpacity>
                            <Text>{productInfo.quantidade || 0}</Text>
                            <TouchableOpacity onPress={() => removeFromCart(item)}>
                                <Ionicons name="md-remove" size={18} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.line}></View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Header title={'Home'} menu carinho quantidadeItens={getTotalItems()} funcaoCarinho={() => navigation.navigate('ItemCarinhoScreen')} />

            <FlatList
                data={products}
                keyExtractor={item => item.id}
                renderItem={renderProducts}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    line: {
        height: 1,
        backgroundColor: colors.placeHolder,
    },
    cardImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    titleName: {
        fontSize: 20,
        color: colors.black,
        fontWeight: 'bold',
    },
    titlePrice: {
        fontSize: 17,
        color: colors.black,
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
    }
})

