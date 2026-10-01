import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../constants/colores";

export default function BarraVerdeSuperior({ children }) {
  return (
    <SafeAreaView
      style={styles.contenedorPrincipal}
      edges={["top", "left", "right"]}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={colores.verdePrincipal}
      />
      <View style={styles.cuerpo}>{children}</View>
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
