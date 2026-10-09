import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/config/firebaseConfig";
import { colores } from "../constants/colores";
import { estilosAuth } from "../constants/estilos";
import BarraVerdeSuperior from "../components/BarraVerdeSuperior";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Error", "Por favor ingrese ambos campos.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      Alert.alert("Login exitoso", "Has iniciado sesión correctamente.");
      // El observador de Firebase cambia la pantalla al detectar la sesión.
    } catch (error) {
      console.error("Error de inicio de sesión:", error.code, error.message);
      let errorMessage = "Hubo un problema al iniciar sesión.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "El formato del correo electrónico no es válido.";
          break;
        case "auth/invalid-credential":
        case "auth/wrong-password":
          errorMessage = "La contraseña es incorrecta.";
          break;
        case "auth/user-not-found":
          errorMessage = "No se encontró un usuario con este correo.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Error de conexión, por favor intenta más tarde.";
          break;
        case "auth/invalid-api-key":
          errorMessage =
            "La clave API de Firebase no es válida. Revisa el archivo .env.";
          break;
      }
      Alert.alert(
        "Error",
        `${errorMessage}\n\nCódigo: ${error.code ?? "desconocido"}`,
      );
    }
  };

  return (
    <BarraVerdeSuperior>
      <View style={[estilosAuth.container, { marginTop: 60 }]}>
        <Image source={require("../assets/logo.png")} style={estilosAuth.logo} />
        <Text style={estilosAuth.titleLogo}>SABOR ANDINO</Text>
        <Text style={estilosAuth.title}>Iniciar sesión</Text>
        <View style={estilosAuth.inputContainer}>
          <View style={estilosAuth.iconContainer}>
            <FontAwesome name="envelope" size={20} color="#ccc" />
          </View>
          <TextInput
            style={estilosAuth.input}
            placeholder="Ingrese su correo"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={estilosAuth.inputContainer}>
          <View style={estilosAuth.iconContainer}>
            <FontAwesome name="lock" size={20} color="#ccc" />
          </View>
          <TextInput
            style={estilosAuth.input}
            placeholder="Ingrese su contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome
              style={estilosAuth.eyeButton}
              name={showPassword ? "eye-slash" : "eye"}
              size={20}
              color="#ccc"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={estilosAuth.button} onPress={handleLogin}>
          <Text style={estilosAuth.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <Text style={estilosAuth.signUpText}>¿Olvidaste tu contraseña?</Text>
        <TouchableOpacity
          style={estilosAuth.button2}
          onPress={() => navigation.navigate("Reestablecer")}
        >
          <Text style={estilosAuth.buttonText2}>Reestablecer</Text>
        </TouchableOpacity>
        <Text style={estilosAuth.signUpText}>¿No tenes una cuenta?</Text>
        <TouchableOpacity
          style={estilosAuth.button2}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={estilosAuth.buttonText2}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </BarraVerdeSuperior>
  );
}

