import React, { FC } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../Theme/theme';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export interface HeaderProps {
    title: string;
    funcaoVoltar?: () => void
    menu?: boolean
    carinho?: boolean
    funcaoCarinho?: () => void
    quantidadeItens?: number
}

export const Header: FC<HeaderProps> = ({ title, menu, funcaoVoltar, carinho, quantidadeItens, funcaoCarinho }) => {

    const navigation = useNavigation()

    return (
        <>
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    {menu ?
                        <TouchableOpacity >
                            <Entypo name="menu" size={33} color="black" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={funcaoVoltar}>
                            <AntDesign name="arrowleft" size={33} color="black" />
                        </TouchableOpacity>
                    }
                    <Text style={styles.title}>{title}</Text>
                    {carinho &&
                        <TouchableOpacity onPress={funcaoCarinho}>
                            <View style={{ flexDirection: 'row' }}>
                                <FontAwesome name="shopping-cart" size={33} color="black" />
                                <View style={styles.circle}>
                                    <Text style={{ color: colors.white, top: 3 }}>{quantidadeItens}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <View style={styles.line}></View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 55,
        marginTop: 40,
    },
    line: {
        height: 3,
        backgroundColor: colors.placeHolder,
    },
    containerTitle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    title: {
        color: colors.black,
        fontSize: 23,
        fontWeight: 'bold',
        alignItems: 'center',
        marginLeft: 30
    },
    circle: {
        width: 28,
        height: 28,
        borderRadius: 5,
        backgroundColor: 'red',
        marginLeft: 5,
        alignItems: 'center',
        top: 3
    }

})


