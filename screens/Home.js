import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";
import { auth } from "../src/config/firebaseConfig";
import { colores } from '../constants/colores';

const anchoPantalla = Dimensions.get("window").width;

export default function Home({ navigation }) {
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cerrar sesión.");
    }
  };

  return (
    <SafeAreaView
      style={styles.contenedorPrincipal}
      edges={["top", "left", "right"]}
    >
      <StatusBar barStyle="light-content" backgroundColor={colores.verdePrincipal} />

      {/* Contenido principal */}
      <ScrollView
        contentContainerStyle={styles.cuerpoScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tarjetaCabecera}>
          {/* Campana de notificaciones */}
      <TouchableOpacity style={styles.button} onPress={handleLogOut}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
          <TouchableOpacity
            style={styles.botonNotificacion}
            onPress={() => alert("Sin nuevas notificaciones")}
          >
            <Image
              source={require("../assets/Icono_notificaciones.png")}
              style={styles.iconoNotificacion}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Logo */}
          <View style={styles.contenedorLogo}>
            <Image
              source={require("../assets/logo_sabores.png")}
              style={styles.logoEstilo}
              resizeMode="contain"
            />
          </View>

          {/* Imagen separadora, ajustada al ancho de pantalla */}
          <Image
            source={require("../assets/fondo_home.png")}
            style={styles.fondoDivisor}
            resizeMode="cover"
          />
        </View>

        {/* Título de sección */}
        <Text style={styles.textoPregunta}>¿Qué necesitás gestionar?</Text>

        {/* Fila 1 */}
        <View style={styles.filaBotones}>
          <TouchableOpacity
            style={styles.botonGrilla}
            onPress={() => navigation.navigate("Productos")}
          >
            <View style={styles.contenidoBotonGrilla}>
              <Image
                source={require("../assets/Icono_productos.png")}
                style={{ width: 32, height: 32, resizeMode: "contain" }}
              />
              <Text style={styles.textoBoton}>Productos</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botonGrilla}
            onPress={() => alert("Va a la sección Pedidos")}
          >
            <View style={styles.contenidoBotonGrilla}>
              <Image
                source={require("../assets/Icono_pedidos.png")}
                style={{ width: 32, height: 32, resizeMode: "contain" }}
              />
              <Text style={styles.textoBoton}>Pedidos</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Fila 2 */}
        <View style={styles.filaBotones}>
          <TouchableOpacity
            style={styles.botonGrilla}
            onPress={() => alert("Va a la sección Proveedores")}
          >
            <View style={styles.contenidoBotonGrilla}>
              <Image
                source={require("../assets/Icono_proveedores.png")}
                style={{ width: 32, height: 32, resizeMode: "contain" }}
              />
              <Text style={styles.textoBoton}>Proveedores</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botonGrilla}
            onPress={() => alert("Va a la sección Movimientos")}
          >
            <View style={styles.contenidoBotonGrilla}>
              <Image
                source={require("../assets/Icono_Movimientos.png")}
                style={{ width: 32, height: 32, resizeMode: "contain" }}
              />
              <Text style={styles.textoBoton}>Movimientos</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Fila 3 */}
        <View style={styles.filaBotones}>
          <TouchableOpacity
            style={styles.botonGrilla}
            onPress={() => alert("Va a la sección Depósito")}
          >
            <View style={styles.contenidoBotonGrilla}>
              <Image
                source={require("../assets/Icono_depositos.png")}
                style={{ width: 32, height: 32, resizeMode: "contain" }}
              />
              <Text style={styles.textoBoton}>Depósito</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botonGrilla}
            onPress={() => alert("Va a la sección Entregas")}
          >
            <View style={styles.contenidoBotonGrilla}>
              <Image
                source={require("../assets/Icono_entregas.png")}
                style={{ width: 32, height: 32, resizeMode: "contain" }}
              />
              <Text style={styles.textoBoton}>Entregas</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Barra de navegación inferior */}
      <View style={styles.barraNavegacion}>
        <TouchableOpacity style={styles.itemNavegacion}>
          <View style={styles.contenedorIconoNav}>
            <Image
              source={require("../assets/Icono_home.png")}
              style={{ width: 22, height: 22, resizeMode: "contain" }}
            />
            <Text style={styles.textoNavActivo}>Inicio</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemNavegacion}
          onPress={() => {
            // navigation.navigate("Perfil"); // Descomentar cuando tengamos lista la pantalla de Perfil
            alert("Va a la sección Perfil");
          }}
        >
          <View style={styles.contenedorIconoNav}>
            <Image
              source={require("../assets/Icono_perfil.png")}
              style={{ width: 22, height: 22, resizeMode: "contain" }}
            />
            <Text style={styles.textoNavInactivo}>Perfil</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemNavegacion}
          onPress={() => {
            // navigation.navigate("Ajustes"); // Descomentar cuando tengamos lista la pantalla de Ajustes
            alert("Va a la sección Ajustes");
          }}
        >
          <View style={styles.contenedorIconoNav}>
            <Image
              source={require("../assets/Icono_ajustes.png")}
              style={{ width: 22, height: 22, resizeMode: "contain" }}
            />
            <Text style={styles.textoNavInactivo}>Ajustes</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: colores.verdePrincipal,
  },
  cuerpoScroll: {
    backgroundColor: colores.crema,
    flexGrow: 1,
    paddingBottom: 30,
    paddingTop: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  tarjetaCabecera: {
    position: "relative", // Para que la campana no se pierda
    backgroundColor: colores.crema,
    paddingTop: 20,
    marginBottom: 10,
  },
  botonNotificacion: {
    position: "absolute",
    right: 20,
    top: 1,
    padding: 8,
    zIndex: 10,
  },
  iconoNotificacion: {
    width: 22,
    height: 22,
  },
  contenedorLogo: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 1,
  },
  logoEstilo: {
    width: 200,
    height: 125,
  },
  fondoDivisor: {
    width: anchoPantalla,
    height: 110,
    marginTop: 0,
  },
  textoPregunta: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 25,
    color: colores.verdeOscuro,
  },
  filaBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  botonGrilla: {
    backgroundColor: colores.blanco,
    width: "48%",
    height: 85,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colores.bordeSuave,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  contenidoBotonGrilla: {
    alignItems: "center",
    justifyContent: "center",
  },
  textoBoton: {
    fontSize: 16,
    fontWeight: "600",
    color: colores.verdePrincipal,
    marginTop: 6,
  },
  barraNavegacion: {
    flexDirection: "row",
    backgroundColor: colores.verdePrincipal,
    height: 60,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 0,
  },
  itemNavegacion: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  contenedorIconoNav: {
    alignItems: "center",
    justifyContent: "center",
  },
  textoNavInactivo: {
    color: colores.verdeClaro,
    fontSize: 13,
  },
  textoNavActivo: {
    color: colores.blanco,
    fontSize: 13,
    fontWeight: "bold",
  },
});
