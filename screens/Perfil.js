// (˶˃ ᵕ ˂˶) .ᐟ.ᐟ
import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,Image,ScrollView,} from "react-native";
import { signOut, updateProfile } from "firebase/auth";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { auth } from "../src/config/firebaseConfig";
import { colores } from "../constants/colores";

export default function Perfil({ navigation }) {
  const usuario = auth.currentUser;

  // me rindo, no se como separar nombre y apellido
  const [nombreCompleto, setNombreCompleto] = useState(usuario?.displayName || "");

  const [editando, setEditando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);

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
      Alert.alert("Error","No se pudo abrir la galería.");
    }
  };

  
  const guardarCambios = async () => {
    if (!nombreCompleto.trim()) {
      Alert.alert("Atención","Ingresá tu nombre y apellido.");
      return;
    }

    if (!usuario) {
      Alert.alert("Error","No se encontró el usuario.");
      return;
    }

    try {
      setGuardando(true);

      await updateProfile(usuario, {
        displayName: nombreCompleto.trim(),
      });

      setEditando(false);

      Alert.alert("Éxito","Perfil actualizado correctamente.");
    } catch (error) {
      Alert.alert("Error","No se pudo actualizar el perfil.");
    } finally {
      setGuardando(false);
    }
  };


  
  const cancelarEdicion = () => {
    setNombreCompleto(usuario?.displayName || "");
    setEditando(false);
  };


  const cerrarSesion = () => {
    Alert.alert("Cerrar sesión","¿Querés cerrar sesión?",
      [
        {text: "Cancelar", style: "cancel",},
        {
          text: "Salir",
          onPress: async () => {
            try {
              await signOut(auth);
            } catch (error) {
              Alert.alert("Error","No se pudo cerrar sesión.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={estilos.contenedor}>
      <View style={estilos.encabezado}>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={estilos.flecha}>←</Text>
        </TouchableOpacity>

        <Text style={estilos.titulo}>
          {editando ? "Editar Perfil" : "Mi Perfil"}
        </Text>

      </View>

      <ScrollView
        contentContainerStyle={estilos.contenido}
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

        
        <Text style={estilos.etiqueta}>Nombre y apellido</Text>

        <View style={estilos.contenedorCampo}>
          <TextInput
            style={estilos.campoNombre}
            value={nombreCompleto}
            onChangeText={setNombreCompleto}
            editable={editando}
            placeholder="Nombre y apellido"
          />

          {editando && (
            <MaterialIcons name="edit" size={22} color={colores.verdeOscuro}/>
          )}
        </View>

        <Text style={estilos.etiqueta}>Correo electrónico</Text>

        <TextInput
          style={[
            estilos.campo,
            estilos.campoBloqueado,
          ]}
          value={usuario?.email || ""}
          editable={false}
        />

        {editando ? (
          <>

            <TouchableOpacity style={estilos.boton} onPress={guardarCambios} disabled={guardando}>
              <Text style={estilos.textoBoton}>
                {guardando
                  ? "Guardando..."
                  : "Guardar cambios"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={estilos.botonSecundario} onPress={cancelarEdicion}>
              <Text style={estilos.textoSecundario}>Cancelar</Text>
            </TouchableOpacity>

          </>
        ) : (
          <>

            <TouchableOpacity style={estilos.boton} onPress={() => setEditando(true)}>
              <Text style={estilos.textoBoton}>Editar perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={estilos.botonSecundario} onPress={cerrarSesion}>
              <Text style={estilos.textoSecundario}>Cerrar sesión</Text>
            </TouchableOpacity>

          </>
        )}

      </ScrollView>
    </View>
  );
}


const estilos = StyleSheet.create({

  // CONTENEDOR PRINCIPAL
  contenedor: {
    flex: 1,
    backgroundColor: colores.crema,
  },

  // ENCABEZADO
  encabezado: {
    backgroundColor: colores.verdePrincipal,
    paddingTop: 55,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  flecha: {
    color: colores.blanco,
    fontSize: 28,
    marginRight: 25,
  },

  titulo: {
    color: colores.blanco,
    fontSize: 20,
    fontWeight: "bold",
  },

  contenido: {
    padding: 25,
  },

  // FOTO DE PERFIL
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

  // BOTÓN DE CÁMARA
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

  // ETIQUETAS
  etiqueta: {
    color: colores.verdeOscuro,
    fontSize: 15,
    marginBottom: 8,
  },

  // CAMPOS
  campo: {
    backgroundColor: colores.campoFondo,
    borderColor: colores.campoBorde,
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    color: colores.verdeOscuro,
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

  // BOTÓN PRINCIPAL
  boton: {
    backgroundColor: colores.verdePrincipal,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  textoBoton: {
    color: colores.blanco,
    fontSize: 16,
    fontWeight: "bold",
  },

  // BOTÓN SECUNDARIO
  botonSecundario: {
    borderWidth: 1,
    borderColor: colores.verdeOscuro,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },

  textoSecundario: {
    color: colores.verdeOscuro,
    fontSize: 16,
  },

});


