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
import { auth } from "../src/config/firebaseConfig";
import { colores } from "../constants/colores";
import { estilosAuth, estilosTema } from "../constants/estilos";
import { usarTema } from "../contexto/ContextoTema";
import { mostrarAlerta } from "../contexto/ContextoAlerta";
import BarraVerdeSuperior from "../components/BarraVerdeSuperior";
import { REGEX_CORREO } from "../src/utilidades/validaciones"; // CAMBIO 1: reutilizamos la validación de correo del SignUp

// CAMBIO 1: devuelven el mensaje de error, o "" si el campo está bien
const mensajeCorreo = (texto) => {
  if (!texto.trim()) return "Ingrese su correo electrónico.";
  if (!REGEX_CORREO.test(texto.trim())) return "Por favor, ingrese un formato de correo válido";
  return "";
};
const mensajeContrasena = (texto) => (!texto ? "Ingrese su contraseña." : "");

export default function Login({ navigation }) {
  const { modoOscuro } = usarTema();
  const tema = estilosTema[modoOscuro ? "oscuro" : "claro"];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errores, setErrores] = useState({ correo: "", contrasena: "" }); // CAMBIO 2: errores debajo de cada campo
  const [iniciando, setIniciando] = useState(false); // CAMBIO 3: evita tocar el botón dos veces

  // Se valida al salir del campo; si ya hay un error, se revalida mientras se escribe
  const cambiarCorreo = (texto) => {
    setEmail(texto);
    if (errores.correo) setErrores((previos) => ({ ...previos, correo: mensajeCorreo(texto) }));
  };
  const cambiarContrasena = (texto) => {
    setPassword(texto);
    if (errores.contrasena) setErrores((previos) => ({ ...previos, contrasena: mensajeContrasena(texto) }));
  };

  const handleLogin = async () => {
    const errorCorreo = mensajeCorreo(email);
    const errorContrasena = mensajeContrasena(password);

    if (errorCorreo || errorContrasena) {
      setErrores({ correo: errorCorreo, contrasena: errorContrasena });
      return;
    }

    try {
      setIniciando(true);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      mostrarAlerta({
        titulo: "Sesión iniciada",
        mensaje: "Has iniciado sesión correctamente.",
        textoConfirmar: "Continuar",
      });
    } catch (error) {
      console.error("Error de inicio de sesión:", error.code, error.message);
      let errorMessage = "Hubo un problema al iniciar sesión.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "El formato del correo electrónico no es válido.";
          break;
        // CAMBIO 4: Firebase no distingue si falló el correo o la contraseña, así que el mensaje es general
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
        case "auth/missing-password":

          errorMessage = "Correo o contraseña incorrectos.";
          break;
        case "auth/user-disabled":
          errorMessage = "Esta cuenta fue deshabilitada.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Demasiados intentos fallidos. Esperá unos minutos e intentá de nuevo.";
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
    } finally {
      setIniciando(false);
    }
  };

  return (
    <BarraVerdeSuperior>
      <View style={[estilosAuth.container, { paddingTop: 20, paddingBottom: 20 }, modoOscuro && tema.fondo]}>
        <Image source={require("../assets/logos/logo.png")} style={estilosAuth.logo} />
        <Text style={[estilosAuth.titleLogo, modoOscuro && tema.texto]}>SABOR ANDINO</Text>
        <Text style={[estilosAuth.title, modoOscuro && tema.texto]}>Iniciar sesión</Text>
        <Text style={[estilosAuth.label, modoOscuro && tema.texto]}>Correo electrónico</Text>
        <View style={[estilosAuth.inputContainer, tema.campo]}>
          <View style={estilosAuth.iconContainer}>
            <FontAwesome name="envelope" size={20} color={colores.iconoGris} />
          </View>
          <TextInput
            style={[estilosAuth.input, modoOscuro && tema.texto]}
            placeholderTextColor={modoOscuro ? colores.placeholderOscuro : undefined}
            placeholder="Ingrese su correo"
            value={email}
            onChangeText={cambiarCorreo}
            onBlur={() => setErrores((previos) => ({ ...previos, correo: mensajeCorreo(email) }))}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {!!errores.correo && <Text style={[estilosAuth.ayuda, estilosAuth.textoError]}>{errores.correo}</Text>}

        <Text style={[estilosAuth.label, modoOscuro && tema.texto]}>Contraseña</Text>
        <View style={[estilosAuth.inputContainer, tema.campo]}>
          <View style={estilosAuth.iconContainer}>
            <FontAwesome name="lock" size={20} color={colores.iconoGris} />
          </View>
          <TextInput
            style={[estilosAuth.input, modoOscuro && tema.texto]}
            placeholderTextColor={modoOscuro ? colores.placeholderOscuro : undefined}
            placeholder="Ingrese su contraseña"
            value={password}
            onChangeText={cambiarContrasena}
            onBlur={() => setErrores((previos) => ({ ...previos, contrasena: mensajeContrasena(password) }))}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={estilosAuth.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.7}
          >
            <FontAwesome
              name={showPassword ? "eye-slash" : "eye"}
              size={20}
              color={colores.iconoGris}
            />
          </TouchableOpacity>
        </View>
        {!!errores.contrasena && <Text style={[estilosAuth.ayuda, estilosAuth.textoError]}>{errores.contrasena}</Text>}

        <TouchableOpacity
          style={[estilosAuth.button, iniciando && estilosAuth.botonDeshabilitado]}
          onPress={handleLogin}
          disabled={iniciando}
        >
          <Text style={estilosAuth.buttonText}>{iniciando ? "Ingresando..." : "Iniciar Sesión"}</Text>
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