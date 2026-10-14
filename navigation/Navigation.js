import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../src/config/firebaseConfig';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import Perfil from '../screens/Perfil';
import Ajustes from '../screens/Ajustes';
import Productos from '../screens/Productos';
import NuevoProductos from '../screens/NuevoProductos';
import Reestablecer from '../screens/Reestablecer';


const Stack = createStackNavigator();

export default function Navigation() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, setUser);
  }, []);

  if (!isFirebaseConfigured) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>
          Falta configurar Firebase. Copia .env.example como .env y completa los datos de tu proyecto.
        </Text>
      </View>
    );
  }

  if (user === undefined) {
    return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  }

  return (
    <NavigationContainer>
      {/* En web cada pantalla ocupa solo el alto visible; sin esto el contenido se corta y no se puede desplazar */}
      <Stack.Navigator screenOptions={{ cardStyle: { flex: 1 } }}>
        {user ? (
          <>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false, animation: 'none', transitionSpec: { open: { animation: 'timing', config: { duration: 0 } }, close: { animation: 'timing', config: { duration: 0 } } } }} />
          <Stack.Screen name="Productos" component={Productos} options={{ headerShown: false }}/>
          <Stack.Screen name="NuevoProductos" component= {NuevoProductos} options={{ headerShown: false }}/>
          <Stack.Screen name="Perfil" component= {Perfil} options={{ headerShown: false, animation: 'none', transitionSpec: { open: { animation: 'timing', config: { duration: 0 } }, close: { animation: 'timing', config: { duration: 0 } } } }}/>
          <Stack.Screen name="Ajustes" component={Ajustes} options={{ headerShown: false, animation: 'none', transitionSpec: { open: { animation: 'timing', config: { duration: 0 } }, close: { animation: 'timing', config: { duration: 0 } } } }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name="Reestablecer" component={Reestablecer} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  message: { textAlign: 'center', fontSize: 16 },
});
