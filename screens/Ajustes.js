import { View, Text, Switch, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colores } from "../constants/colores";
import { estilos, estilosTema } from "../constants/estilos";
import { usarTema } from "../contexto/ContextoTema";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BarraNavegaciónInferior from "../components/BarraNavegaciónInferior";

export default function Ajustes({ navigation }) {
  const { modoOscuro, cambiarTema } = usarTema();
  const tema = estilosTema[modoOscuro ? "oscuro" : "claro"];
  const insets = useSafeAreaInsets();

  return (
    <View style={[estilos.contenedorVerde, { paddingTop: insets.top }]}>
      <View style={[estilos.encabezado, estilos.encabezadoAjustes]}>
        <Text style={[estilos.titulo, estilos.tituloAjustes]}>Ajustes</Text>
      </View>

      <ScrollView 
        style={[tema.fondo, estilos.bordeRedondeadoAbajo]}
        contentContainerStyle={[estilos.contenido, estilos.contenidoAjustes, { flexGrow: 1 }]}
      >
        <Text style={[estilos.subtitulo, tema.texto]}>Apariencia</Text>

        <View style={[estilos.opcion, tema.tarjetaAjustes]}>
          <View style={estilos.informacion}>
            <Ionicons name="moon-outline" size={24} color={tema.texto.color}/>

            <Text style={[estilos.texto, tema.texto]}>Modo oscuro</Text>
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
