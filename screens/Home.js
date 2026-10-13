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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colores } from '../constants/colores';
import { estilos, estilosGlobales, estilosTema } from '../constants/estilos';
import { usarTema } from "../contexto/ContextoTema";
import BarraNavegaciónInferior from "../components/BarraNavegaciónInferior";

export default function Home({ navigation }) {
  const { modoOscuro } = usarTema();
  const tema = modoOscuro ? estilosTema.oscuro : estilosTema.claro;
  const insets = useSafeAreaInsets();

  return (
    <View style={estilosGlobales.contenedorVerde}>
      <StatusBar barStyle={modoOscuro ? "light-content" : "dark-content"} backgroundColor="transparent" translucent={true} />

      {/* Contenido principal */}
      <ScrollView
        style={[tema.fondo, estilosGlobales.bordeRedondeadoAbajo, { paddingTop: insets.top }]}
        contentContainerStyle={estilos.cuerpoScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={[estilos.tarjetaCabecera, tema.fondo]}>
          {/* Campana de notificaciones */}
      {/*<TouchableOpacity style={estilos.button} onPress={handleLogOut}>
        <Text style={estilos.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>*/}
          <TouchableOpacity
            style={estilos.botonNotificacion}
            onPress={() => alert("Sin nuevas notificaciones")}
          >
            <Image
              source={require("../assets/iconos/Icono_notificaciones.png")}
              style={estilos.iconoNotificacion}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Logo */}
          <View style={estilos.contenedorLogo}>
            <Image
              source={require("../assets/logos/logo_sabores.png")}
              style={estilos.logoEstilo}
              resizeMode="contain"
            />
          </View>

          {/* Imagen separadora, ajustada al ancho de pantalla */}
          <Image
            source={require("../assets/fondos/fondo_home.png")}
            style={estilos.fondoDivisor}
            resizeMode="cover"
          />
        </View>

        {/* Título de sección */}
        <Text style={[estilos.textoPregunta, tema.texto]}>¿Qué necesitás gestionar?</Text>

        {/* Fila 1 */}
        <View style={estilos.filaBotones}>
          <TouchableOpacity
            style={[estilos.botonGrilla, tema.tarjeta]}
            onPress={() => navigation.navigate("Productos")}
          >
            <View style={estilos.contenidoBotonGrilla}>
              <Image
                source={require("../assets/iconos/Icono_productos.png")}
                style={estilosGlobales.iconoGrilla}
              />
              <Text style={[estilos.textoBoton, modoOscuro && tema.texto]}>Productos</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[estilos.botonGrilla, tema.tarjeta]}
            onPress={() => alert("Va a la sección Pedidos")}
          >
            <View style={estilos.contenidoBotonGrilla}>
              <Image
                source={require("../assets/iconos/Icono_pedidos.png")}
                style={estilosGlobales.iconoGrilla}
              />
              <Text style={[estilos.textoBoton, modoOscuro && tema.texto]}>Pedidos</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Fila 2 */}
        <View style={estilos.filaBotones}>
          <TouchableOpacity
            style={[estilos.botonGrilla, tema.tarjeta]}
            onPress={() => alert("Va a la sección Proveedores")}
          >
            <View style={estilos.contenidoBotonGrilla}>
              <Image
                source={require("../assets/iconos/Icono_proveedores.png")}
                style={estilosGlobales.iconoGrilla}
              />
              <Text style={[estilos.textoBoton, modoOscuro && tema.texto]}>Proveedores</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[estilos.botonGrilla, tema.tarjeta]}
            onPress={() => alert("Va a la sección Movimientos")}
          >
            <View style={estilos.contenidoBotonGrilla}>
              <Image
                source={require("../assets/iconos/Icono_Entregas2.png")}
                style={estilosGlobales.iconoGrilla}
              />
              <Text style={[estilos.textoBoton, modoOscuro && tema.texto]}>Cobranzas</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Fila 3 */}
        <View style={estilos.filaBotones}>
          <TouchableOpacity
            style={[estilos.botonGrilla, tema.tarjeta]}
            onPress={() => alert("Va a la sección Depósito")}
          >
            <View style={estilos.contenidoBotonGrilla}>
              <Image
                source={require("../assets/iconos/Icono_depositos.png")}
                style={estilosGlobales.iconoGrilla}
              />
              <Text style={[estilos.textoBoton, modoOscuro && tema.texto]}>Depósito</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[estilos.botonGrilla, tema.tarjeta]}
            onPress={() => alert("Va a la sección Entregas")}
          >
            <View style={estilos.contenidoBotonGrilla}>
              <Image
                source={require("../assets/iconos/Icono_entregas.png")}
                style={{ width: 32, height: 32, resizeMode: "contain" }}
              />
              <Text style={[estilos.textoBoton, modoOscuro && tema.texto]}>Entregas</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Barra de navegación inferior */}
            <BarraNavegaciónInferior navigation={navigation}/>
    </View>
  );
}
