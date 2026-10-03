import { View,TouchableOpacity,Image,Text} from "react-native";
import { estilos } from '../constants/estilos';


export default function BarraNavegaciónInferior({navigation}) {
  return (
      <View style={estilos.barraNavegacion}>
        <TouchableOpacity style={estilos.itemNavegacion} onPress={() => {
  navigation.navigate("Home");}}>
          <View style={estilos.contenedorIconoNav}>
            <Image
              source={require("../assets/Icono_home.png")}
              style={{ width: 22, height: 22, resizeMode: "contain" }}
            />
            <Text style={estilos.textoNavActivo}>Inicio</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.itemNavegacion}
          onPress={() => {
            navigation.navigate("Perfil");
          }}
        >
          <View style={estilos.contenedorIconoNav}>
            <Image
              source={require("../assets/Icono_perfil.png")}
              style={{ width: 22, height: 22, resizeMode: "contain" }}
            />
            <Text style={estilos.textoNavInactivo}>Perfil</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.itemNavegacion}
          onPress={() => {
            // navigation.navigate("Ajustes"); // Descomentar cuando tengamos lista la pantalla de Ajustes
            alert("Va a la sección Ajustes");
          }}
        >
          <View style={estilos.contenedorIconoNav}>
            <Image
              source={require("../assets/Icono_ajustes.png")}
              style={{ width: 22, height: 22, resizeMode: "contain" }}
            />
            <Text style={estilos.textoNavInactivo}>Ajustes</Text>
          </View>
        </TouchableOpacity>
      </View>
  );
}
