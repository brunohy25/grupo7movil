import {View,Text,TouchableOpacity,Switch,StyleSheet,ScrollView,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../constants/colores";
import { estilosGlobales, estilosTema } from "../constants/estilos";
import { usarTema } from "../contexto/ContextoTema";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BarraNavegaciónInferior from "../components/BarraNavegaciónInferior";

export default function Ajustes({ navigation }) {
  const { modoOscuro, cambiarTema } = usarTema();
  const tema = estilosTema[modoOscuro ? "oscuro" : "claro"];
  const insets = useSafeAreaInsets();

  return (
    <View style={[estilosGlobales.contenedorVerde, { paddingTop: insets.top }]}>
      <View style={[estilosGlobales.encabezado,estilos.encabezadoAjustes]}>
        <Text style={[estilosGlobales.titulo,estilos.tituloAjustes]}>Ajustes</Text>
      </View>

      <ScrollView 
        style={[tema.fondo, estilosGlobales.bordeRedondeadoAbajo]}
        contentContainerStyle={[estilosGlobales.contenido,estilos.contenidoAjustes, { flexGrow: 1 }]}
      >
        <Text style={[estilos.subtitulo,tema.texto]}>Apariencia</Text>

        <View style={[estilos.opcion,tema.tarjetaAjustes]}>
          <View style={estilos.informacion}>
            <Ionicons name="moon-outline" size={24} color={tema.texto.color}/>

            <Text style={[estilos.texto,tema.texto]}>Modo oscuro</Text>
          </View>

          <Switch value={modoOscuro} onValueChange={cambiarTema}
            trackColor={{false: colores.switchInactivo, true: colores.switchActivo}}
            thumbColor={colores.blanco}
          />
        </View>
      </ScrollView>
      <BarraNavegaciónInferior navigation={navigation}/>
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
