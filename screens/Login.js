import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/config/firebaseConfig";
import { colores } from "../constants/colores";
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
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.titleLogo}>SABOR ANDINO</Text>
        <Text style={styles.title}>Iniciar sesión</Text>
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <FontAwesome name="envelope" size={20} color="#ccc" />
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

        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <FontAwesome name="lock" size={20} color="#ccc" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome
              style={styles.eyeButton}
              name={showPassword ? "eye-slash" : "eye"}
              size={20}
              color="#ccc"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <Text style={styles.signUpText}>¿No tienes cuenta aún? Regístrate</Text>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.buttonText2}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </BarraVerdeSuperior>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#f3f3eb",
  },
  logo: {
    width: 220,
    height: 150,
    resizeMode: "contain",
  },
  titleLogo: {
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 45,
    paddingHorizontal: 10,
    backgroundColor: "#e3e3dc",
    borderWidth: 1,
    borderColor: "#c5c6bf",
    borderRadius: 7,
    marginBottom: 12,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  button: {
    width: "70%",
    alignItems: "center",
    backgroundColor: "#3e6934",
    paddingVertical: 10,
    borderRadius: 14,
    marginTop: 12,
  },
  button2: {
    width: "70%",
    alignItems: "center",
    backgroundColor: "#fafafa00",
    borderWidth: 1,
    borderColor: "#0c2706",
    paddingVertical: 10,
    borderRadius: 14,
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  buttonText2: {
    color: "#17380a",
    fontSize: 13,
    fontWeight: "bold",
  },
  signUpText: {
    marginTop: 20,
    color: "#1f4912",
  },
  iconContainer: {
    width: 32,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  eyeButton: {
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
