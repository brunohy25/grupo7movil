import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, setProximaAlertaAuth } from "../src/config/firebaseConfig";
import { colores } from "../constants/colores";
import { estilosAuth, estilosTema } from "../constants/estilos";
import { usarTema } from "../contexto/ContextoTema";
import { mostrarAlerta } from "../contexto/ContextoAlerta";
import BarraVerdeSuperior from "../components/BarraVerdeSuperior";

export default function Login({ navigation }) {
  const { modoOscuro } = usarTema();
  const tema = estilosTema[modoOscuro ? "oscuro" : "claro"];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      mostrarAlerta("Error", "Por favor ingrese ambos campos.");
      return;
    }

    try {
      setProximaAlertaAuth({
        titulo: "Sesión iniciada",
        mensaje: "Has iniciado sesión correctamente.",
      });
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      setProximaAlertaAuth(null);
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
      mostrarAlerta("Error", errorMessage);
    }
  };

  return (
    <BarraVerdeSuperior>
      <View style={[estilosAuth.container, { paddingTop: 20, paddingBottom: 20 }, modoOscuro && tema.fondo]}>
        <Image source={require("../assets/logos/logo.png")} style={estilosAuth.logo} />
        <Text style={[estilosAuth.titleLogo, modoOscuro && tema.texto]}>SABOR ANDINO</Text>
        <Text style={[estilosAuth.title, modoOscuro && tema.texto]}>Iniciar sesión</Text>
        <View style={[estilosAuth.inputContainer, tema.campo]}>
          <View style={estilosAuth.iconContainer}>
            <FontAwesome name="envelope" size={20} color={colores.iconoGris} />
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
            <FontAwesome name="lock" size={20} color={colores.iconoGris} />
          </View>
          <TextInput
            style={[estilosAuth.input, modoOscuro && tema.texto]}
            placeholderTextColor={modoOscuro ? colores.placeholderOscuro : undefined}
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
              color={colores.iconoGris}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={estilosAuth.button} onPress={handleLogin}>
          <Text style={estilosAuth.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <Text style={[estilosAuth.signUpText, modoOscuro && tema.texto]}>¿Olvidaste tu contraseña?</Text>
        <TouchableOpacity
          style={[estilosAuth.button2, modoOscuro && tema.borde]}
          onPress={() => navigation.navigate("Reestablecer")}
        >
          <Text style={[estilosAuth.buttonText2, modoOscuro && tema.texto]}>Reestablecer</Text>
        </TouchableOpacity>
        <Text style={[estilosAuth.signUpText, modoOscuro && tema.texto]}>¿No tenes una cuenta?</Text>
        <TouchableOpacity
          style={[estilosAuth.button2, modoOscuro && tema.borde]}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={[estilosAuth.buttonText2, modoOscuro && tema.texto]}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </BarraVerdeSuperior>
  );
}
