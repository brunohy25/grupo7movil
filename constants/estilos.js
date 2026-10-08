
import { StyleSheet } from "react-native";
import { colores } from "./colores";

export const estilosGlobales = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.crema,
  },

  encabezado: {
    backgroundColor: colores.verdePrincipal,
    flexDirection: "row",
    alignItems: "center",
  },

  encabezadoPerfil: {
    paddingTop: 55,
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
});
