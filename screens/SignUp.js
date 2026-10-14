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

  const handleSignUp = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Error",
        "La contraseña debe tener al menos 6 caracteres, incluyendo una letra mayúscula, una minúscula y un número."
      );
      return;
    }

    let credential;
    try {
      credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      console.error('Error de registro:', error.code, error.message);
      let errorMessage = "Hubo un problema al registrar el usuario.";
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "El correo electrónico ya está en uso.";
          break;
        case 'auth/invalid-email':
          errorMessage = "El formato del correo electrónico no es válido.";
          break;
        case 'auth/weak-password':
          errorMessage = "La contraseña es demasiado débil.";
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
    // Firebase inicia la sesión y el navegador muestra Home.
  };

  return (
    <BarraVerdeSuperior>
    <View style={[estilosAuth.container, { marginTop: 40 }, modoOscuro && tema.fondo]}>
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
          onChangeText={setFirstName}
        />
      </View>
      <View style={[estilosAuth.inputContainer, tema.campo]}>
        <View style={estilosAuth.iconContainer}>
          <FontAwesome name="user" size={20} color="#ccc" />
        </View>
        <TextInput
          style={[estilosAuth.input, modoOscuro && tema.texto]}
          placeholderTextColor={modoOscuro ? colores.placeholderOscuro : undefined}
          placeholder="Ingrese su apellido"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <View style={[estilosAuth.inputContainer, tema.campo]}>
        <View style={estilosAuth.iconContainer}>
          <FontAwesome name="envelope" size={20} color="#ccc" />
        </View>
        <TextInput
          style={[estilosAuth.input, modoOscuro && tema.texto]}
          placeholderTextColor={modoOscuro ? colores.placeholderOscuro : undefined}
          placeholder="Ingrese su correo"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
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
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity style={estilosAuth.eyeButton} onPress={() => setShowPassword(!showPassword)}>
          <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={20} color="#ccc" />
        </TouchableOpacity>
      </View>
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
        />
        <TouchableOpacity style={estilosAuth.eyeButton} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <FontAwesome name={showConfirmPassword ? "eye-slash" : "eye"} size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={estilosAuth.button} onPress={handleSignUp}>
        <Text style={estilosAuth.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity  style={[estilosAuth.button2, modoOscuro && tema.borde]}  onPress={() => navigation.navigate('Login')}>
        <Text style={[estilosAuth.buttonText2, modoOscuro && tema.texto]}>Ya tengo cuenta</Text>
      </TouchableOpacity>
    </View>
    </BarraVerdeSuperior>
  );
}

