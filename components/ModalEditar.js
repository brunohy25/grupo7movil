// components/ModalEditar.js
import React, { useState, useEffect } from 'react';
import {
  Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { COLORS, SPACING, RADIUS, FONTS } from '../theme/colors';

export default function ModalEditar({ visible, producto, onCancel, onSave }) {
  const [form, setForm] = useState({
    nombre: '',
    categoria: '',
    presentacion: '',
    stock: '',
    origen: '',
    vencimiento: '',
    descripcion: '',
  });

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

  const handleSave = () => {
    if (!form.nombre.trim()) return;
    onSave({
      ...producto,
      ...form,
      stock: parseInt(form.stock, 10) || 0,
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>

      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.modal}>
          <View style={styles.topBar} />

          <Text style={styles.title}>Editar producto</Text>

          <ScrollView
            style={styles.content}
            keyboardShouldPersistTaps="handled"
          >
            <Field label="Nombre del producto">
              <TextInput
                style={styles.input}
                value={form.nombre}
                onChangeText={(v) => update('nombre', v)}
                placeholder="Ej. Pimienta negra molida"
                placeholderTextColor={COLORS.textGray}
              />
            </Field>

            <Field label="Categoría">
              <TextInput
                style={styles.input}
                value={form.categoria}
                onChangeText={(v) => update('categoria', v)}
                placeholder="Ej. Especias"
                placeholderTextColor={COLORS.textGray}
              />
            </Field>

            <Field label="Presentación">
              <TextInput
                style={styles.input}
                value={form.presentacion}
                onChangeText={(v) => update('presentacion', v)}
                placeholder="Ej. 50 g"
                placeholderTextColor={COLORS.textGray}
              />
            </Field>

            <Field label="Stock disponible">
              <TextInput
                style={styles.input}
                value={form.stock}
                onChangeText={(v) => update('stock', v.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
                placeholder="Ej. 45"
                placeholderTextColor={COLORS.textGray}
              />
            </Field>

            <Field label="Origen">
              <TextInput
                style={styles.input}
                value={form.origen}
                onChangeText={(v) => update('origen', v)}
                placeholder="Ej. Valles Calchaquíes (Salta)"
                placeholderTextColor={COLORS.textGray}
              />
            </Field>

            <Field label="Vencimiento">
              <TextInput
                style={styles.input}
                value={form.vencimiento}
                onChangeText={(v) => update('vencimiento', v)}
                placeholder="Ej. 12/26"
                placeholderTextColor={COLORS.textGray}
              />
            </Field>

            <Field label="Descripción (opcional)">
              <TextInput
                style={[styles.input, styles.textArea]}
                value={form.descripcion}
                onChangeText={(v) => update('descripcion', v)}
                placeholder="Información adicional"
                placeholderTextColor={COLORS.textGray}
                multiline
                numberOfLines={3}
              />
            </Field>
          </ScrollView>

          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.btnCancel} onPress={onCancel}>
              <Text style={styles.btnCancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
              <Text style={styles.btnSaveText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function Field({ label, children }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
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