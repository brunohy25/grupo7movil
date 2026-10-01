// screens/NuevoProductos.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  Image, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, FONTS } from '../theme/colors';

export default function NuevoProductos({ navigation }) {
  const [form, setForm] = useState({
    nombre: '',
    categoria: '',
    presentacion: '',
    stock: '',
    origen: '',
    vencimiento: '',
    descripcion: '',
    imagen: null,
  });

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const seleccionarImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tu galería para elegir una imagen.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      update('imagen', result.assets[0].uri);
    }
  };

  const handleGuardar = () => {
    if (!form.nombre.trim()) {
      Alert.alert('Campo requerido', 'Ingresá el nombre del producto.');
      return;
    }
    if (!form.stock.trim()) {
      Alert.alert('Campo requerido', 'Ingresá el stock actual.');
      return;
    }

    const nuevoProducto = {
      id: Date.now().toString(),
      nombre: form.nombre.trim(),
      categoria: form.categoria.trim(),
      presentacion: form.presentacion.trim(),
      stock: parseInt(form.stock, 10) || 0,
      origen: form.origen.trim(),
      vencimiento: form.vencimiento.trim(),
      descripcion: form.descripcion.trim(),
      imagen: form.imagen,
    };

    navigation.navigate('Productos', { nuevoProducto });
  };

  const handleCancelar = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleCancelar} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={26} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Nuevo producto</Text>
            <View style={{ width: 26 }} />
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Selector de imagen */}
            <TouchableOpacity style={styles.imageBox} onPress={seleccionarImagen}>
              {form.imagen ? (
                <Image source={{ uri: form.imagen }} style={styles.imagePreview} />
              ) : (
                <>
                  <Ionicons name="camera" size={44} color={COLORS.textGray} />
                  <Text style={styles.imageText}>Agregar Imagen{'\n'}del producto</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Nombre */}
            <Field label="Nombre del producto">
              <TextInput
                style={styles.input}
                value={form.nombre}
                onChangeText={(v) => update('nombre', v)}
                placeholder="Ej. Pimiento dulce"
                placeholderTextColor={COLORS.textGray}
              />
            </Field>

            {/* Categoría */}
            <Field label="Categoría">
              <TextInput
                style={styles.input}
                value={form.categoria}
                onChangeText={(v) => update('categoria', v)}
                placeholder="Ej. Especias"
                placeholderTextColor={COLORS.textGray}
              />
            </Field>

            {/* Presentación */}
            <Field label="Presentación">
              <TextInput
                style={styles.input}
                value={form.presentacion}
                onChangeText={(v) => update('presentacion', v)}
                placeholder="Ej. 50 g"
                placeholderTextColor={COLORS.textGray}
              />
            </Field>

            {/* Stock */}
            <Field label="Stock actual">
              <View style={styles.inputWithIcon}>
                <Ionicons name="cube-outline" size={18} color={COLORS.textGray} />
                <TextInput
                  style={styles.inputInner}
                  value={form.stock}
                  onChangeText={(v) => update('stock', v.replace(/[^0-9]/g, ''))}
                  keyboardType="numeric"
                  placeholder="Ej. 0"
                  placeholderTextColor={COLORS.textGray}
                />
              </View>
            </Field>

            {/* Origen */}
            <Field label="Origen">
              <TextInput
                style={styles.input}
                value={form.origen}
                onChangeText={(v) => update('origen', v)}
                placeholder="Ej. Valles Calchaquíes (Salta)"
                placeholderTextColor={COLORS.textGray}
              />
            </Field>

            {/* Vencimiento */}
            <Field label="Vencimiento">
              <TextInput
                style={styles.input}
                value={form.vencimiento}
                onChangeText={(v) => update('vencimiento', v)}
                placeholder="Ej. 12/26"
                placeholderTextColor={COLORS.textGray}
              />
            </Field>

            {/* Descripción */}
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

            {/* Botones */}
            <TouchableOpacity style={styles.btnGuardar} onPress={handleGuardar}>
              <Text style={styles.btnGuardarText}>Guardar producto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnCancelar} onPress={handleCancelar}>
              <Text style={styles.btnCancelarText}>Cancelar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  safe: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  backBtn: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.primary,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 120,
  },
  imageBox: {
    backgroundColor: COLORS.inputBg,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  imageText: {
    marginTop: SPACING.sm,
    color: COLORS.textGray,
    fontSize: FONTS.sizes.sm,
    textAlign: 'center',
  },
  field: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
    color: COLORS.primary,
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
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    height: 46,
  },
  inputInner: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textDark,
  },
  btnGuardar: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  btnGuardarText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: FONTS.sizes.md,
  },
  btnCancelar: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.red,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  btnCancelarText: {
    color: COLORS.red,
    fontWeight: '700',
    fontSize: FONTS.sizes.md,
  },
});