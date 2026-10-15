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
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
            cardStyle: { flex: 1 },
          }}
        >
          {user ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Productos" component={Productos} />
              <Stack.Screen name="NuevoProductos" component={NuevoProductos} />
              <Stack.Screen name="Perfil" component={Perfil} />
              <Stack.Screen name="Ajustes" component={Ajustes} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="Reestablecer" component={Reestablecer} />
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
