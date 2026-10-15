import { StyleSheet, Dimensions } from "react-native";
import { colores, COLORS } from "./colores";

const anchoPantalla = Dimensions.get("window").width;

export const estilos = StyleSheet.create({
  // ==========================================
  // GENERALES Y ESTRUCTURA
  // ==========================================
  contenedor: {
    flex: 1,
    backgroundColor: colores.crema,
  },

  contenedorPrincipal: {
    flex: 1,
    backgroundColor: colores.verdePrincipal,
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

  // ==========================================
  // INICIO (HOME)
  // ==========================================
  cuerpoScroll: {
    backgroundColor: colores.crema,
    flexGrow: 1,
    paddingBottom: 30,
    paddingTop: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  tarjetaCabecera: {
    position: "relative",
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
    shadowColor: colores.sombra,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  contenidoBotonGrilla: {
    alignItems: "center",
    justifyContent: "center",
  },

  textoBotonGrilla: {
    fontSize: 16,
    fontWeight: "600",
    color: colores.verdePrincipal,
    marginTop: 6,
  },

  // ==========================================
  // BARRA DE NAVEGACIÓN INFERIOR
  // ==========================================
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

  // ==========================================
  // PERFIL
  // ==========================================
  encabezadoPerfil: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  contenedorFoto: {
    width: 110,
    height: 110,
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 35,
  },

  foto: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colores.iconoGris,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  iconoFoto: {
    fontSize: 55,
  },

  imagenPerfil: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  botonCamara: {
    position: "absolute",
    bottom: 0,
    right: -5,
    backgroundColor: colores.verdePrincipal,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colores.blanco,
    elevation: 3,
  },

  campoBloqueado: {
    opacity: 0.6,
  },

  contenedorCampo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colores.campoFondo,
    borderColor: colores.campoBorde,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingRight: 15,
  },

  campoNombre: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 14,
    color: colores.verdeOscuro,
    fontSize: 15,
  },

  // ==========================================
  // AJUSTES
  // ==========================================
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
    paddingBottom: 40,
    flexGrow: 1,
  },

  subtitulo: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 12,
  },

  opcion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colores.bordeSuave,
  },

  divisorSeccion: {
    height: 1,
    marginVertical: 14,
  },

  informacion: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  texto: {
    fontSize: 15,
  },

  textoPeligro: {
    color: colores.rojo,
    fontWeight: "600",
  },

  modalFondo: {
    flex: 1,
    backgroundColor: colores.overlay,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalCard: {
    width: "100%",
    maxHeight: "85%",
    borderRadius: 18,
    padding: 20,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  modalTitulo: {
    fontSize: 20,
    fontWeight: "bold",
  },

  itemFaq: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colores.bordeSuave,
  },

  preguntaFaq: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
  },

  respuestaFaq: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.85,
    marginBottom: 10,
  },

  parrafoTerminos: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.85,
    marginBottom: 12,
  },

  itemFaqUltimo: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 0,
  },

  subtituloModal: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtituloModalSecundario: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },

  modalBoton: {
    backgroundColor: colores.verdePrincipal,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },

  textoNegrita: {
    fontWeight: "bold",
  },

  filaContacto: {
    flexDirection: "row",
    alignItems: "center",
    height: 54,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colores.bordeSuave,
    gap: 12,
  },

  textoContacto: {
    fontSize: 15,
    fontWeight: "600",
  },

  // ==========================================
  // POPUP / MODAL DE ALERTA Y NOTIFICACIONES
  // ==========================================
  popupCard: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: colores.blanco,
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 8,
    shadowColor: colores.sombra,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },

  popupTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: colores.verdeOscuro,
    textAlign: "center",
    marginBottom: 10,
  },

  popupMensaje: {
    fontSize: 15,
    color: colores.grisMedio,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
    paddingHorizontal: 4,
  },

  popupBotonPill: {
    backgroundColor: colores.verdePrincipal,
  },

  popupBotonPillRojo: {
    backgroundColor: colores.rojo,
  },

  popupBotonPillCancelar: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: colores.campoBorde,
  },

  popupBotonFila: {
    flex: 1,
    minHeight: 46,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  popupBotonColumna: {
    width: "100%",
    minHeight: 46,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  popupBotonUnico: {
    minHeight: 46,
    minWidth: 140,
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  popupTextoBoton: {
    color: colores.blanco,
    fontWeight: "bold",
    fontSize: 14.5,
    textAlign: "center",
  },

  popupTextoBotonCancelar: {
    color: colores.textoOscuro,
    fontWeight: "600",
    fontSize: 14.5,
    textAlign: "center",
  },

  popupFilaBotones: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 4,
  },

  popupColumnaBotones: {
    width: "100%",
    alignItems: "stretch",
    gap: 10,
    marginTop: 4,
  },

  // Navegación centrada compartida
  navCentro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  navMensaje: {
    textAlign: "center",
    fontSize: 16,
  },
});

