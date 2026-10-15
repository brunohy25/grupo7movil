import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { estilos, estilosTema } from "../constants/estilos";
import { usarTema } from "../contexto/ContextoTema";

export default function ModalAlerta({
  visible,
  titulo,
  mensaje,
  textoConfirmar = "Cerrar",
  onConfirmar,
  textoCancelar,
  onCancelar,
  esPeligro = false,
  botonesVerticales = false,
}) {
  const { modoOscuro } = usarTema();
  const tema = estilosTema[modoOscuro ? "oscuro" : "claro"];

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancelar || onConfirmar}
    >
      <View style={estilos.modalFondo}>
        <View style={[estilos.popupCard, tema.popupCard]}>
          {!!titulo && (
            <Text style={[estilos.popupTitulo, tema.popupTitulo]}>
              {titulo}
            </Text>
          )}

          {!!mensaje && (
            <Text style={[estilos.popupMensaje, tema.popupMensaje]}>
              {mensaje}
            </Text>
          )}

          {textoCancelar ? (
            botonesVerticales ? (
              <View style={estilos.popupColumnaBotones}>
                <TouchableOpacity
                  style={[
                    estilos.popupBotonColumna,
                    esPeligro ? estilos.popupBotonPillRojo : estilos.popupBotonPill,
                  ]}
                  onPress={onConfirmar}
                  activeOpacity={0.8}
                >
                  <Text style={estilos.popupTextoBoton} numberOfLines={1}>
                    {textoConfirmar}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    estilos.popupBotonColumna,
                    estilos.popupBotonPillCancelar,
                    tema.popupBotonPillCancelar,
                  ]}
                  onPress={onCancelar}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      estilos.popupTextoBotonCancelar,
                      tema.popupTextoBotonCancelar,
                    ]}
                    numberOfLines={1}
                  >
                    {textoCancelar}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={estilos.popupFilaBotones}>
                <TouchableOpacity
                  style={[
                    estilos.popupBotonFila,
                    estilos.popupBotonPillCancelar,
                    tema.popupBotonPillCancelar,
                  ]}
                  onPress={onCancelar}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      estilos.popupTextoBotonCancelar,
                      tema.popupTextoBotonCancelar,
                    ]}
                    numberOfLines={1}
                    adjustsFontSizeToFit={true}
                  >
                    {textoCancelar}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    estilos.popupBotonFila,
                    esPeligro ? estilos.popupBotonPillRojo : estilos.popupBotonPill,
                  ]}
                  onPress={onConfirmar}
                  activeOpacity={0.8}
                >
                  <Text
                    style={estilos.popupTextoBoton}
                    numberOfLines={1}
                    adjustsFontSizeToFit={true}
                  >
                    {textoConfirmar}
                  </Text>
                </TouchableOpacity>
              </View>
            )
          ) : (
            <TouchableOpacity
              style={[
                estilos.popupBotonUnico,
                esPeligro ? estilos.popupBotonPillRojo : estilos.popupBotonPill,
              ]}
              onPress={onConfirmar}
              activeOpacity={0.8}
            >
              <Text style={estilos.popupTextoBoton} numberOfLines={1}>
                {textoConfirmar}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}
