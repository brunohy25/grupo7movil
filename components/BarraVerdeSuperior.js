import React from "react";
import {
  ScrollView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../constants/colores";
import { estilosTema } from "../constants/estilos";
import { usarTema } from "../contexto/ContextoTema";

export default function BarraVerdeSuperior({ children, contentContainerStyle }) {
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
      <KeyboardAvoidingView
        style={styles.tecladoContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* aca puse un desplazable para que el teclado no corte la vista */}
        <ScrollView
          style={[styles.cuerpo, tema.fondo]}
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: colores.verdePrincipal,
  },
  tecladoContainer: {
    flex: 1,
  },
  cuerpo: {
    flex: 1,
    backgroundColor: colores.crema,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 50,
  },
});
