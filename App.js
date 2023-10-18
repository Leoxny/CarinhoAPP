import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { MainStack } from './src/routes/MainStack';
import { CartProvider } from './src/context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <StatusBar style='dark' />
        <MainStack />
      </NavigationContainer>
    </CartProvider>
  );
}
