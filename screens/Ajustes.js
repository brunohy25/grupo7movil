import {View,Text,TouchableOpacity,Switch,StyleSheet,ScrollView,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../constants/colores";
import { estilosGlobales, estilosTema } from "../constants/estilos";
import { usarTema } from "../contexto/ContextoTema";

export default function Ajustes({ navigation }) {
  const { modoOscuro, cambiarTema } = usarTema();
  const tema = estilosTema[modoOscuro ? "oscuro" : "claro"];

  return (
    <View style={[estilosGlobales.contenedor,tema.fondoAjustes]}>
      <View style={[estilosGlobales.encabezado,estilos.encabezadoAjustes]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color={colores.blanco}/>
        </TouchableOpacity>

        <Text style={[estilosGlobales.titulo,estilos.tituloAjustes]}>Ajustes</Text>
      </View>

      <ScrollView contentContainerStyle={[estilosGlobales.contenido,estilos.contenidoAjustes]}>
        <Text style={[estilos.subtitulo,tema.texto]}>Apariencia</Text>

        <View style={[estilos.opcion,tema.tarjetaAjustes]}>
          <View style={estilos.informacion}>
            <Ionicons name="moon-outline" size={24} color={tema.texto.color}/>

            <Text style={[estilos.texto,tema.texto]}>Modo oscuro</Text>
          </View>

          <Switch value={modoOscuro} onValueChange={cambiarTema}
            trackColor={{false: "#CCCCCC",true: "#7D9B76"}}
            thumbColor={colores.blanco}
          />
        </View>
      </ScrollView>
    </View>
  );
}

// estilos propios de ajustes, el texto de apariencia, el recuadro, la alineación, texto modo oscuro. Ademas tiene espacios
// y tamaño de letras.
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
    marginBottom: 15,
  },

  opcion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
  },

  informacion: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  texto: {
    fontSize: 16,
  },
});
