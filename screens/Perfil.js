// (˶˃ ᵕ ˂˶) .ᐟ.ᐟ
import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,Image,ScrollView,} from "react-native";
import { signOut, updateProfile } from "firebase/auth";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { auth, db } from "../src/config/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { colores } from "../constants/colores";
import { estilosGlobales, estilosTema } from "../constants/estilos";
import { usarTema } from "../contexto/ContextoTema";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BarraNavegaciónInferior from "../components/BarraNavegaciónInferior";

export default function Perfil({ navigation }) {
  const usuario = auth.currentUser;

  //para el modo oscuro
  const { modoOscuro } = usarTema();
  const tema = estilosTema[modoOscuro ? "oscuro" : "claro"];
  const insets = useSafeAreaInsets();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [editando, setEditando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);

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
        }
      } catch (error) {
        console.error("Error al cargar perfil desde Firestore:", error);
      }
    };

    cargarPerfil();
  }, [usuario]);

  const seleccionarFoto = async () => {
    try {
      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!resultado.canceled && resultado.assets?.length > 0) {
        setFotoPerfil(resultado.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo abrir la galería.");
    }
  };

  const guardarCambios = async () => {
    if (!nombre.trim() || !apellido.trim()) {
      Alert.alert("Atención", "Ingresá tu nombre y apellido.");
      return;
    }

    if (!usuario) {
      Alert.alert("Error", "No se encontró el usuario.");
      return;
    }

    try {
      setGuardando(true);

      // Guardamos los campos limpios y separados en la base de datos Firestore
      if (db) {
        await setDoc(
          doc(db, "usuarios", usuario.uid),
          {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            email: usuario.email || "",
          },
          { merge: true }
        );
      }

      // Sincronizamos también el usuario en Auth
      await updateProfile(usuario, {
        displayName: `${nombre.trim()} ${apellido.trim()}`,
      });

      setEditando(false);
      Alert.alert("Éxito", "Perfil actualizado correctamente.");
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el perfil.");
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
        }
      } catch (error) {
        console.error("Error al restaurar perfil:", error);
      }
    }
    setEditando(false);
  };

  const cerrarSesion = () => {
    Alert.alert("Cerrar sesión", "¿Querés cerrar sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Salir",
        onPress: async () => {
          try {
            await signOut(auth);
          } catch (error) {
            Alert.alert("Error", "No se pudo cerrar sesión.");
          }
        },
      },
    ]);
  };

  return (
    <View style={[estilosGlobales.contenedorVerde, { paddingTop: insets.top }]}>

      <View style={[estilosGlobales.encabezado,estilosGlobales.encabezadoPerfil,]}>
        <Text style={estilosGlobales.titulo}>
          {editando ? "Editar Perfil" : "Mi Perfil"}
        </Text>
      </View>

      <ScrollView
        style={[tema.fondo, estilosGlobales.bordeRedondeadoAbajo]}
        contentContainerStyle={[estilosGlobales.contenido, { flexGrow: 1 }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={estilos.contenedorFoto}>
          <View style={estilos.foto}>
            {fotoPerfil ? (
              <Image source={{ uri: fotoPerfil }} style={estilos.imagenPerfil}/>
            ) : (
              <Text style={estilos.iconoFoto}>👤</Text>
            )}
          </View>

          {editando && (
            <TouchableOpacity style={estilos.botonCamara} onPress={seleccionarFoto}>
              <Ionicons name="camera" size={22} color={colores.blanco}/>
            </TouchableOpacity>
          )}
        </View>

        <Text style={[estilosGlobales.etiqueta, tema.texto]}>Nombre</Text>

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
            <MaterialIcons name="edit" size={22} color={tema.texto.color}/>
          )}
        </View>

        <Text style={[estilosGlobales.etiqueta, tema.texto]}>Apellido</Text>

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
            <MaterialIcons name="edit" size={22} color={tema.texto.color}/>
          )}
        </View>

        <Text style={[estilosGlobales.etiqueta, tema.texto]}>Correo electrónico</Text>

        <TextInput
          style={[estilosGlobales.campo, estilos.campoBloqueado, tema.campo]}
          value={usuario?.email || ""}
          editable={false}
        />

        {editando ? (
          <>
            <TouchableOpacity style={estilosGlobales.boton} onPress={guardarCambios} disabled={guardando}>
              <Text style={estilosGlobales.textoBoton}>
                {guardando ? "Guardando..." : "Guardar cambios"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[estilosGlobales.botonSecundario, tema.borde]} onPress={cancelarEdicion}>
              <Text style={[estilosGlobales.textoSecundario, tema.texto]}>Cancelar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={estilosGlobales.boton} onPress={() => setEditando(true)}>
              <Text style={estilosGlobales.textoBoton}>Editar perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[estilosGlobales.botonSecundario, tema.borde]} onPress={cerrarSesion}>
              <Text style={[estilosGlobales.textoSecundario, tema.texto]}>Cerrar sesión</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
      <BarraNavegaciónInferior navigation={navigation}/>
    </View>
  );
}

// estilos propios de perfil como foto de perfil, camara y el formulario con campo bloqueado
const estilos = StyleSheet.create({
  contenedorFoto: {
    width: 110,
    height: 110,
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 35,
  },

  foto: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colores.iconoGris,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  iconoFoto: {
    fontSize: 55,
  },

  imagenPerfil: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  botonCamara: {
    position: "absolute",
    bottom: 0,
    right: -5,
    backgroundColor: colores.verdePrincipal,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colores.blanco,
    elevation: 3,
  },

  campoBloqueado: {
    opacity: 0.6,
  },

  contenedorCampo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colores.campoFondo,
    borderColor: colores.campoBorde,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingRight: 15,
  },

  campoNombre: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 14,
    color: colores.verdeOscuro,
    fontSize: 15,
  },
});