// Estilos para el modo claro y oscuro
export const estilosTema = {
  claro: {
    fondo: { backgroundColor: colores.crema },
    fondoAjustes: { backgroundColor: colores.blanco },
    tarjeta: { backgroundColor: colores.blanco },
    tarjetaAjustes: {
      backgroundColor: colores.blanco,
      borderColor: colores.bordeSuave,
    },
    divisor: { backgroundColor: colores.bordeSuave },
    texto: { color: colores.verdeOscuro },
    textoSecundario: { color: COLORS.textGray },
    campo: {
      backgroundColor: colores.campoFondo,
      borderColor: colores.campoBorde,
      color: colores.verdeOscuro,
    },
    borde: { borderColor: colores.verdeOscuro },
    popupCard: { backgroundColor: colores.blanco },
    popupTitulo: { color: colores.verdeOscuro },
    popupMensaje: { color: colores.grisMedio },
    popupBotonPillCancelar: { borderColor: colores.campoBorde },
    popupTextoBotonCancelar: { color: colores.textoOscuro },
  },

  oscuro: {
    fondo: { backgroundColor: colores.fondoOscuro },
    fondoAjustes: { backgroundColor: colores.fondoOscuro },
    tarjeta: { backgroundColor: colores.campoOscuro, borderColor: colores.tarjetaOscuroBorde },
    tarjetaAjustes: {
      backgroundColor: colores.tarjetaOscuro,
      borderColor: colores.tarjetaOscuroBorde,
    },
    divisor: { backgroundColor: colores.divisorOscuro },
    texto: { color: colores.blanco },
    textoSecundario: { color: colores.placeholderOscuro },
    campo: {
      backgroundColor: colores.campoOscuro,
      borderColor: colores.bordeOscuro,
      color: colores.blanco,
    },
    borde: { borderColor: colores.blanco },
    popupCard: { backgroundColor: colores.tarjetaOscuro },
    popupTitulo: { color: colores.blanco },
    popupMensaje: { color: colores.textoMensajeOscuro },
    popupBotonPillCancelar: { borderColor: colores.bordeOscuro },
    popupTextoBotonCancelar: { color: colores.blanco },
  },
};

// estilos compartidos para las pantallas de autenticación (Login, SignUp, Reestablecer)
export const estilosAuth = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: colores.crema,
  },
  logo: {
    width: 220,
    height: 150,
    resizeMode: "contain",
  },
  titleLogo: {
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 20,
    color: colores.verdeOscuro,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: colores.verdeOscuro,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: colores.verdeOscuro,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 45,
    paddingHorizontal: 10,
    backgroundColor: colores.campoFondo,
    borderWidth: 1,
    borderColor: colores.campoBorde,
    borderRadius: 7,
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingVertical: 0,
    textAlignVertical: "center",
  },
  eyeButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "70%",
    alignItems: "center",
    backgroundColor: colores.verdePrincipal,
    paddingVertical: 10,
    borderRadius: 14,
    marginTop: 12,
  },
  button2: {
    width: "70%",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colores.verdeOscuro,
    paddingVertical: 10,
    borderRadius: 14,
    marginTop: 12,
  },
  buttonText: {
    color: colores.blanco,
    fontSize: 13,
    fontWeight: "bold",
  },
  buttonText2: {
    color: colores.verdeOscuro,
    fontSize: 13,
    fontWeight: "bold",
  },
  signUpText: {
    marginTop: 20,
    color: colores.verdePrincipal,
  },
  // textos de ayuda y de error debajo de los campos
  ayuda: {
    width: "100%",
    marginTop: -6,
    marginBottom: 10,
  },
  textoAyuda: {
    fontSize: 12,
  },
  textoError: {
    fontSize: 12,
    color: colores.rojo,
  },
  filaRegla: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  botonDeshabilitado: {
    opacity: 0.5,
  },
  // Barra verde superior compartida
  barraVerdeContenedor: {
    flex: 1,
    backgroundColor: colores.verdePrincipal,
  },
  barraVerdeTeclado: {
    flex: 1,
  },
  barraVerdeCuerpo: {
    flex: 1,
    backgroundColor: colores.crema,
  },
  barraVerdeScroll: {
    flexGrow: 1,
    paddingBottom: 50,
  },
});

// Alias para garantizar 100% de compatibilidad con cualquier import
export const estilosGlobales = estilos;
export const styles = estilos;