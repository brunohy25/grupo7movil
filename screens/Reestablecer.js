import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { auth } from '../src/config/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { colores } from '../constants/colores';
import BarraVerdeSuperior from '../components/BarraVerdeSuperior';

export default function Reestablecer({ navigation }) {
  const [email, setEmail] = useState('');


  const handleSignUp = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    let credential;
    try {
      credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      console.error('Error de registro:', error.code, error.message);
      let errorMessage = "Hubo un problema al registrar el usuario.";
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = "El formato del correo electrónico no es válido.";
          break;
        case 'auth/network-request-failed':
          errorMessage = "Error de conexión, por favor intenta más tarde.";
          break;
        case 'auth/invalid-api-key':
          errorMessage = "La clave API de Firebase no es válida. Revisa el archivo .env.";
          break;
      }
      Alert.alert("Error", `${errorMessage}\n\nCódigo: ${error.code ?? 'desconocido'}`);
      return;
    }

    try {
      await updateProfile(credential.user, { displayName: `${firstName.trim()} ${lastName.trim()}` });
      Alert.alert("Registro exitoso", "Usuario registrado con éxito.");
    } catch (error) {
      Alert.alert("Cuenta creada", "La cuenta se creó, pero no se pudo guardar el nombre.");
    }
    // Firebase inicia la sesión y el navegador muestra Home.
  };

  return (
    <BarraVerdeSuperior>
      
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Olvidé mi contraseña</Text>
      <Text style={styles.signUpText}>Reestablecer contraseña de tu cuenta:</Text>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome name="user" size={20} color="#ccc" />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Ingrese su correo"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity  style={styles.button}  onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Enviar Solicitud al correo</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.button2}  onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText2}>Volver al Ingreso de cuenta</Text>
            </TouchableOpacity>
    </View>
    </BarraVerdeSuperior>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  marginTop:40,
  alignItems: 'center',
  paddingHorizontal: 24,
  backgroundColor: '#f3f3eb',
},
  logo: {
  width: 220,
  height: 150,
  resizeMode: 'contain',
  marginBottom: 28,
},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: 45,
  paddingHorizontal: 10,
  backgroundColor: '#e3e3dc',
  borderWidth: 1,
  borderColor: '#c5c6bf',
  borderRadius: 7,
  marginBottom: 14,
},
  iconContainer: {
    width: 32,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingVertical: 0,
    textAlignVertical: 'center',
  },

  button: {
  width: '70%',
  alignItems: 'center',
  backgroundColor: '#3e6934',
  paddingVertical: 10,
  borderRadius: 14,
  marginTop: 12,
},
button2: {
  width: '70%',
  alignItems: 'center',
  backgroundColor: '#fafafa00',
  borderWidth: 1,
  borderColor: '#0c2706',
  paddingVertical: 10,
  borderRadius: 14,
  marginTop: 12,
},
  buttonText: {
  color: '#fff',
  fontSize: 13,
  fontWeight: 'bold',
},
  buttonText2: {
  color: '#17380a',
  fontSize: 13,
  fontWeight: 'bold',
},
});
