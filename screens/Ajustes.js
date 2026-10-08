
import React, { useState } from "react";
import {View,Text,TouchableOpacity,Switch,StyleSheet,ScrollView,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../constants/colores";
import { estilosGlobales } from "../constants/estilos";

export default function Ajustes({ navigation }) {
  const [modoOscuro, setModoOscuro] = useState(false);

  const colorFondo = modoOscuro ? "#1E1E1E" : colores.blanco;
  const colorTarjeta = modoOscuro ? "#333333" : "#F2F2F2";
  const colorTexto = modoOscuro ? colores.blanco : colores.verdeOscuro;

  return (
    <View
      style={[
        estilosGlobales.contenedor,
        { backgroundColor: colorFondo },
      ]}
    >
      <View
        style={[
          estilosGlobales.encabezado,
          estilos.encabezadoAjustes,
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={26}
            color={colores.blanco}
          />
        </TouchableOpacity>

        <Text
          style={[
            estilosGlobales.titulo,
            estilos.tituloAjustes,
          ]}
        >
          Ajustes
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          estilosGlobales.contenido,
          estilos.contenidoAjustes,
        ]}
      >
        <Text
          style={[
            estilos.subtitulo,
            { color: colorTexto },
          ]}
        >
          Apariencia
        </Text>

        <View
          style={[
            estilos.opcion,
            { backgroundColor: colorTarjeta },
          ]}
        >
          <View style={estilos.informacion}>
            <Ionicons
              name="moon-outline"
              size={24}
              color={colorTexto}
            />

            <Text
              style={[
                estilos.texto,
                { color: colorTexto },
              ]}
            >
              Modo oscuro
            </Text>
          </View>

          <Switch
            value={modoOscuro}
            onValueChange={setModoOscuro}
            trackColor={{
              false: "#CCCCCC",
              true: "#7D9B76",
            }}
            thumbColor={colores.blanco}
          />
        </View>
      </ScrollView>
    </View>
  );
}

// estilos propios de ajustes
const estilos = StyleSheet.create({
  encabezadoAjustes: {
    backgroundColor: colores.verdePrincipal,
    padding: 20,
    gap: 20,
  },

  tituloAjustes: {
    fontSize: 22,
  },

  contenidoAjustes: {
    padding: 20,
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: colores.verdeOscuro,
    marginBottom: 15,
  },

  opcion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#F2F2F2",
  },

  informacion: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  texto: {
    fontSize: 16,
    color: colores.verdeOscuro,
  },
});
