import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../constants/colores";
import { estilos } from "../constants/estilos";
import { COLORS, SPACING, RADIUS, FONTS } from '../theme/colors';
import { signOut } from "firebase/auth";
import { auth } from "../src/config/firebaseConfig";
import BarraNavegaciónInferior from "../components/BarraNavegaciónInferior";


export default function Perfil({ navigation, route}) {

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
      style={estilos.contenedorPrincipal}
      edges={["top", "left", "right"]}
    >
      <StatusBar barStyle="light-content" backgroundColor={colores.verdePrincipal} />

      {/* Cabecera */}
      <View style={styles.cabecera}>
        <Text style={styles.titulo}>Mi Perfil</Text>
        <TouchableOpacity style={styles.botonCerrarSesion} onPress={handleLogOut}>
          <Text style={styles.textoCerrarSesion}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

        <View style={styles.cuerpo}>
          <Text style={styles.textoCuerpo}>ദ്ദി˙ᗜ˙)</Text>
          <Text style={styles.textoCuerpo}>Mentira jaja XD
             No hay nada capo, es solo pa cerrar sesión</Text>
        </View>

      {/* Barra de navegación inferior */}
            <BarraNavegaciónInferior navigation={navigation}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cabecera: {
    height: 78,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 17,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "600",
    color: colores.blanco,
  },
  botonCerrarSesion: {
    backgroundColor: "#802424ff",
    borderRadius: 10,
    width: 127,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  textoCerrarSesion: {
    fontSize: 16,
    fontWeight: "600",
    color: colores.blanco,
  },
  cuerpo: {
    flex: 1,
    backgroundColor: colores.crema,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 17,
    paddingTop: 18,
  },
 textoCuerpo: {
  color:"#5c5c5cff",
    fontSize:50,
  },
  campoBusqueda: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  filaSuperior: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  columnaTexto: {
    flex: 1,
    marginLeft: 20,
  },
  nombreProducto: {
    fontSize: 18,
    fontWeight: "600",
    color: colores.textoOscuro,
  },
  detalleProducto: {
    fontSize: 15,
    fontWeight: "500",
    color: colores.textoSecundario,
  },
  filaAcciones: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  botonAccion: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  textoAccion: {
    fontSize: 15,
    fontWeight: "500",
    color: colores.textoOscuro,
  },
  safe: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  btnAgregar: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  btnAgregarText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: FONTS.sizes.sm,
  },
  btnFiltroActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  listContent: {
    paddingBottom: SPACING.xl,
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xl * 2,
  },
  emptyText: {
    marginTop: SPACING.md,
    fontSize: FONTS.sizes.md,
    color: COLORS.textGray,
  },
});
