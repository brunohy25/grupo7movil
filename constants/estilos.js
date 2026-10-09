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

export const estilosGlobales = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.crema,
  },

  contenedorVerde: {
    flex: 1,
    backgroundColor: colores.verdePrincipal,
  },

  encabezado: {
    backgroundColor: colores.verdePrincipal,
    flexDirection: "row",
    alignItems: "center",
  },

  encabezadoPerfil: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  flecha: {
    color: colores.blanco,
    fontSize: 28,
    marginRight: 25,
  },

  titulo: {
    color: colores.blanco,
    fontSize: 20,
    fontWeight: "bold",
  },

  contenido: {
    padding: 25,
  },

  etiqueta: {
    color: colores.verdeOscuro,
    fontSize: 15,
    marginBottom: 8,
  },

  campo: {
    backgroundColor: colores.campoFondo,
    borderColor: colores.campoBorde,
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    color: colores.verdeOscuro,
  },

  boton: {
    backgroundColor: colores.verdePrincipal,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  textoBoton: {
    color: colores.blanco,
    fontSize: 16,
    fontWeight: "bold",
  },

  botonSecundario: {
    borderWidth: 1,
    borderColor: colores.verdeOscuro,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },

  textoSecundario: {
    color: colores.verdeOscuro,
    fontSize: 16,
  },

  bordeRedondeadoAbajo: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  iconoNav: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },

  iconoGrilla: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
});

// estilos para el modo claro y oscuro
export const estilosTema = {
  claro: {
    fondo: { backgroundColor: colores.crema },
    fondoAjustes: { backgroundColor: colores.blanco },
    tarjeta: { backgroundColor: colores.blanco },
    tarjetaAjustes: { backgroundColor: "#F2F2F2" },
    texto: { color: colores.verdeOscuro },
    campo: {
      backgroundColor: colores.campoFondo,
      borderColor: colores.campoBorde,
      color: colores.verdeOscuro,
    },
    borde: { borderColor: colores.verdeOscuro },
  },

  oscuro: {
    fondo: { backgroundColor: "#1E1E1E" },
    fondoAjustes: { backgroundColor: "#1E1E1E" },
    tarjeta: { backgroundColor: "#333333" },
    tarjetaAjustes: { backgroundColor: "#333333" },
    texto: { color: colores.blanco },
    campo: {
      backgroundColor: "#333333",
      borderColor: "#555555",
      color: colores.blanco,
    },
    borde: { borderColor: colores.blanco },
  },
};
