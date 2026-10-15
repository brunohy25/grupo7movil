import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, isFirebaseConfigured, getProximaAlertaAuth } from '../src/config/firebaseConfig';
import { estilos } from '../constants/estilos';
import ModalAlerta from '../components/ModalAlerta';
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
  const [modalAlertaAuth, setModalAlertaAuth] = useState({
    visible: false,
    titulo: "",
    mensaje: "",
  });

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (nuevoUsuario) => {
      if (nuevoUsuario) {
        const alerta = getProximaAlertaAuth();
        if (alerta) {
          setModalAlertaAuth({
            visible: true,
            titulo: alerta.titulo,
            mensaje: alerta.mensaje,
          });
        }
      }
      setUser(nuevoUsuario);
    });
  }, []);

  if (!isFirebaseConfigured) {
    return (
      <View style={estilos.navCentro}>
        <Text style={estilos.navMensaje}>
          Falta configurar Firebase. Copia .env.example como .env y completa los datos de tu proyecto.
        </Text>
      </View>
    );
  }

  if (user === undefined) {
    return <View style={estilos.navCentro}><ActivityIndicator size="large" /></View>;
  }

  return (
    <>
      <NavigationContainer>
        {/* En web cada pantalla ocupa solo el alto visible; sin esto el contenido se corta y no se puede desplazar */}
        <Stack.Navigator screenOptions={{ cardStyle: { flex: 1 } }}>
          {user ? (
            <>
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false, animation: 'none', transitionSpec: { open: { animation: 'timing', config: { duration: 0 } }, close: { animation: 'timing', config: { duration: 0 } } } }} />
              <Stack.Screen name="Productos" component={Productos} options={{ headerShown: false }}/>
              <Stack.Screen name="NuevoProductos" component={NuevoProductos} options={{ headerShown: false }}/>
              <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false, animation: 'none', transitionSpec: { open: { animation: 'timing', config: { duration: 0 } }, close: { animation: 'timing', config: { duration: 0 } } } }}/>
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

      <ModalAlerta
        visible={modalAlertaAuth.visible}
        titulo={modalAlertaAuth.titulo}
        mensaje={modalAlertaAuth.mensaje}
        textoConfirmar="Continuar"
        onConfirmar={() => setModalAlertaAuth({ visible: false, titulo: "", mensaje: "" })}
      />
    </>
  );
}
