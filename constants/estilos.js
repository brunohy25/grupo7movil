import { StyleSheet, Dimensions } from "react-native";
import { colores } from "./colores";

const anchoPantalla = Dimensions.get("window").width;

export const estilos = StyleSheet.create({
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
