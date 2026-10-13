import { View,TouchableOpacity,Image,Text} from "react-native";
import { estilos, estilosGlobales } from '../constants/estilos';


export default function BarraNavegaciónInferior({navigation}) {
  return (
      <View style={estilos.barraNavegacion}>
        <TouchableOpacity style={estilos.itemNavegacion} onPress={() => {
  navigation.navigate("Home");}}>
          <View style={estilos.contenedorIconoNav}>
            <Image
              source={require("../assets/iconos/Icono_home.png")}
              style={estilosGlobales.iconoNav}
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
              source={require("../assets/iconos/Icono_perfil.png")}
              style={estilosGlobales.iconoNav}
            />
            <Text style={estilos.textoNavInactivo}>Perfil</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.itemNavegacion}
          onPress={() => {
            navigation.navigate("Ajustes");
          }}
        >
          <View style={estilos.contenedorIconoNav}>
            <Image
              source={require("../assets/iconos/Icono_ajustes.png")}
              style={estilosGlobales.iconoNav}
            />
            <Text style={estilos.textoNavInactivo}>Ajustes</Text>
          </View>
        </TouchableOpacity>
      </View>
  );
}
