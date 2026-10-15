import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { auth, db } from '../src/config/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { colores } from '../constants/colores';
import { estilosAuth, estilosTema } from '../constants/estilos';
import { usarTema } from '../contexto/ContextoTema';
import BarraVerdeSuperior from '../components/BarraVerdeSuperior';
import { REGEX_NOMBRE, REGEX_CORREO, REGLAS_CONTRASENA, MENSAJE_NOMBRE_INVALIDO } from '../src/utilidades/validaciones';

const nombreValido = (texto) => REGEX_NOMBRE.test(texto.trim());
const correoValido = (texto) => REGEX_CORREO.test(texto.trim());

export default function SignUp({ navigation }) {
  const { modoOscuro } = usarTema();
  const tema = estilosTema[modoOscuro ? 'oscuro' : 'claro'];
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errores, setErrores] = useState({ nombre: false, apellido: false, correo: false });
  const [contrasenaEnfocada, setContrasenaEnfocada] = useState(false);
  const [registrando, setRegistrando] = useState(false);

  // Se valida al salir del campo; si ya hay un error, se revalida mientras se escribe
  const marcarError = (campo, hayError) => setErrores((previos) => ({ ...previos, [campo]: hayError }));
  const cambiarCampo = (campo, setValor, esValido) => (texto) => {
    setValor(texto);
    if (errores[campo]) marcarError(campo, !esValido(texto));
  };

  const contrasenasNoCoinciden = confirmPassword !== '' && confirmPassword !== password;
  const formularioValido =
    nombreValido(firstName) &&
    nombreValido(lastName) &&
    correoValido(email) &&
    REGLAS_CONTRASENA.every((regla) => regla.cumple(password)) &&
    confirmPassword === password;

  const handleSignUp = async () => {
    if (!formularioValido) {
      Alert.alert("Error", "Por favor, complete todos los campos para continuar");
      return;
    }

    setRegistrando(true);
    let credential;
    try {
      credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      console.error('Error de registro:', error.code, error.message);
      let errorMessage = "Hubo un problema al registrar el usuario.";
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "Este correo electrónico ya se encuentra registrado";
          break;
        case 'auth/invalid-email':
          errorMessage = "El formato del correo electrónico no es válido.";
          break;
        case 'auth/weak-password':
          errorMessage = "La contraseña es demasiado débil.";
          break;
        case 'auth/password-does-not-meet-requirements':
          errorMessage = "La contraseña no cumple los requisitos: debe tener entre 6 y 16 caracteres e incluir una mayúscula, una minúscula y un número.";
          break;
        case 'auth/network-request-failed':
          errorMessage = "Error de conexión, por favor intenta más tarde.";
          break;
        case 'auth/invalid-api-key':
          errorMessage = "La clave API de Firebase no es válida. Revisa el archivo .env.";
          break;
      }
      Alert.alert("Error", errorMessage);
      setRegistrando(false);
      return;
    }

    try {
      await updateProfile(credential.user, { displayName: `${firstName.trim()} ${lastName.trim()}` });
      if (db) {
        await setDoc(doc(db, "usuarios", credential.user.uid), {
          nombre: firstName.trim(),
          apellido: lastName.trim(),
          email: email.trim(),
        });
      }
      Alert.alert("Registro exitoso", "Usuario registrado con éxito.");
    } catch (error) {
      Alert.alert("Cuenta creada", "La cuenta se creó, pero no se pudo guardar el nombre.");
    }
    setRegistrando(false);
    // Firebase inicia la sesión y el navegador muestra Home.
  };

  return (
    <BarraVerdeSuperior>
    <View style={[estilosAuth.container, { paddingTop: 20, paddingBottom: 20 }, modoOscuro && tema.fondo]}>
      <Image source={require('../assets/logos/logo.png')} style={estilosAuth.logo} />
      <Text style={[estilosAuth.title, modoOscuro && tema.texto]}>Registrar Cuenta</Text>
      <View style={[estilosAuth.inputContainer, tema.campo]}>
        <View style={estilosAuth.iconContainer}>
          <FontAwesome name="user" size={20} color="#ccc" />
        </View>
        <TextInput
          style={[estilosAuth.input, modoOscuro && tema.texto]}
          placeholderTextColor={modoOscuro ? colores.placeholderOscuro : undefined}
          placeholder="Ingrese su nombre"
          value={firstName}
          onChangeText={cambiarCampo('nombre', setFirstName, nombreValido)}
          onBlur={() => marcarError('nombre', !nombreValido(firstName))}
        />
      </View>
      {errores.nombre && <Text style={[estilosAuth.ayuda, estilosAuth.textoError]}>{MENSAJE_NOMBRE_INVALIDO}</Text>}
      <View style={[estilosAuth.inputContainer, tema.campo]}>
        <View style={estilosAuth.iconContainer}>
          <FontAwesome name="user" size={20} color="#ccc" />
        </View>
        <TextInput
          style={[estilosAuth.input, modoOscuro && tema.texto]}
          placeholderTextColor={modoOscuro ? colores.placeholderOscuro : undefined}
          placeholder="Ingrese su apellido"
          value={lastName}
          onChangeText={cambiarCampo('apellido', setLastName, nombreValido)}
          onBlur={() => marcarError('apellido', !nombreValido(lastName))}
        />
      </View>
      {errores.apellido && <Text style={[estilosAuth.ayuda, estilosAuth.textoError]}>{MENSAJE_NOMBRE_INVALIDO}</Text>}
      <View style={[estilosAuth.inputContainer, tema.campo]}>
        <View style={estilosAuth.iconContainer}>
          <FontAwesome name="envelope" size={20} color="#ccc" />
        </View>
        <TextInput
          style={[estilosAuth.input, modoOscuro && tema.texto]}
          placeholderTextColor={modoOscuro ? colores.placeholderOscuro : undefined}
          placeholder="Ingrese su correo"
          value={email}
          onChangeText={cambiarCampo('correo', setEmail, correoValido)}
          onBlur={() => marcarError('correo', !correoValido(email))}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      {errores.correo && <Text style={[estilosAuth.ayuda, estilosAuth.textoError]}>Por favor, ingrese un formato de correo válido</Text>}
      <View style={[estilosAuth.inputContainer, tema.campo]}>
        <View style={estilosAuth.iconContainer}>
          <FontAwesome name="lock" size={20} color="#ccc" />
        </View>
        <TextInput
          style={[estilosAuth.input, modoOscuro && tema.texto]}
          placeholderTextColor={modoOscuro ? colores.placeholderOscuro : undefined}
          placeholder="Ingrese su contraseña"
          value={password}
          onChangeText={setPassword}
          onFocus={() => setContrasenaEnfocada(true)}
          onBlur={() => setContrasenaEnfocada(false)}
          secureTextEntry={!showPassword}
          maxLength={16}
        />
        <TouchableOpacity style={estilosAuth.eyeButton} onPress={() => setShowPassword(!showPassword)}>
          <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={20} color="#ccc" />
        </TouchableOpacity>
      </View>
      {contrasenaEnfocada || password ? (
        <View style={estilosAuth.ayuda}>
          {REGLAS_CONTRASENA.map(({ texto, cumple }) => {
            const cumplida = cumple(password);
            const color = cumplida ? colores.verde : tema.textoSecundario.color;
            return (
              <View key={texto} style={estilosAuth.filaRegla}>
                <FontAwesome name={cumplida ? "check-circle" : "circle-o"} size={13} color={color} />
                <Text style={[estilosAuth.textoAyuda, { color }]}>{texto}</Text>
              </View>
            );
          })}
        </View>
      ) : (
        <Text style={[estilosAuth.ayuda, estilosAuth.textoAyuda, tema.textoSecundario]}>
          Mínimo 6 caracteres, una mayúscula, una minúscula, un número
        </Text>
      )}
      <View style={[estilosAuth.inputContainer, tema.campo]}>
        <View style={estilosAuth.iconContainer}>
          <FontAwesome name="lock" size={20} color="#ccc" />
        </View>
        <TextInput
          style={[estilosAuth.input, modoOscuro && tema.texto]}
          placeholderTextColor={modoOscuro ? colores.placeholderOscuro : undefined}
          placeholder="Confirme su contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          maxLength={16}
        />
        <TouchableOpacity style={estilosAuth.eyeButton} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <FontAwesome name={showConfirmPassword ? "eye-slash" : "eye"} size={20} color="#ccc" />
        </TouchableOpacity>
      </View>
      {contrasenasNoCoinciden && <Text style={[estilosAuth.ayuda, estilosAuth.textoError]}>Las contraseñas no coinciden</Text>}

      <TouchableOpacity
        style={[estilosAuth.button, (!formularioValido || registrando) && estilosAuth.botonDeshabilitado]}
        onPress={handleSignUp}
        disabled={!formularioValido || registrando}
      >
        <Text style={estilosAuth.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity  style={[estilosAuth.button2, modoOscuro && tema.borde]}  onPress={() => navigation.navigate('Login')}>
        <Text style={[estilosAuth.buttonText2, modoOscuro && tema.texto]}>Ya tengo cuenta</Text>
      </TouchableOpacity>
    </View>
    </BarraVerdeSuperior>
  );
}

