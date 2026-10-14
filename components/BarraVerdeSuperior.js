import React from "react";
import { ScrollView, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../constants/colores";
import { estilosTema } from "../constants/estilos";
import { usarTema } from "../contexto/ContextoTema";

export default function BarraVerdeSuperior({ children }) {
  const { modoOscuro } = usarTema();
  const tema = estilosTema[modoOscuro ? "oscuro" : "claro"];

  return (
    <SafeAreaView
      style={styles.contenedorPrincipal}
      edges={["top", "left", "right"]}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={colores.verdePrincipal}
      />
      {/* Desplazable para que el formulario no se corte en pantallas bajas */}
      <ScrollView
        style={[styles.cuerpo, tema.fondo]}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: colores.verdePrincipal,
  },
  cuerpo: {
    flex: 1,
    backgroundColor: colores.crema,
  },
});
