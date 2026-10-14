import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colores } from '../constants/colores';
import { estilosAuth, estilosTema } from '../constants/estilos';
import { usarTema } from '../contexto/ContextoTema';
import BarraVerdeSuperior from '../components/BarraVerdeSuperior';
import handleForgotPassword from '../components/Olvidecontra';
import { REGEX_CORREO } from '../src/utilidades/validaciones';

// Devuelve el mensaje de error del correo, o '' si es válido
const errorDeCorreo = (texto) => {
  if (!texto.trim()) return 'El correo electrónico es obligatorio.';
  return REGEX_CORREO.test(texto.trim()) ? '' : 'Por favor, ingrese un formato de correo válido.';
};

export default function Reestablecer({ navigation }) {
  const { modoOscuro } = usarTema();
  const tema = estilosTema[modoOscuro ? 'oscuro' : 'claro'];
  const [email, setEmail] = useState('');
  const [errorCorreo, setErrorCorreo] = useState('');
  const [enviando, setEnviando] = useState(false);

  const botonDeshabilitado = !REGEX_CORREO.test(email.trim()) || enviando;

  const enviarSolicitud = async () => {
    setEnviando(true);
    try {
      await handleForgotPassword(email, navigation);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <BarraVerdeSuperior>
      
    <View style={[styles.container, modoOscuro && tema.fondo]}>
      <Image source={require('../assets/logos/logo.png')} style={styles.logo} />
      <Text style={[styles.title, modoOscuro && tema.texto]}>Olvidé mi contraseña</Text>
      <Text style={[styles.signUpText, modoOscuro && tema.texto]}>Reestablecer contraseña de tu cuenta:</Text>
      <View style={[styles.inputContainer, tema.campo]}>
        <View style={styles.iconContainer}>
          <FontAwesome name="user" size={20} color="#ccc" />
        </View>

        <TextInput
          style={[styles.input, modoOscuro && tema.texto]}
          placeholderTextColor={modoOscuro ? colores.placeholderOscuro : undefined}
          placeholder="Ingrese su correo"
          value={email}
          onChangeText={(texto) => {
            setEmail(texto);
            if (errorCorreo) setErrorCorreo(errorDeCorreo(texto));
          }}
          onBlur={() => setErrorCorreo(errorDeCorreo(email))}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      {!!errorCorreo && <Text style={[estilosAuth.ayuda, estilosAuth.textoError]}>{errorCorreo}</Text>}

      <TouchableOpacity
        style={[styles.button, botonDeshabilitado && estilosAuth.botonDeshabilitado]}
        onPress={enviarSolicitud}
        disabled={botonDeshabilitado}
      >
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={[styles.button2, modoOscuro && tema.borde]}  onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.buttonText2, modoOscuro && tema.texto]}>Volver al Inicio de sesión</Text>
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
