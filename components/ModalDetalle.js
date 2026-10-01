// components/ModalDetalle.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, RADIUS, FONTS } from '../theme/colors';

export default function ModalDetalle({ visible, producto, onClose }) {
  if (!producto) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.topBar} />

          <Text style={styles.title}>Detalle del producto</Text>

          <ScrollView style={styles.content}>
            <DetailRow label="Nombre:" value={producto.nombre} />
            <DetailRow label="Categoría:" value={producto.categoria} />
            <DetailRow label="Presentación:" value={producto.presentacion} />
            <DetailRow label="Stock disponible:" value={`${producto.stock} un.`} />
            {producto.origen ? <DetailRow label="Origen:" value={producto.origen} /> : null}
            {producto.vencimiento ? <DetailRow label="Vencimiento:" value={producto.vencimiento} /> : null}
            {producto.descripcion ? <DetailRow label="Descripción:" value={producto.descripcion} /> : null}
          </ScrollView>

          <TouchableOpacity style={styles.btnClose} onPress={onClose}>
            <Text style={styles.btnCloseText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function DetailRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  modal: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    width: '100%',
    maxWidth: 420,
    maxHeight: '80%',
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
    marginBottom: SPACING.md,
  },
  row: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  value: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textDark,
    lineHeight: 20,
  },
  btnClose: {
    backgroundColor: COLORS.primaryLight,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
  },
  btnCloseText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: FONTS.sizes.md,
  },
});