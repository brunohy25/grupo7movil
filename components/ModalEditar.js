// components/ModalEditar.js
import React, { useState, useEffect, useRef } from 'react';
import {
  Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { COLORS, SPACING, RADIUS, FONTS } from '../constants/colores';
import { estilosTema } from '../constants/estilos';
import { usarTema } from '../contexto/ContextoTema';
import { actualizarProducto, validarProducto } from '../src/servicios/productos';

export default function ModalEditar({ visible, producto, onCancel, onSave }) {
  const { modoOscuro } = usarTema();
  const tema = estilosTema[modoOscuro ? 'oscuro' : 'claro'];
  const [form, setForm] = useState({
    nombre: '',
    categoria: '',
    presentacion: '',
    stock: '',
    origen: '',
    vencimiento: '',
    descripcion: '',
  });
  const [guardando, setGuardando] = useState(false);
  // Bloquea el segundo toque al instante (el estado recién cambia en el próximo render)
  const enviando = useRef(false);

  useEffect(() => {
    if (producto && visible) {
      setForm({
        nombre: producto.nombre || '',
        categoria: producto.categoria || '',
        presentacion: producto.presentacion || '',
        stock: String(producto.stock ?? ''),
        origen: producto.origen || '',
        vencimiento: producto.vencimiento || '',
        descripcion: producto.descripcion || '',
      });
    }
  }, [producto, visible]);

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    if (enviando.current) return;
    const { error, datos } = validarProducto(form);
    if (error) {
      Alert.alert('Atención', error);
      return;
    }
    enviando.current = true;
    try {
      setGuardando(true);
      await actualizarProducto(producto.id, datos);
      onSave({ ...producto, ...datos });
    } catch (e) {
      Alert.alert('Error', 'No se pudo actualizar el producto.');
    } finally {
      enviando.current = false;
      setGuardando(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>

      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.modal, tema.tarjeta]}>
          <View style={styles.topBar} />

          <Text style={[styles.title, modoOscuro && tema.texto]}>Editar producto</Text>

          <ScrollView
            style={styles.content}
            keyboardShouldPersistTaps="handled"
          >
            <Field label="Nombre del producto">
              <TextInput
                style={[styles.input, modoOscuro && tema.campo]}
                value={form.nombre}
                onChangeText={(v) => update('nombre', v)}
                placeholder="Ej. Pimienta negra molida"
                placeholderTextColor={tema.textoSecundario.color}
              />
            </Field>

            <Field label="Categoría">
              <TextInput
                style={[styles.input, modoOscuro && tema.campo]}
                value={form.categoria}
                onChangeText={(v) => update('categoria', v)}
                placeholder="Ej. Especias"
                placeholderTextColor={tema.textoSecundario.color}
              />
            </Field>

            <Field label="Presentación">
              <TextInput
                style={[styles.input, modoOscuro && tema.campo]}
                value={form.presentacion}
                onChangeText={(v) => update('presentacion', v)}
                placeholder="Ej. 50 g"
                placeholderTextColor={tema.textoSecundario.color}
              />
            </Field>

            <Field label="Stock disponible">
              <TextInput
                style={[styles.input, modoOscuro && tema.campo]}
                value={form.stock}
                onChangeText={(v) => update('stock', v.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
                placeholder="Ej. 45"
                placeholderTextColor={tema.textoSecundario.color}
              />
            </Field>

            <Field label="Origen">
              <TextInput
                style={[styles.input, modoOscuro && tema.campo]}
                value={form.origen}
                onChangeText={(v) => update('origen', v)}
                placeholder="Ej. Valles Calchaquíes (Salta)"
                placeholderTextColor={tema.textoSecundario.color}
              />
            </Field>

            <Field label="Vencimiento">
              <TextInput
                style={[styles.input, modoOscuro && tema.campo]}
                value={form.vencimiento}
                onChangeText={(v) => update('vencimiento', v)}
                placeholder="Ej. 12/26"
                placeholderTextColor={tema.textoSecundario.color}
              />
            </Field>

            <Field label="Descripción (opcional)">
              <TextInput
                style={[styles.input, styles.textArea, modoOscuro && tema.campo]}
                value={form.descripcion}
                onChangeText={(v) => update('descripcion', v)}
                placeholder="Información adicional"
                placeholderTextColor={tema.textoSecundario.color}
                multiline
                numberOfLines={3}
              />
            </Field>
          </ScrollView>

          <View style={styles.buttonsRow}>
            <TouchableOpacity style={[styles.btnCancel, modoOscuro && tema.fondo]} onPress={onCancel}>
              <Text style={[styles.btnCancelText, modoOscuro && tema.texto]}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSave} onPress={handleSave} disabled={guardando}>
              <Text style={styles.btnSaveText}>{guardando ? 'Guardando...' : 'Guardar'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function Field({ label, children }) {
  const { modoOscuro } = usarTema();
  const tema = estilosTema[modoOscuro ? 'oscuro' : 'claro'];
  return (
    <View style={styles.field}>
      <Text style={[styles.label, modoOscuro && tema.texto]}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
  },
  modal: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    width: '100%',
    maxWidth: 420,
    maxHeight: '90%',
    paddingBottom: SPACING.lg,
    overflow: 'hidden',
  },
  topBar: {
    height: 6,
    backgroundColor: COLORS.orange,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  content: {
    paddingHorizontal: SPACING.lg,
  },
  field: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textDark,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    minHeight: 46,
  },
  textArea: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  buttonsRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.md,
  },
  btnCancel: {
    flex: 1,
    backgroundColor: COLORS.inputBg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  btnCancelText: {
    color: COLORS.textDark,
    fontWeight: '600',
    fontSize: FONTS.sizes.sm,
  },
  btnSave: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    marginLeft: SPACING.sm,
  },
  btnSaveText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: FONTS.sizes.sm,
  },
});