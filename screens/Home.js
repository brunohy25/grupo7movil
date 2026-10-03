import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from '../constants/colores';
import { estilos } from '../constants/estilos';
import BarraNavegaciónInferior from "../components/BarraNavegaciónInferior";

export default function Home({ navigation }) {

  return (
    <SafeAreaView
      style={estilos.contenedorPrincipal}
      edges={["top", "left", "right"]}
    >
      <StatusBar barStyle="light-content" backgroundColor={colores.verdePrincipal} />

      {/* Contenido principal */}
      <ScrollView
        contentContainerStyle={estilos.cuerpoScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.tarjetaCabecera}>
          {/* Campana de notificaciones */}
      {/*<TouchableOpacity style={estilos.button} onPress={handleLogOut}>
        <Text style={estilos.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>*/}
          <TouchableOpacity
            style={estilos.botonNotificacion}
            onPress={() => alert("Sin nuevas notificaciones")}
          >
            <Image
              source={require("../assets/Icono_notificaciones.png")}
              style={estilos.iconoNotificacion}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Logo */}
          <View style={estilos.contenedorLogo}>
            <Image
              source={require("../assets/logo_sabores.png")}
              style={estilos.logoEstilo}
              resizeMode="contain"
            />
          </View>

          {/* Imagen separadora, ajustada al ancho de pantalla */}
          <Image
            source={require("../assets/fondo_home.png")}
            style={estilos.fondoDivisor}
            resizeMode="cover"
          />
        </View>

        {/* Título de sección */}
        <Text style={estilos.textoPregunta}>¿Qué necesitás gestionar?</Text>

        {/* Fila 1 */}
        <View style={estilos.filaBotones}>
          <TouchableOpacity
            style={estilos.botonGrilla}
            onPress={() => navigation.navigate("Productos")}
          >
            <View style={estilos.contenidoBotonGrilla}>
              <Image
                source={require("../assets/Icono_productos.png")}
                style={{ width: 32, height: 32, resizeMode: "contain" }}
              />
              <Text style={estilos.textoBoton}>Productos</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={estilos.botonGrilla}
            onPress={() => alert("Va a la sección Pedidos")}
          >
            <View style={estilos.contenidoBotonGrilla}>
              <Image
                source={require("../assets/Icono_pedidos.png")}
                style={{ width: 32, height: 32, resizeMode: "contain" }}
              />
              <Text style={estilos.textoBoton}>Pedidos</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Fila 2 */}
        <View style={estilos.filaBotones}>
          <TouchableOpacity
            style={estilos.botonGrilla}
            onPress={() => alert("Va a la sección Proveedores")}
          >
            <View style={estilos.contenidoBotonGrilla}>
              <Image
                source={require("../assets/Icono_proveedores.png")}
                style={{ width: 32, height: 32, resizeMode: "contain" }}
              />
              <Text style={estilos.textoBoton}>Proveedores</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={estilos.botonGrilla}
            onPress={() => alert("Va a la sección Movimientos")}
          >
            <View style={estilos.contenidoBotonGrilla}>
              <Image
                source={require("../assets/Icono_Entregas2.png")}
                style={{ width: 32, height: 32, resizeMode: "contain" }}
              />
              <Text style={estilos.textoBoton}>Cobranzas</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Fila 3 */}
        <View style={estilos.filaBotones}>
          <TouchableOpacity
            style={estilos.botonGrilla}
            onPress={() => alert("Va a la sección Depósito")}
          >
            <View style={estilos.contenidoBotonGrilla}>
              <Image
                source={require("../assets/Icono_depositos.png")}
                style={{ width: 32, height: 32, resizeMode: "contain" }}
              />
              <Text style={estilos.textoBoton}>Depósito</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={estilos.botonGrilla}
            onPress={() => alert("Va a la sección Entregas")}
          >
            <View style={estilos.contenidoBotonGrilla}>
              <Image
                source={require("../assets/Icono_entregas.png")}
                style={{ width: 32, height: 32, resizeMode: "contain" }}
              />
              <Text style={estilos.textoBoton}>Entregas</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Barra de navegación inferior */}
            <BarraNavegaciónInferior navigation={navigation}/>
    </SafeAreaView>
  );
}
