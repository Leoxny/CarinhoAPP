import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

export const SplashScreen = ({ navigation }) => {
    
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('HomeScreen');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/shop.json')}
        autoPlay
        loop={true}
        style={styles.animation}
      />
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  animation: {
    width: width,
    height: height,
  },
});
