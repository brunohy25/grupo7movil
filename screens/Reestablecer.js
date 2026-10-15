import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
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
      <View style={[estilosAuth.container, { paddingTop: 20, paddingBottom: 20 }, modoOscuro && tema.fondo]}>
        <Image source={require('../assets/logos/logo.png')} style={estilosAuth.logo} />
        <Text style={[estilosAuth.title, modoOscuro && tema.texto]}>Olvidé mi contraseña</Text>
        <Text style={[estilosAuth.signUpText, modoOscuro && tema.texto]}>Reestablecer contraseña de tu cuenta:</Text>
        <View style={[estilosAuth.inputContainer, tema.campo]}>
          <View style={estilosAuth.iconContainer}>
            <FontAwesome name="user" size={20} color={colores.iconoGris} />
          </View>

          <TextInput
            style={[estilosAuth.input, modoOscuro && tema.texto]}
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
          style={[estilosAuth.button, botonDeshabilitado && estilosAuth.botonDeshabilitado]}
          onPress={enviarSolicitud}
          disabled={botonDeshabilitado}
        >
          <Text style={estilosAuth.buttonText}>Enviar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[estilosAuth.button2, modoOscuro && tema.borde]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[estilosAuth.buttonText2, modoOscuro && tema.texto]}>Volver al Inicio de sesión</Text>
        </TouchableOpacity>
      </View>
    </BarraVerdeSuperior>
  );
}
