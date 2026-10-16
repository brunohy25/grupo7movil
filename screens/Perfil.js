import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { signOut, updateProfile } from "firebase/auth";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { auth, db } from "../src/config/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { colores } from "../constants/colores";
import { estilos, estilosTema } from "../constants/estilos";
import { usarTema } from "../contexto/ContextoTema";
import { mostrarAlerta } from "../contexto/ContextoAlerta";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BarraNavegaciónInferior from "../components/BarraNavegaciónInferior";
import { REGEX_NOMBRE, MENSAJE_NOMBRE_INVALIDO } from "../src/utilidades/validaciones";

// 👇 NUEVO: mapa de avatares
const AVATARES = {
  neutral: require("../assets/avatares/neutral.png"),
  hombre: require("../assets/avatares/hombre.png"),
  mujer: require("../assets/avatares/mujer.png"),
};

export default function Perfil({ navigation }) {
  const usuario = auth.currentUser;

  const { modoOscuro } = usarTema();
  const tema = estilosTema[modoOscuro ? "oscuro" : "claro"];
  const insets = useSafeAreaInsets();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [editando, setEditando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [avatarId, setAvatarId] = useState("neutral"); // 👈 NUEVO: reemplaza a fotoPerfil

  React.useEffect(() => {
    const cargarPerfil = async () => {
      if (!usuario || !db) return;

      try {
        const docRef = doc(db, "usuarios", usuario.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombre(data.nombre || "");
          setApellido(data.apellido || "");
          setAvatarId(data.avatarId || "neutral"); // 👈 carga avatarId
        }
      } catch (error) {
        console.error("Error al cargar perfil desde Firestore:", error);
      }
    };

    cargarPerfil();
  }, [usuario?.uid]);

  const guardarCambios = async () => {
    if (!nombre.trim() || !apellido.trim()) {
      mostrarAlerta("Atención", "Ingresá tu nombre y apellido.");
      return;
    }

    if (!REGEX_NOMBRE.test(nombre.trim()) || !REGEX_NOMBRE.test(apellido.trim())) {
      mostrarAlerta("Atención", MENSAJE_NOMBRE_INVALIDO);
      return;
    }

    if (!usuario) {
      mostrarAlerta("Error", "No se encontró el usuario.");
      return;
    }

    try {
      setGuardando(true);

      if (db) {
        await setDoc(
          doc(db, "usuarios", usuario.uid),
          {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            email: usuario.email || "",
            avatarId: avatarId, // 👈 guarda el ID del avatar
          },
          { merge: true }
        );
      }

      await updateProfile(usuario, {
        displayName: `${nombre.trim()} ${apellido.trim()}`,
      });

      setEditando(false);
      mostrarAlerta("Éxito", "Perfil actualizado correctamente.");
    } catch (error) {
      mostrarAlerta("Error", "No se pudo actualizar el perfil.");
    } finally {
      setGuardando(false);
    }
  };

  const cancelarEdicion = async () => {
    if (usuario?.uid && db) {
      try {
        const docSnap = await getDoc(doc(db, "usuarios", usuario.uid));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombre(data.nombre || "");
          setApellido(data.apellido || "");
          setAvatarId(data.avatarId || "neutral"); // 👈 restaura avatarId
        }
      } catch (error) {
        console.error("Error al restaurar perfil:", error);
      }
    }
    setEditando(false);
  };

  const cerrarSesion = () => {
    mostrarAlerta({
      titulo: "Cerrar sesión",
      mensaje: "¿Querés cerrar sesión?",
      textoCancelar: "Cancelar",
      textoConfirmar: "Salir",
      esPeligro: true,
      onConfirmar: async () => {
        try {
          await signOut(auth);
        } catch (error) {
          mostrarAlerta("Error", "No se pudo cerrar sesión.");
        }
      },
    });
  };

  return (
    <View style={[estilos.contenedorVerde, { paddingTop: insets.top }]}>
      <View style={[estilos.encabezado, estilos.encabezadoPerfil]}>
        <Text style={estilos.titulo}>
          {editando ? "Editar Perfil" : "Mi Perfil"}
        </Text>
      </View>

      <ScrollView
        style={[tema.fondo, estilos.bordeRedondeadoAbajo]}
        contentContainerStyle={[estilos.contenido, { flexGrow: 1 }]}
        keyboardShouldPersistTaps="handled"
      >
        {/* 👇 Avatar actual */}
        <View style={estilos.contenedorFoto}>
          <View style={estilos.foto}>
            <Image source={AVATARES[avatarId]} style={estilos.imagenPerfil} />
          </View>
        </View>

        {/* 👇 NUEVO: grilla de selección, solo cuando editando */}
        {editando && (
          <>
            <Text style={[estilos.etiqueta, tema.texto, { textAlign: "center" }]}>
              Elegí tu avatar
            </Text>
            <View style={estilos.grillaAvatares}>
              {Object.keys(AVATARES).map((id) => (
                <TouchableOpacity
                  key={id}
                  onPress={() => setAvatarId(id)}
                  style={[
                    estilos.avatarOpcion,
                    avatarId === id && { borderColor: colores.verdePrincipal },
                  ]}
                >
                  <Image source={AVATARES[id]} style={estilos.avatarImagen} />
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <Text style={[estilos.etiqueta, tema.texto]}>Nombre</Text>

        <View style={[estilos.contenedorCampo, tema.campo]}>
          <TextInput
            style={[estilos.campoNombre, tema.texto]}
            value={nombre}
            onChangeText={setNombre}
            editable={editando}
            placeholder="Nombre"
            placeholderTextColor={modoOscuro ? colores.placeholderOscuro : colores.placeholderClaro}
          />
          {editando && (
            <MaterialIcons name="edit" size={22} color={tema.texto.color} />
          )}
        </View>

        <Text style={[estilos.etiqueta, tema.texto]}>Apellido</Text>

        <View style={[estilos.contenedorCampo, tema.campo]}>
          <TextInput
            style={[estilos.campoNombre, tema.texto]}
            value={apellido}
            onChangeText={setApellido}
            editable={editando}
            placeholder="Apellido"
            placeholderTextColor={modoOscuro ? colores.placeholderOscuro : colores.placeholderClaro}
          />
          {editando && (
            <MaterialIcons name="edit" size={22} color={tema.texto.color} />
          )}
        </View>

        <Text style={[estilos.etiqueta, tema.texto]}>Correo electrónico</Text>

        <TextInput
          style={[estilos.campo, estilos.campoBloqueado, tema.campo]}
          value={usuario?.email || ""}
          editable={false}
        />

        {editando ? (
          <>
            <TouchableOpacity style={estilos.boton} onPress={guardarCambios} disabled={guardando}>
              <Text style={estilos.textoBoton}>
                {guardando ? "Guardando..." : "Guardar cambios"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[estilos.botonSecundario, tema.borde]} onPress={cancelarEdicion}>
              <Text style={[estilos.textoSecundario, tema.texto]}>Cancelar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={estilos.boton} onPress={() => setEditando(true)}>
              <Text style={estilos.textoBoton}>Editar perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[estilos.botonSecundario, tema.borde]} onPress={cerrarSesion}>
              <Text style={[estilos.textoSecundario, tema.texto]}>Cerrar sesión</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
      <BarraNavegaciónInferior navigation={navigation} />
    </View>
  );
}