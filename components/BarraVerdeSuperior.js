import React from "react";
import {
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colores } from "../constants/colores";
import { estilosAuth, estilosTema } from "../constants/estilos";
import { usarTema } from "../contexto/ContextoTema";

export default function BarraVerdeSuperior({ children, contentContainerStyle }) {
  const { modoOscuro } = usarTema();
  const tema = estilosTema[modoOscuro ? "oscuro" : "claro"];

  return (
    <SafeAreaView
      style={estilosAuth.barraVerdeContenedor}
      edges={["top", "left", "right"]}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={colores.verdePrincipal}
      />
      <KeyboardAvoidingView
        style={estilosAuth.barraVerdeTeclado}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          style={[estilosAuth.barraVerdeCuerpo, tema.fondo]}
          contentContainerStyle={[estilosAuth.barraVerdeScroll, contentContainerStyle]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
